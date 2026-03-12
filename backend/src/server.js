import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDatabase, pool } from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";
const ADMIN_TOKEN = (process.env.ADMIN_TOKEN || "").trim();
const CORS_ORIGINS = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!ADMIN_TOKEN) {
  console.error("Missing ADMIN_TOKEN in environment.");
  process.exit(1);
}

if (NODE_ENV !== "production" && CORS_ORIGINS.length === 0) {
  CORS_ORIGINS.push("http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:4173");
}

if (NODE_ENV === "production" && CORS_ORIGINS.length === 0) {
  console.error("Missing CORS_ORIGINS in production environment.");
  process.exit(1);
}


const corsOptions = {
  origin(origin, callback) {
    if (!origin || CORS_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("CORS_NOT_ALLOWED"));
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "5mb" }));
app.use((_, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function cleanOptionalText(value, maxLength = 500) {
  const cleaned = cleanText(value, maxLength);
  return cleaned || null;
}

function cleanArray(values, maxItems = 20, maxLength = 120) {
  if (!Array.isArray(values)) return [];
  return values
    .map((item) => cleanText(item, maxLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const token = bearer || req.headers["x-admin-token"];

  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: "Acces admin refuse." });
  }

  return next();
}

app.get("/api/health", async (_, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true, service: "startup-digital-api", database: "connected" });
  } catch {
    res.status(500).json({ ok: false, service: "startup-digital-api", database: "disconnected" });
  }
});

app.get("/api/products", async (_, res) => {
  try {
    const result = await pool.query(`
      SELECT id, slug, name, headline, tag, category, description, long_description, stack, delivery,
             COALESCE(features, '[]'::jsonb) AS features,
             image_url, COALESCE(gallery_images, '[]'::jsonb) AS gallery_images, is_available, created_at
      FROM products
      WHERE is_published = TRUE
      ORDER BY sort_order ASC, id ASC;
    `);
    return res.json({ products: result.rows });
  } catch (error) {
    console.error("GET /api/products failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement des produits." });
  }
});

app.get("/api/products/:slug", async (req, res) => {
  const slug = (req.params.slug || "").trim();
  if (!slug) {
    return res.status(400).json({ error: "Slug invalide." });
  }

  try {
    const result = await pool.query(`
      SELECT id, slug, name, headline, tag, category, description, long_description, stack, delivery,
             COALESCE(features, '[]'::jsonb) AS features,
             image_url, COALESCE(gallery_images, '[]'::jsonb) AS gallery_images, is_available, created_at
      FROM products
      WHERE slug = $1 AND is_published = TRUE
      LIMIT 1;
    `, [slug]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Produit introuvable." });
    }

    return res.json({ product: result.rows[0] });
  } catch (error) {
    console.error("GET /api/products/:slug failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement du produit." });
  }
});

app.get("/api/news", async (_, res) => {
  try {
    const query = `
      SELECT id, title, excerpt, content, image_url, created_at
      FROM news_articles
      WHERE is_published = TRUE
      ORDER BY created_at DESC
      LIMIT 4;
    `;
    const result = await pool.query(query);
    return res.json({ news: result.rows });
  } catch (error) {
    console.error("GET /api/news failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement des actualites." });
  }
});

app.get("/api/news/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  try {
    const query = `
      SELECT id, title, excerpt, content, image_url, created_at
      FROM news_articles
      WHERE id = $1 AND is_published = TRUE
      LIMIT 1;
    `;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Actualite introuvable." });
    }

    return res.json({ news: result.rows[0] });
  } catch (error) {
    console.error("GET /api/news/:id failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement de l'actualite." });
  }
});

app.get("/api/stats", async (_, res) => {
  try {
    const result = await pool.query(`
      SELECT id, label, value, sort_order
      FROM key_stats
      WHERE is_active = TRUE
      ORDER BY sort_order ASC, id ASC
      LIMIT 8;
    `);
    return res.json({ stats: result.rows });
  } catch (error) {
    console.error("GET /api/stats failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement des chiffres." });
  }
});

app.get("/api/testimonials", async (_, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, role, quote, sort_order
      FROM testimonials
      WHERE is_active = TRUE
      ORDER BY sort_order ASC, id ASC
      LIMIT 9;
    `);
    return res.json({ testimonials: result.rows });
  } catch (error) {
    console.error("GET /api/testimonials failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement des temoignages." });
  }
});

app.post("/api/contacts", async (req, res) => {
  const fullName = cleanText(req.body.fullName, 120);
  const email = cleanText(req.body.email, 180);
  const company = cleanOptionalText(req.body.company, 180);
  const serviceType = cleanOptionalText(req.body.serviceType, 100) || "Autre";
  const message = cleanText(req.body.message, 5000);

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "Nom, email et message sont obligatoires." });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Adresse email invalide." });
  }

  try {
    const query = `
      INSERT INTO contact_requests (full_name, email, company, service_type, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at;
    `;

    const values = [fullName, email, company, serviceType, message];
    const result = await pool.query(query, values);

    return res.status(201).json({
      message: "Demande enregistree avec succes.",
      contact: result.rows[0]
    });
  } catch (error) {
    console.error("POST /api/contacts failed:", error.message);
    return res.status(500).json({
      error: "Erreur serveur lors de l'enregistrement de la demande.",
      detail: "Verifiez DATABASE_URL, PostgreSQL et la table contact_requests."
    });
  }
});

app.get("/api/admin/contacts", adminAuth, async (_, res) => {
  try {
    const result = await pool.query(`
      SELECT id, full_name, email, company, service_type, message, created_at
      FROM contact_requests
      ORDER BY created_at DESC;
    `);
    return res.json({ contacts: result.rows });
  } catch (error) {
    console.error("GET /api/admin/contacts failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement des demandes." });
  }
});

app.delete("/api/admin/contacts/:id", adminAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  try {
    const result = await pool.query("DELETE FROM contact_requests WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Demande introuvable." });
    }
    return res.json({ message: "Demande supprimee." });
  } catch (error) {
    console.error("DELETE /api/admin/contacts/:id failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la suppression." });
  }
});

app.get("/api/admin/news", adminAuth, async (_, res) => {
  try {
    const result = await pool.query(`
      SELECT id, title, excerpt, content, image_url, is_published, created_at, updated_at
      FROM news_articles
      ORDER BY created_at DESC;
    `);
    return res.json({ news: result.rows });
  } catch (error) {
    console.error("GET /api/admin/news failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement des actualites admin." });
  }
});

app.post("/api/admin/news", adminAuth, async (req, res) => {
  const title = cleanText(req.body.title, 200);
  const excerpt = cleanOptionalText(req.body.excerpt, 500);
  const content = cleanText(req.body.content, 20000);
  const imageUrl = cleanOptionalText(req.body.imageUrl, 4000000);
  const isPublished = req.body.isPublished !== false;

  if (!title || !content) {
    return res.status(400).json({ error: "Titre et contenu sont obligatoires." });
  }

  try {
    const query = `
      INSERT INTO news_articles (title, excerpt, content, image_url, is_published)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, title, excerpt, content, image_url, is_published, created_at, updated_at;
    `;

    const values = [title, excerpt, content, imageUrl, isPublished];
    const result = await pool.query(query, values);
    return res.status(201).json({ news: result.rows[0] });
  } catch (error) {
    console.error("POST /api/admin/news failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la creation de l'actualite." });
  }
});

app.put("/api/admin/news/:id", adminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const title = cleanText(req.body.title, 200);
  const excerpt = cleanOptionalText(req.body.excerpt, 500);
  const content = cleanText(req.body.content, 20000);
  const imageUrl = cleanOptionalText(req.body.imageUrl, 4000000);
  const isPublished = req.body.isPublished !== false;

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  if (!title || !content) {
    return res.status(400).json({ error: "Titre et contenu sont obligatoires." });
  }

  try {
    const query = `
      UPDATE news_articles
      SET title = $1,
          excerpt = $2,
          content = $3,
          image_url = $4,
          is_published = $5,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING id, title, excerpt, content, image_url, is_published, created_at, updated_at;
    `;

    const values = [title, excerpt, content, imageUrl, isPublished, id];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Actualite introuvable." });
    }

    return res.json({ news: result.rows[0] });
  } catch (error) {
    console.error("PUT /api/admin/news/:id failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la mise a jour." });
  }
});

app.delete("/api/admin/news/:id", adminAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  try {
    const result = await pool.query("DELETE FROM news_articles WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Actualite introuvable." });
    }
    return res.json({ message: "Actualite supprimee." });
  } catch (error) {
    console.error("DELETE /api/admin/news/:id failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la suppression." });
  }
});

app.get("/api/admin/products", adminAuth, async (_, res) => {
  try {
    const result = await pool.query(`
      SELECT id, slug, name, headline, tag, category, description, long_description, stack, delivery,
             COALESCE(features, '[]'::jsonb) AS features,
             image_url, COALESCE(gallery_images, '[]'::jsonb) AS gallery_images, is_available, is_published, sort_order, created_at, updated_at
      FROM products
      ORDER BY sort_order ASC, id ASC;
    `);
    return res.json({ products: result.rows });
  } catch (error) {
    console.error("GET /api/admin/products failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement des produits admin." });
  }
});

app.post("/api/admin/products", adminAuth, async (req, res) => {
  const slug = cleanText(req.body.slug, 120).toLowerCase();
  const name = cleanText(req.body.name, 180);
  const headline = cleanText(req.body.headline, 220);
  const tag = cleanText(req.body.tag, 80) || 'Nouveau';
  const category = cleanText(req.body.category, 120);
  const description = cleanText(req.body.description, 4000);
  const longDescription = cleanOptionalText(req.body.longDescription, 20000);
  const stack = cleanOptionalText(req.body.stack, 220);
  const delivery = cleanOptionalText(req.body.delivery, 120);
  const features = cleanArray(req.body.features, 20, 120);
  const imageUrl = cleanOptionalText(req.body.imageUrl, 4000000);
  const galleryImages = cleanArray(req.body.galleryImages, 8, 4000000);
  const isAvailable = req.body.isAvailable !== false;
  const isPublished = req.body.isPublished !== false;
  const sortOrder = Number.isInteger(Number(req.body.sortOrder)) ? Number(req.body.sortOrder) : 0;
  if (!slug || !name || !headline || !category || !description) {
    return res.status(400).json({ error: "Slug, nom, headline, categorie et description sont obligatoires." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO products (slug, name, headline, tag, category, description, long_description, stack, delivery, features, image_url, gallery_images, is_available, is_published, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       RETURNING id, slug, name, headline, tag, category, description, long_description, stack, delivery, features, image_url, gallery_images, is_available, is_published, sort_order, created_at, updated_at;`,
      [
        slug,
        name,
        headline,
        tag || "Nouveau",
        category,
        description,
        longDescription || null,
        stack || null,
        delivery || null,
        Array.isArray(features) ? JSON.stringify(features) : "[]",
        imageUrl || null,
        Array.isArray(galleryImages) ? JSON.stringify(galleryImages.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())) : "[]",
        isAvailable !== false,
        isPublished !== false,
        Number.isInteger(Number(sortOrder)) ? Number(sortOrder) : 0
      ]
    );
    return res.status(201).json({ product: result.rows[0] });
  } catch (error) {
    console.error("POST /api/admin/products failed:", error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "Ce slug existe deja. Choisis un slug unique." });
    }
    return res.status(500).json({ error: "Erreur serveur lors de la creation du produit." });
  }
});

app.put("/api/admin/products/:id", adminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const slug = cleanText(req.body.slug, 120).toLowerCase();
  const name = cleanText(req.body.name, 180);
  const headline = cleanText(req.body.headline, 220);
  const tag = cleanText(req.body.tag, 80) || 'Nouveau';
  const category = cleanText(req.body.category, 120);
  const description = cleanText(req.body.description, 4000);
  const longDescription = cleanOptionalText(req.body.longDescription, 20000);
  const stack = cleanOptionalText(req.body.stack, 220);
  const delivery = cleanOptionalText(req.body.delivery, 120);
  const features = cleanArray(req.body.features, 20, 120);
  const imageUrl = cleanOptionalText(req.body.imageUrl, 4000000);
  const galleryImages = cleanArray(req.body.galleryImages, 8, 4000000);
  const isAvailable = req.body.isAvailable !== false;
  const isPublished = req.body.isPublished !== false;
  const sortOrder = Number.isInteger(Number(req.body.sortOrder)) ? Number(req.body.sortOrder) : 0;

  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }
  if (!slug || !name || !headline || !category || !description) {
    return res.status(400).json({ error: "Slug, nom, headline, categorie et description sont obligatoires." });
  }

  try {
    const result = await pool.query(
      `UPDATE products
       SET slug = $1,
           name = $2,
           headline = $3,
           tag = $4,
           category = $5,
           description = $6,
           long_description = $7,
           stack = $8,
           delivery = $9,
           features = $10,
           image_url = $11,
           gallery_images = $12,
           is_available = $13,
           is_published = $14,
           sort_order = $15,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $16
       RETURNING id, slug, name, headline, tag, category, description, long_description, stack, delivery, features, image_url, gallery_images, is_available, is_published, sort_order, created_at, updated_at;`,
      [
        slug,
        name,
        headline,
        tag || "Nouveau",
        category,
        description,
        longDescription || null,
        stack || null,
        delivery || null,
        Array.isArray(features) ? JSON.stringify(features) : "[]",
        imageUrl || null,
        Array.isArray(galleryImages) ? JSON.stringify(galleryImages.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())) : "[]",
        isAvailable !== false,
        isPublished !== false,
        Number.isInteger(Number(sortOrder)) ? Number(sortOrder) : 0,
        id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Produit introuvable." });
    }

    return res.json({ product: result.rows[0] });
  } catch (error) {
    console.error("PUT /api/admin/products/:id failed:", error);
    if (error.code === "23505") {
      return res.status(409).json({ error: "Ce slug existe deja. Choisis un slug unique." });
    }
    return res.status(500).json({ error: "Erreur serveur lors de la mise a jour du produit." });
  }
});

app.delete("/api/admin/products/:id", adminAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Produit introuvable." });
    }
    return res.json({ message: "Produit supprime." });
  } catch (error) {
    console.error("DELETE /api/admin/products/:id failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la suppression du produit." });
  }
});

app.get("/api/admin/stats", adminAuth, async (_, res) => {
  try {
    const result = await pool.query(`
      SELECT id, label, value, sort_order, is_active, created_at, updated_at
      FROM key_stats
      ORDER BY sort_order ASC, id ASC;
    `);
    return res.json({ stats: result.rows });
  } catch (error) {
    console.error("GET /api/admin/stats failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement des chiffres admin." });
  }
});

app.post("/api/admin/stats", adminAuth, async (req, res) => {
  const { label, value, sortOrder, isActive } = req.body;
  if (!label || !value) {
    return res.status(400).json({ error: "Label et valeur sont obligatoires." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO key_stats (label, value, sort_order, is_active)
       VALUES ($1, $2, $3, $4)
       RETURNING id, label, value, sort_order, is_active, created_at, updated_at;`,
      [label, value, Number.isInteger(Number(sortOrder)) ? Number(sortOrder) : 0, isActive !== false]
    );
    return res.status(201).json({ stat: result.rows[0] });
  } catch (error) {
    console.error("POST /api/admin/stats failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la creation du chiffre." });
  }
});

app.put("/api/admin/stats/:id", adminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { label, value, sortOrder, isActive } = req.body;
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }
  if (!label || !value) {
    return res.status(400).json({ error: "Label et valeur sont obligatoires." });
  }

  try {
    const result = await pool.query(
      `UPDATE key_stats
       SET label = $1,
           value = $2,
           sort_order = $3,
           is_active = $4,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING id, label, value, sort_order, is_active, created_at, updated_at;`,
      [label, value, Number.isInteger(Number(sortOrder)) ? Number(sortOrder) : 0, isActive !== false, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Chiffre introuvable." });
    }

    return res.json({ stat: result.rows[0] });
  } catch (error) {
    console.error("PUT /api/admin/stats/:id failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la mise a jour du chiffre." });
  }
});

app.delete("/api/admin/stats/:id", adminAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  try {
    const result = await pool.query("DELETE FROM key_stats WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Chiffre introuvable." });
    }
    return res.json({ message: "Chiffre supprime." });
  } catch (error) {
    console.error("DELETE /api/admin/stats/:id failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la suppression du chiffre." });
  }
});

app.get("/api/admin/testimonials", adminAuth, async (_, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, role, quote, sort_order, is_active, created_at, updated_at
      FROM testimonials
      ORDER BY sort_order ASC, id ASC;
    `);
    return res.json({ testimonials: result.rows });
  } catch (error) {
    console.error("GET /api/admin/testimonials failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors du chargement des temoignages admin." });
  }
});

app.post("/api/admin/testimonials", adminAuth, async (req, res) => {
  const { name, role, quote, sortOrder, isActive } = req.body;
  if (!name || !quote) {
    return res.status(400).json({ error: "Nom et citation sont obligatoires." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO testimonials (name, role, quote, sort_order, is_active)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, role, quote, sort_order, is_active, created_at, updated_at;`,
      [name, role || null, quote, Number.isInteger(Number(sortOrder)) ? Number(sortOrder) : 0, isActive !== false]
    );
    return res.status(201).json({ testimonial: result.rows[0] });
  } catch (error) {
    console.error("POST /api/admin/testimonials failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la creation du temoignage." });
  }
});

app.put("/api/admin/testimonials/:id", adminAuth, async (req, res) => {
  const id = Number(req.params.id);
  const { name, role, quote, sortOrder, isActive } = req.body;
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }
  if (!name || !quote) {
    return res.status(400).json({ error: "Nom et citation sont obligatoires." });
  }

  try {
    const result = await pool.query(
      `UPDATE testimonials
       SET name = $1,
           role = $2,
           quote = $3,
           sort_order = $4,
           is_active = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING id, name, role, quote, sort_order, is_active, created_at, updated_at;`,
      [name, role || null, quote, Number.isInteger(Number(sortOrder)) ? Number(sortOrder) : 0, isActive !== false, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Temoignage introuvable." });
    }

    return res.json({ testimonial: result.rows[0] });
  } catch (error) {
    console.error("PUT /api/admin/testimonials/:id failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la mise a jour du temoignage." });
  }
});

app.delete("/api/admin/testimonials/:id", adminAuth, async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "ID invalide." });
  }

  try {
    const result = await pool.query("DELETE FROM testimonials WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Temoignage introuvable." });
    }
    return res.json({ message: "Temoignage supprime." });
  } catch (error) {
    console.error("DELETE /api/admin/testimonials/:id failed:", error.message);
    return res.status(500).json({ error: "Erreur serveur lors de la suppression du temoignage." });
  }
});

app.use((error, _, res, next) => {
  if (error?.message === "CORS_NOT_ALLOWED") {
    return res.status(403).json({ error: "Origine non autorisee par CORS." });
  }
  return next(error);
});
async function start() {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database init failed:", error);
    process.exit(1);
  }
}

start();















