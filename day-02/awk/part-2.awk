BEGIN {
    score = 0;
    
    drawScore = 3;
    winningScore = 6;

    opponent["A"] = "Rock";
    opponent["B"] = "Paper";
    opponent["C"] = "Scissors";

    move["X"] = "Lose";
    move["Y"] = "Draw";
    move["Z"] = "Win";

    scoreBoost["Rock"] = 1;
    scoreBoost["Paper"] = 2;
    scoreBoost["Scissors"] = 3;
}

function getWinningMove(move) {
    if (move == "Rock") {
        return "Paper";
    } else if (move == "Paper") {
        return "Scissors";
    } else if (move == "Scissors") {
        return "Rock";
    }
}

{
    opponentMove = opponent[$1];
    response = move[$2];
    
    if (response == "Win") {
        responseMove = getWinningMove(opponentMove);
        score += winningScore;
    } else if (response == "Lose") {
        responseMove = getWinningMove(getWinningMove(opponentMove));
    } else if (response == "Draw") {
        responseMove = opponentMove;
        score += drawScore;
    }
    
    score += scoreBoost[responseMove];
}

END {
    print score;
}
