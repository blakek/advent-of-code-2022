import * as fs from "fs";

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

export function intersection(groupA: string, groupB: string): string[] {
  const setA = new Set([...groupA]);
  const setB = new Set([...groupB]);

  const result = new Set<string>();

  for (const value of setA) {
    if (setB.has(value)) {
      result.add(value);
    }
  }

  return [...result];
}

function sortIntoBagCompartments(lines: string[]) {
  return (
    lines
      // Filter out empty lines
      .filter((line) => line.length > 0)
      // Split each bag into equal compartments
      .map((line) => {
        const middle = Math.floor(line.length / 2);
        return [line.slice(0, middle), line.slice(middle)];
      })
  );
}

const sum = (...nums: number[]) => nums.reduce((a, b) => a + b, 0);

async function main() {
  const input = await getInput();
  const inputLines = input.split("\n");
  const bagCompartments = sortIntoBagCompartments(inputLines);

  const commonItems = bagCompartments.flatMap(([left, right]) =>
    intersection(left, right)
  );

  const itemPriorities = commonItems.map(getItemPriority);

  console.log(sum(...itemPriorities));
}

main();
