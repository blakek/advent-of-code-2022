BEGIN {
    currentElfCalories = 0
    maxCalories = 0
}

# Empty lines separate elf calorie counts
NF == 0 {
    if (currentElfCalories > maxCalories) {
        maxCalories = currentElfCalories
    }
    
    currentElfCalories = 0
}

# Add the calories each elf has
/^[0-9]+$/ {
    currentElfCalories += $1
}

END {
    print maxCalories
}
