import * as fs from "fs";

async function getInputLines() {
  const filePath = process.argv[2];
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const lines = fileContents.split("\n");
  return lines.filter((line) => line.length > 0);
}

const coord = (x: number, y: number) => `${x},${y}`;

async function main() {
  const input = await getInputLines();
  const treeGrid = input.map((line) => line.split("").map(Number));

  const width = treeGrid[0].length;
  const height = treeGrid.length;

  const visibleTrees = new Set<string>();
  const outerTreeHeights: Record<string, number> = {};

  // Add outer edges to test against
  for (let x = 0; x < width; x++) {
    outerTreeHeights[coord(x, 0)] = treeGrid[0][x];
    outerTreeHeights[coord(x, height - 1)] = treeGrid[height - 1][x];
  }

  for (let y = 0; y < height; y++) {
    outerTreeHeights[coord(0, y)] = treeGrid[y][0];
    outerTreeHeights[coord(width - 1, y)] = treeGrid[y][width - 1];
  }

  // Find all trees that are visible from the outer edges
  // Top-down
  for (let x = 1; x < width - 1; x++) {
    let tallestTree = outerTreeHeights[coord(x, 0)];

    for (let y = 1; y < height - 1; y++) {
      const treeHeight = treeGrid[y][x];
      if (treeHeight > tallestTree) {
        visibleTrees.add(coord(x, y));
        tallestTree = treeHeight;
      }
    }
  }

  // Bottom-up
  for (let x = 1; x < width - 1; x++) {
    let tallestTree = outerTreeHeights[coord(x, height - 1)];

    for (let y = height - 2; y > 0; y--) {
      const treeHeight = treeGrid[y][x];
      if (treeHeight > tallestTree) {
        visibleTrees.add(coord(x, y));
        tallestTree = treeHeight;
      }
    }
  }

  // Left-right
  for (let y = 1; y < height - 1; y++) {
    let tallestTree = outerTreeHeights[coord(0, y)];

    for (let x = 1; x < width - 1; x++) {
      const treeHeight = treeGrid[y][x];
      if (treeHeight > tallestTree) {
        visibleTrees.add(coord(x, y));
        tallestTree = treeHeight;
      }
    }
  }

  // Right-left
  for (let y = 1; y < height - 1; y++) {
    let tallestTree = outerTreeHeights[coord(width - 1, y)];

    for (let x = width - 2; x > 0; x--) {
      const treeHeight = treeGrid[y][x];
      if (treeHeight > tallestTree) {
        visibleTrees.add(coord(x, y));
        tallestTree = treeHeight;
      }
    }
  }

  const outerTreeCount = width * 2 + height * 2 - 4;

  console.log(visibleTrees.size + outerTreeCount);
}

main();
