import { up as up001 } from "./001-create-laptopTable.js";
import { up as up002 } from "./002-create-userTable.js";
import { up as up003 } from "./003-create-cpuTable.js";
import { up as up004 } from "./004-create-gpuTable.js";
import { up as up005 } from "./005-create-ramTable.js";
import { up as up006 } from "./006-create-storageTable.js";
import { initializeDatabase } from "../configs/database.js";

const runMigration = async () => {
  let pool;
  try {
    console.log("🚀 Running migrations UP...");
    await up001();
    await up002();
    await up003();
    await up004();
    await up005();
    await up006();
    console.log("🎉 All migrations completed");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exitCode = 1;
  } finally {
    try {
      pool = await initializeDatabase();
      if (pool && typeof pool.end === "function") {
        await pool.end();
        console.log("🔒 Database pool closed");
      }
    } catch (err) {
      console.error("❌ Failed to close DB pool:", err);
    }
    process.exit();
  }
};

runMigration();
