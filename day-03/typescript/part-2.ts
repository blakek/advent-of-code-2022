import * as fs from "fs";

function chunkLines(chunkSize: number, lines: string[]): string[][] {
  if (lines.length <= chunkSize) return [lines];

  return [
    lines.slice(0, chunkSize),
    ...chunkLines(chunkSize, lines.slice(chunkSize)),
  ];
}

async function getInput() {
  const filePath = process.argv[2];
  return fs.promises.readFile(filePath, "utf8");
}

function getItemPriority(item: string) {
  const charCode = item.charCodeAt(0);
  const isLowerCase = charCode >= 97 && charCode <= 122;
  const difference = isLowerCase ? 96 : 38;

  return charCode - difference;
}

export function intersection(...[groupA, groupB, ...rest]: string[]): string[] {
  if (!groupA || !groupB) return [];

  const setA = new Set(groupA.split(""));
  const setB = new Set(groupB.split(""));

  const commonCharacters = new Set<string>();

  for (const value of setA) {
    if (setB.has(value)) {
      commonCharacters.add(value);
    }
  }

  const result = [...commonCharacters];

  if (rest.length === 0) return result;

  return intersection(result.join(""), ...rest);
}

const sum = (...nums: number[]) => nums.reduce((a, b) => a + b, 0);

async function main() {
  const input = await getInput();
  const inputLines = input.split("\n").filter((line) => line.length > 0);
  const inputChunks = chunkLines(3, inputLines);

  const commonItems = inputChunks.flatMap((parts) => intersection(...parts));
  const itemPriorities = commonItems.map(getItemPriority);

  console.log(sum(...itemPriorities));
}

main();
