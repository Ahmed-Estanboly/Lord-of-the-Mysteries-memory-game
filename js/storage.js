// -------------- main -------------------
let leaderboard=[
    {
        name:"Nobody",
        score:0,
        time: "0",
        moves:"0"
    },
    {
        name:"Nobody",
        score:0,
        time: "0",
        moves:"0"
    },
    {
        name:"Nobody",
        score:0,
        time: "0",
        moves:"0"
    },
    {
        name:"Nobody",
        score:0,
        time: "0",
        moves:"0"
    },
    {
        name:"Nobody",
        score:0,
        time: "0",
        moves:"0"
    }
];
// localStorage.setItem("leaderboard",JSON.stringify(leaderboard))

if(localStorage.getItem("leaderboard")) leaderboard=JSON.parse(localStorage.getItem("leaderboard"));
    else localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
function refreshLeaderBoard()
{
    if(localStorage.getItem("leaderboard")) leaderboard=JSON.parse(localStorage.getItem("leaderboard"));
    else localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
    let curPlayer = document.getElementById("player-name").value;
    let curScore = new Number(document.getElementById("score").textContent);
    let curTime = document.getElementById("timer").textContent;
    let curMoves = document.getElementById("moves-counter").textContent;
    let cur = {
        name:curPlayer,
        score:curScore.valueOf(),
        time: curTime,
        moves:curMoves
    };
    for(let i=0;i< leaderboard.length;i++)
    {
        
        if(leaderboard[i].score < cur.score)
        {
            [leaderboard[i], cur] = [cur, leaderboard[i]];

        }
    }
    localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
    renderLeaderboard(leaderboard);
}
function saveScore(){
    refreshLeaderBoard();
    document.getElementById("win-screen").style.display="none";
}