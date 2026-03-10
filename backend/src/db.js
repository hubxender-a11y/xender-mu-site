import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL
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

  await pool.query("ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery_images JSONB DEFAULT '[]'::jsonb;");
  await pool.query("UPDATE products SET gallery_images = '[]'::jsonb WHERE gallery_images IS NULL;");
}








