import mysql from "mysql2/promise";
import { initializeDatabase } from "../configs/database.js";

export const up = async () => {
  const connection = await initializeDatabase();

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS UserTable (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Email VARCHAR(255) NOT NULL,
        PasswordHash VARCHAR(255) NOT NULL,
        UserName VARCHAR(255) NOT NULL,
        Balance INT DEFAULT 0,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP
      )
        ENGINE=InnoDB
        DEFAULT CHARSET=utf8mb4
        COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("✅ Migration UP: UserTable created");
  } catch (error) {
    console.error("❌ Migration UP failed:", error);
    throw error;
  } finally {
    // Do not close the shared pool here; `run.js` will close it after all migrations run.
  }
};

export const down = async () => {
  const connection = await initializeDatabase();

  try {
    await connection.execute(`
      DROP TABLE IF EXISTS UserTable
    `);

    console.log("✅ Migration DOWN: UserTable dropped");
  } catch (error) {
    console.error("❌ Migration DOWN failed:", error);
    throw error;
  } finally {
    // Do not close the shared pool here.
  }
};
