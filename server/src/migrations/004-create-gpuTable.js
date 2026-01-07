import { initializeDatabase } from "../configs/database.js";

export const up = async () => {
  const connection = await initializeDatabase();

  try {
    await connection.execute(`
				CREATE TABLE IF NOT EXISTS gpus (
						id INT PRIMARY KEY,
						name VARCHAR(255) NOT NULL,
						brand VARCHAR(100) NOT NULL,
						price DECIMAL(10, 2) NOT NULL,
						stock INT DEFAULT 0,
                        cuda_core INT NULL,
                        base_clock INT NULL,
                        vram INT NULL,
                        pcie INT NULL,
						created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
						updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
								ON UPDATE CURRENT_TIMESTAMP
				)
				ENGINE=InnoDB
				DEFAULT CHARSET=utf8mb4
				COLLATE=utf8mb4_unicode_ci;
		`);

    console.log("✅ Migration UP: gpus table created");
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
			DROP TABLE IF EXISTS gpus
		`);

    console.log("✅ Migration DOWN: gpus table dropped");
  } catch (error) {
    console.error("❌ Migration DOWN failed:", error);
    throw error;
  } finally {
    // Do not close the shared pool here.
  }
};
