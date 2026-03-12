import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on("error", (error) => {
  console.error("PostgreSQL pool error:", error);
});

export async function initDatabase() {
  const createContactTable = `
    CREATE TABLE IF NOT EXISTS contact_requests (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(180) NOT NULL,
      company VARCHAR(180),
      service_type VARCHAR(100),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createNewsTable = `
    CREATE TABLE IF NOT EXISTS news_articles (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      image_url TEXT,
      gallery_images JSONB DEFAULT '[]'::jsonb,
      is_published BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createStatsTable = `
    CREATE TABLE IF NOT EXISTS key_stats (
      id SERIAL PRIMARY KEY,
      label VARCHAR(120) NOT NULL,
      value VARCHAR(60) NOT NULL,
      sort_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createTestimonialsTable = `
    CREATE TABLE IF NOT EXISTS testimonials (
      id SERIAL PRIMARY KEY,
      name VARCHAR(180) NOT NULL,
      role VARCHAR(180),
      quote TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(120) UNIQUE NOT NULL,
      name VARCHAR(180) NOT NULL,
      headline VARCHAR(220) NOT NULL,
      tag VARCHAR(80) DEFAULT 'Nouveau',
      category VARCHAR(120) NOT NULL,
      description TEXT NOT NULL,
      long_description TEXT,
      stack VARCHAR(220),
      delivery VARCHAR(120),
      features JSONB DEFAULT '[]'::jsonb,
      image_url TEXT,
      gallery_images JSONB DEFAULT '[]'::jsonb,
      is_available BOOLEAN DEFAULT TRUE,
      is_published BOOLEAN DEFAULT TRUE,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await pool.query(createContactTable);
  await pool.query(createNewsTable);
  await pool.query(createStatsTable);
  await pool.query(createTestimonialsTable);
  await pool.query(createProductsTable);

  await pool.query("ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS excerpt TEXT;");
  await pool.query("ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS image_url TEXT;");
  await pool.query("ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;");
  await pool.query("ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;");
  await pool.query("ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;");
  await pool.query("UPDATE news_articles SET gallery_images = '[]'::jsonb WHERE gallery_images IS NULL;");
  await pool.query("UPDATE news_articles SET is_published = TRUE WHERE is_published IS NULL;");
  await pool.query("UPDATE news_articles SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL;");

  await pool.query("ALTER TABLE key_stats ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;");
  await pool.query("ALTER TABLE key_stats ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;");
  await pool.query("ALTER TABLE key_stats ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;");
  await pool.query("UPDATE key_stats SET sort_order = 0 WHERE sort_order IS NULL;");
  await pool.query("UPDATE key_stats SET is_active = TRUE WHERE is_active IS NULL;");
  await pool.query("UPDATE key_stats SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL;");

  await pool.query("ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS role VARCHAR(180);");
  await pool.query("ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;");
  await pool.query("ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;");
  await pool.query("ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;");
  await pool.query("UPDATE testimonials SET sort_order = 0 WHERE sort_order IS NULL;");
  await pool.query("UPDATE testimonials SET is_active = TRUE WHERE is_active IS NULL;");
  await pool.query("UPDATE testimonials SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL;");

  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS headline VARCHAR(220);");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS tag VARCHAR(80) DEFAULT 'Nouveau';");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS category VARCHAR(120);");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS long_description TEXT;");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS stack VARCHAR(220);");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS delivery VARCHAR(120);");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url TEXT;");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS is_available BOOLEAN DEFAULT TRUE;");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;");
  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;");
  await pool.query("UPDATE products SET headline = name WHERE headline IS NULL;");
  await pool.query("UPDATE products SET tag = 'Nouveau' WHERE tag IS NULL;");
  await pool.query("UPDATE products SET category = 'General' WHERE category IS NULL;");
  await pool.query("UPDATE products SET long_description = description WHERE long_description IS NULL;");
  await pool.query("UPDATE products SET features = '[]'::jsonb WHERE features IS NULL;");
  await pool.query("UPDATE products SET gallery_images = '[]'::jsonb WHERE gallery_images IS NULL;");
  await pool.query("UPDATE products SET is_available = TRUE WHERE is_available IS NULL;");
  await pool.query("UPDATE products SET is_published = TRUE WHERE is_published IS NULL;");
  await pool.query("UPDATE products SET sort_order = 0 WHERE sort_order IS NULL;");
  await pool.query("UPDATE products SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL;");
}
