BEGIN {
    score = 0
    
    drawScore = 3
    winningScore = 6

    opponent["A"] = "Rock"
    opponent["B"] = "Paper"
    opponent["C"] = "Scissors"

    move["X"] = "Rock"
    move["Y"] = "Paper"
    move["Z"] = "Scissors"

    scoreBoost["Rock"] = 1
    scoreBoost["Paper"] = 2
    scoreBoost["Scissors"] = 3
}

{
    opponentMove = opponent[$1]
    responseMove = move[$2]
    score += scoreBoost[responseMove]

    didWin = (opponentMove == "Rock" && responseMove == "Paper") ||
             (opponentMove == "Paper" && responseMove == "Scissors") ||
             (opponentMove == "Scissors" && responseMove == "Rock")

    if (didWin) {
        score += winningScore
    } else if (opponentMove == responseMove) {
        score += drawScore
    }
}

END {
    print score
}
