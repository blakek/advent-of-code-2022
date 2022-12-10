import * as fs from "fs";

async function getInputLines() {
  const filePath = process.argv[2];
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const lines = fileContents.split("\n");
  return lines.filter((line) => line.length > 0);
}

function getViewScore(array: number[], index: number) {
  const left = array.slice(0, index).reverse();
  const right = array.slice(index + 1);

  const leftLarger = left.findIndex((value) => value >= array[index]);
  const rightLarger = right.findIndex((value) => value >= array[index]);

  const leftDistance = leftLarger === -1 ? left.length : leftLarger + 1;
  const rightDistance = rightLarger === -1 ? right.length : rightLarger + 1;

  return leftDistance * rightDistance;
}

async function main() {
  const input = await getInputLines();

  const treeGridRows = input.map((line) => line.split("").map(Number));

  const treeGridColumns = treeGridRows[0].map((_, i) =>
    treeGridRows.map((row) => row[i])
  );

  const viewScores = treeGridRows
    .map((row, y) =>
      row.map(
        (_, x) => getViewScore(row, x) * getViewScore(treeGridColumns[x], y)
      )
    )
    .flat();

  console.log(Math.max(...viewScores));
}

main();
