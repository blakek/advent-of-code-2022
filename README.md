# [Advent of Code - 2022](https://adventofcode.com/2022)

> A list of solutions for the Advent of Code 2022.

:warning: The daily README files contain the answers to the puzzles. I wouldn't call them "spoilers", but you might want to avoid them if you want to solve the puzzles yourself.

If you're not familiar with [Advent of Code](https://adventofcode.com), it's a list of programming puzzles released every year. Most days in December, a new puzzle is released. Each puzzle has 2 parts, and you can solve them however you want.

This year, I'm mostly using common Unix tools like `awk` to show how powerful these tools can be.

## Usage

This repository contains an `aoc` script that can be used to run the solutions. Here's some example usages:

```bash
# Run the current day's solutions (both parts, in the first language found)
./aoc

# Run the current day's solution against the example input
./aoc --test

# Run the solutions for December 5th
./aoc --day 5

# Run the part 2 solution for December 1st using TypeScript
./aoc --day 1 --part 2 --language typescript
```

Also, there's a `--help` flag with all the options.

If you want to make your own repo, there's also a `setup.bash` script you can reference thats 5 lines of code.
