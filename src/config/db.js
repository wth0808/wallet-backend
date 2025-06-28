import { neon } from "@neondatabase/serverless";
import "dotenv/config";

export const sql = neon(process.env.DATABASE_URL);

export async function initDB() {
  try {
    await sql`
        create table IF NOT EXISTS transactions(
        id Serial primary key,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount decimal(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL default current_date
        )`;
    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}
