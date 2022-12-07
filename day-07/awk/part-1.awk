function push(array, value) {
    array[length(array)] = value
}

function pop(array) {
    value = array[length(array) - 1]
    delete array[length(array) - 1]
    return value
}

BEGIN {
    directorySizes["/"] = 0
    trackingDirectories[0] = ""
}

# Change directory
$1 == "$" && $2 == "cd" {
    if ($3 == "/") {
        # Navigate to the root directory
        trackingDirectories[0] = "/"
    } else if ($3 == "..") {
        # Navigate up one directory
        pop(trackingDirectories)
    } else {
        # Navigate down one directory
        cwd = trackingDirectories[length(trackingDirectories) - 1]
        
        if (cwd != "/") {
            cwd = cwd "/"
        }
        
        push(trackingDirectories, cwd $3)
    }
}

# Get file sizes
$1 ~ /^[0-9]+$/ {
    for (i in trackingDirectories) {
        directorySizes[trackingDirectories[i]] += $1
    }
}

END {
    # Print the directory sizes
    sum = 0
    
    for (i in directorySizes) {
        directorySize = directorySizes[i]
        if (directorySize < 100000) {
            sum += directorySize
        }
    }

    print sum
}
