BEGIN {
    FS = ","
    fullyDuplicatedCount = 0
}

{
    split($1, rangeA, "-")
    split($2, rangeB, "-")

    doesOverlap = \
        rangeA[1] <= rangeB[2] && range[2] >= rangeB[1] ||
        rangeB[1] <= rangeA[2] && rangeB[2] >= rangeA[1]

    if (doesOverlap) {
        fullyDuplicatedCount++
    }
}

END {
    print fullyDuplicatedCount
}
