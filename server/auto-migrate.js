#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelsDir = path.join(__dirname, "src", "models");
const migrationsDir = path.join(__dirname, "src", "migrations");

// Function to get all model files
function getModelFiles() {
  return fs
    .readdirSync(modelsDir)
    .filter((file) => file.endsWith("Model.js") && file !== "index.js")
    .map((file) => path.join(modelsDir, file));
}

// Function to generate migration for a model
function generateMigration(modelFile) {
  const modelName = path.basename(modelFile, "Model.js");
  const timestamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0];
  const migrationName = `${timestamp}-create-${modelName.toLowerCase()}`;

  console.log(`Generating migration for ${modelName}...`);

  try {
    execSync(`npm run db:migration:generate ${migrationName}`, {
      cwd: __dirname,
      stdio: "inherit",
    });
    console.log(`Migration generated: ${migrationName}`);
  } catch (error) {
    console.error(
      `Failed to generate migration for ${modelName}:`,
      error.message,
    );
  }
}

// Function to check if migration already exists
function migrationExists(modelName) {
  const files = fs.readdirSync(migrationsDir);
  const pattern = new RegExp(`create-${modelName.toLowerCase()}`);
  return files.some((file) => pattern.test(file));
}

// Main function
function autoMigrate() {
  console.log("Starting automatic migration generation...");

  const modelFiles = getModelFiles();

  modelFiles.forEach((modelFile) => {
    const modelName = path.basename(modelFile, "Model.js");
    if (!migrationExists(modelName)) {
      generateMigration(modelFile);
    } else {
      console.log(`Migration for ${modelName} already exists.`);
    }
  });

  console.log("Automatic migration generation completed.");
}

// Run the script
autoMigrate();
