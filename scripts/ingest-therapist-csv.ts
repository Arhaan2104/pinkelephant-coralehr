import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { normalizeTherapistIntake } from "../src/lib/normalize-intake";
import { parseCsv } from "../src/lib/parse-csv";

async function main() {
  const [inputPath, ...rest] = process.argv.slice(2);

  if (!inputPath) {
    console.error("Usage: npm run ingest:csv -- <path-to-csv> [--write <output-path>]");
    process.exitCode = 1;
    return;
  }

  const { readFile } = await import("node:fs/promises");
  const csvText = await readFile(inputPath, "utf8");
  const rows = parseCsv(csvText);

  if (rows.length < 2) {
    console.error("Expected a header row and at least one response row.");
    process.exitCode = 1;
    return;
  }

  const [header, response] = rows;
  const record = Object.fromEntries(header.map((column, index) => [column, response[index] ?? ""]));
  const normalized = normalizeTherapistIntake(record);
  const writeIndex = rest.indexOf("--write");
  const output = JSON.stringify(normalized, null, 2);

  if (writeIndex >= 0 && rest[writeIndex + 1]) {
    const outputPath = path.resolve(rest[writeIndex + 1]);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, output);
    console.error(`Wrote normalized intake to ${outputPath}`);
  } else {
    console.log(output);
  }

  if (normalized.warnings.length > 0) {
    console.error("Warnings:");
    for (const warning of normalized.warnings) {
      console.error(`- ${warning}`);
    }
  }
}

void main();
