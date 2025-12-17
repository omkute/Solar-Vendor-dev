import dotenv from "dotenv";
dotenv.config(); 

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set!");
  process.exit(1);
}