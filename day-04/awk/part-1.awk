BEGIN {
    FS = ","
    fullyDuplicatedCount = 0
}

{
    split($1, rangeA, "-")
    split($2, rangeB, "-")

    isFullyContained = \
        rangeA[1] <= rangeB[1] && rangeA[2] >= rangeB[2] ||
        rangeA[1] >= rangeB[1] && rangeA[2] <= rangeB[2]

    if (isFullyContained) {
        fullyDuplicatedCount++
    }
}

END {
    print fullyDuplicatedCount
}
