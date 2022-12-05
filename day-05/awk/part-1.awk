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

    # Move crates between stacks, one at a time
    while (moveCount-- > 0) {
        movedCrate = substr(stacks[fromStack], length(stacks[fromStack]), 1)
        stacks[fromStack] = substr(stacks[fromStack], 1, length(stacks[fromStack]) - 1)
        stacks[toStack] = stacks[toStack] movedCrate
    }
}

# Print top crate of each stack
END {
    result = ""
    
    for (stack in stacks) {
        result = result substr(stacks[stack], length(stacks[stack]))
    }

    print result
}
