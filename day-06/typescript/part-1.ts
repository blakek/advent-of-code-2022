import * as fs from "fs";

async function getInput() {
  const filePath = process.argv[2];
  return fs.promises.readFile(filePath, "utf8");
}

function areAllUnique(characters: string) {
  return new Set(characters).size === characters.length;
}

async function main() {
  const input = await getInput();
  const startOfPacketLength = 4;

  // Start at the lowest possible packet length and work our way up
  for (let index = startOfPacketLength - 1; index < input.length; index++) {
    const characters = input.slice(index + 1 - startOfPacketLength, index + 1);

    if (areAllUnique(characters)) {
      console.log(index + 1);
      break;
    }
  }
}

main();
