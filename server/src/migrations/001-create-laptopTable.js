import { initializeDatabase } from "../configs/database.js";

export const up = async () => {
  const connection = await initializeDatabase();

  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS LaptopTable (
        Id INT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Brand VARCHAR(100) NOT NULL,
        Price DECIMAL(10, 2) NOT NULL,
        Stock INT DEFAULT 0,
        CpuId INT NOT NULL,
        CpuName VARCHAR(255) NOT NULL,
        GpuId INT NOT NULL,
        GpuName VARCHAR(255) NOT NULL,
        RamId INT NOT NULL,
        RamName VARCHAR(255) NOT NULL,
        StorageId INT NOT NULL,
        StorageName VARCHAR(255) NOT NULL,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP
      )
        ENGINE=InnoDB
        DEFAULT CHARSET=utf8mb4
        COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("✅ Migration UP: laptop table created");
  } catch (error) {
    console.error("❌ Migration UP failed:", error);
    throw error;
  } finally {
    // Do not close the shared pool here; `run.js` will close the pool after all migrations.
  }
};

/**
 * DOWN: xóa bảng laptops
 */
export const down = async () => {
  const connection = await initializeDatabase();

  try {
    await connection.execute(`
      DROP TABLE IF EXISTS laptops
    `);

    console.log("✅ Migration DOWN: laptops table dropped");
  } catch (error) {
    console.error("❌ Migration DOWN failed:", error);
    throw error;
  } finally {
    // Do not close the shared pool here.
  }
};
