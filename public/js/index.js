// function getPlayerCount() {
//     const fetchPromise = fetch("/playerCount"); 
//     const streamPromise = fetchPromise.then((response) => response.json()); 
//     streamPromise.then((data) => storePlayerCount(data));
// }
// function storePlayerCount(data) {
//     // window.localStorage.clear();
//     const playerCount = data.playerCount;
//     // window.localStorage.setItem('playerCount',JSON.stringify(playerCount));
//     document.getElementById("playerCount").innerHTML = playerCount;
// }

function getRandomPlayer(owner) {
    document.getElementById("img" + owner).src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxIEzc2yczw7EgFufcnzrst6IcClp74SIN8w&usqp=CAU";
    document.getElementById("playerName" + owner).innerHTML = "Choosing Player <i class='fas fa-spinner fa-spin'></i>";
    document.getElementById("playerInfo" + owner).innerHTML = " ";
    document.getElementById("stats" + owner).classList.add('is-hidden');
    // Hardcoded page numbers
    let pageMin = 2741;
    let pageMax = 3268;
    const num = Math.floor(Math.random() * (pageMax - pageMin + 1)) + pageMin;
    const fetchPromise = fetch("/getPlayer?page=" + num.toString() + "&per_page=1"); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => showRandomPlayer(data,owner));
}
function showRandomPlayer(data,owner) {
    document.getElementById("stats" + owner).classList.remove('is-hidden');
    console.log(data);
    const playerId = data.playerId;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const team = data.team;
    const position = data.position;
    let height = data.heightFeet + '"' + data.heightInches;
    let imgName = "";
    if (lastName.length < 5) {
        imgName = lastName.replace("'","") + firstName.replace("'","").substring(0,2);
        console.log(imgName);
        document.getElementById("img" + owner).src = "https://www.basketball-reference.com/req/202008124/images/players/" + imgName.toLowerCase() + "01.jpg";
    } else {
        imgName = lastName.replace("'","").substring(0,5) + firstName.replace("'","").substring(0,2);
        console.log(imgName.toLowerCase());
        document.getElementById("img" + owner).src = "https://www.basketball-reference.com/req/202008124/images/players/" + imgName.toLowerCase() + "01.jpg";
    }
    document.getElementById("playerId").innerHTML = playerId;
    document.getElementById("playerName" + owner).innerHTML = position + " " + firstName + " " + lastName;
    if (data.heightFeet == null) {
        document.getElementById("playerInfo" + owner).innerHTML = team + "<br>" + "Height: No Data";
    } else {
        document.getElementById("playerInfo" + owner).innerHTML = team + "<br>" + "Height: " + height;
    }

    getPlayerStats(playerId, owner);
}

function getPlayerStats(playerId, owner) {
    const fetchPromise = fetch("/getPlayerStats?season=2019&player_ids=" + playerId); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => showPlayerStats(data, owner));
}
function showPlayerStats(stats, owner) {
    console.log(stats);
    const playerId = stats.playerId;
    const gamesPlayed = stats.gamesPlayed;
    const minutes = stats.minutes;
    const points = stats.points;
    const rebounds = stats.rebounds;
    const offRebounds = stats.offRebounds;
    const defRebounds = stats.defRebounds;
    const assists = stats.assists;
    const steals = stats.steals;
    const blocks = stats.blocks;
    const turnovers = stats.turnovers;
    const fieldGoalPct = Math.round((stats.fieldGoalPct * 100) * 10) / 10 ;
    const fieldGoal3Pct = Math.round((stats.fieldGoal3Pct * 100) * 10) / 10 ;
    const freeThrowPct = Math.round((stats.freeThrowPct * 100) * 10) / 10 ;
    document.getElementById("gamesPlayed" + owner).innerHTML = gamesPlayed;
    document.getElementById("minutes" + owner).innerHTML = minutes;
    document.getElementById("points" + owner).innerHTML = points;
    document.getElementById("reb" + owner).innerHTML = rebounds;
    document.getElementById("oreb" + owner).innerHTML = offRebounds;
    document.getElementById("dreb" + owner).innerHTML = defRebounds;
    document.getElementById("assists" + owner).innerHTML = assists;
    document.getElementById("steals" + owner).innerHTML = steals;
    document.getElementById("blocks" + owner).innerHTML = blocks;
    document.getElementById("turnovers" + owner).innerHTML = turnovers;
    document.getElementById("fg" + owner).innerHTML = fieldGoalPct.toString() + "%";
    document.getElementById("3p" + owner).innerHTML = fieldGoal3Pct.toString() + "%";
    document.getElementById("ft" + owner).innerHTML = freeThrowPct.toString() + "%";
}

var image1 = document.getElementById('img1');
image1.onerror = function () {
  this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxIEzc2yczw7EgFufcnzrst6IcClp74SIN8w&usqp=CAU';
};

var image2 = document.getElementById('img2');
image2.onerror = function () {
  this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxIEzc2yczw7EgFufcnzrst6IcClp74SIN8w&usqp=CAU';
};

// window.onload = function() {
//     getPlayerStats();
// };