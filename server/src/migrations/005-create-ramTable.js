import { initializeDatabase } from "../configs/database.js";

export const up = async () => {
  const connection = await initializeDatabase();

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS RamTable (
        Id INT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Brand VARCHAR(100) NOT NULL,
        Price DECIMAL(10, 2) NOT NULL,
        Stock INT DEFAULT 0,
        Capacity INT NULL,
        Gen VARCHAR(255) NULL,
        Speed INT NULL,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP
      )
        ENGINE=InnoDB
        DEFAULT CHARSET=utf8mb4
        COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("✅ Migration UP: RamTable created");
  } catch (error) {
    console.error("❌ Migration UP failed:", error);
    throw error;
  } finally {
    // Do not close the shared pool here; `run.js` will close it once.
  }
};

export const down = async () => {
  const connection = await initializeDatabase();

  try {
    await connection.execute(`
      DROP TABLE IF EXISTS RamTable
    `);

    console.log("✅ Migration DOWN: RamTable dropped");
  } catch (error) {
    console.error("❌ Migration DOWN failed:", error);
    throw error;
  } finally {
    // Do not close the shared pool here.
  }
};
