# Read current stack setup
/\[.*\]/ {
    split($0, input, / {1,4}/)

    for (stack in input) {
        crate = substr(input[stack], 2, length(input[stack]) - 2)
        if (crate != "") {
            stacks[stack] = crate stacks[stack]
        }
    }
}

# Read move commands
$1 == "move" {
    moveCount = $2
    fromStack = $4
    toStack = $6

    fromStackLength = length(stacks[fromStack])
    toStackLength = length(stacks[toStack])
    
    # Move crates between stacks, multiple at a time
    movedCrates = substr(stacks[fromStack], fromStackLength + 1 - moveCount)
    stacks[fromStack] = substr(stacks[fromStack], 1, fromStackLength - moveCount)
    stacks[toStack] = stacks[toStack] movedCrates
}

# Print top crate of each stack
END {
    result = ""
    
    for (stack in stacks) {
        result = result substr(stacks[stack], length(stacks[stack]))
    }

    print result
}
