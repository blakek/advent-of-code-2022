#!/usr/bin/env bash

##
# Sets up the repo for a new advent of code challenge.
# To run, execute `./repo-setup.bash` from the directory you want to create the files in
##

# Make all the day directories
mkdir day-{01..25}

# Add readme files to each day
touch day-{01..25}/README.md

# Add the input files (the test and the actual) to each day
mkdir day-{01..25}/_input
touch day-{01..25}/_input/input.txt
touch day-{01..25}/_input/test-input.txt
