import { describe, it, expect } from "vitest";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import "dotenv/config";

const SNIPPETS_DIR = path.resolve(process.cwd());

function runNodeFile(filePath: string, timeoutMs = 10_000) {
  return new Promise<{ code: number | null; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(process.execPath, [filePath], {
      cwd: process.cwd(),
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));

    const timer = setTimeout(() => {
      stderr += `\n[vitest] Timeout after ${timeoutMs}ms\n`;
      child.kill("SIGKILL");
    }, timeoutMs);

    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
}

describe("Node.js SDK code snippets", async () => {
  const files = (await readdir(SNIPPETS_DIR))
    .filter((f) => f.endsWith(".mjs") || f.endsWith(".js"))
    .sort()
    .map((f) => path.join(SNIPPETS_DIR, f));

  it("has at least one snippet", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    it(path.relative(process.cwd(), file), async () => {
      const { code, stdout, stderr } = await runNodeFile(file, 10_000);

      if (code !== 0) {
        // Make failures super actionable in CI
        throw new Error(
          [
            `Snippet failed: ${file}`,
            `exit code: ${code}`,
            `--- stdout ---`,
            stdout || "(empty)",
            `--- stderr ---`,
            stderr || "(empty)",
          ].join("\n")
        );
      }
    });
  }
});
