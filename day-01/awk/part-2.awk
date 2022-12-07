BEGIN {
    # Only keep this many top calories
    TOP_CALORIE_COUNT = 3
    
    currentElf = 0
    caloriesByElf[currentElf] = 0
}

# Empty lines separate elf calorie counts
NF == 0 {
    currentElf++
    caloriesByElf[currentElf] = 0
}

# Add the calories each elf has
/^[0-9]+$/ {
    caloriesByElf[currentElf] = caloriesByElf[currentElf] + $1
}

END {
    # Sort by calories, descending
    PROCINFO["sorted_in"] = "@ind_num_desc"
    asort(caloriesByElf)

    # Add the top calories
    topCalories = 0
    elvesCounted = 0
    for (elf in caloriesByElf) {
        if (++elvesCounted > TOP_CALORIE_COUNT) {
            break
        }
        topCalories += caloriesByElf[elf]
    }

    print topCalories
}
