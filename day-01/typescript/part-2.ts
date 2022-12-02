import * as fs from "fs";

async function getInput() {
  const filePath = process.argv[2];
  return fs.promises.readFile(filePath, "utf8");
}

const sum = (...nums: number[]) => nums.reduce((a, b) => a + b, 0);

function groupNumericInputs(inputLines: string[]) {
  return inputLines.reduce(
    (chunks, line) => {
      if (line === "") {
        chunks.push([] as number[]);
      } else {
        chunks[chunks.length - 1].push(parseInt(line, 10));
      }
      return chunks;
    },
    [[]] as number[][]
  );
}

function sortNumericDescending(a: number, b: number) {
  return b - a;
}

async function main() {
  const input = await getInput();
  const inputLines = input.split("\n");

  const topCalories = groupNumericInputs(inputLines)
    .map((calories) => sum(...calories))
    .sort(sortNumericDescending)
    .slice(0, 3);

  console.log(sum(...topCalories));
}

main();
