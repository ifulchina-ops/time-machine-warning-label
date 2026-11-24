// Funniest Time Machine Warning Label — make.fun entry.
//
// Writes a single warning label for a time machine to /output/entry.txt.
// The label is 108 characters: inside the competition's 1–120 character
// gate, one line, no trailing newline, deterministic on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LABEL =
  "WARNING: Do not visit your grandfather. He is armed, he is suspicious, and technically, you are trespassing.";

// The competition gate: /output/entry.txt must hold 1–120 characters
// of UTF-8 text, not only whitespace. Refuse to finish silently if
// the label ever drifts outside it.
const MIN_CHARS = 1;
const MAX_CHARS = 120;

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LABEL, "utf8");
const written = readFileSync("/output/entry.txt", "utf8");
if (written.length < MIN_CHARS || written.length > MAX_CHARS) {
  throw new Error(
    `entry.txt is ${written.length} chars, outside the ${MIN_CHARS}–${MAX_CHARS} gate`,
  );
}
if (written.trim().length === 0) {
  throw new Error("entry.txt holds only whitespace");
}
console.log(LABEL);
console.log(`chars: ${written.length}`);
