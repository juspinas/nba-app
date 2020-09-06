// Get a random player
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
// Shows player name and info
function showRandomPlayer(data,owner) {
    if (owner == "1") {
        document.getElementById("stats" + owner).classList.remove('is-hidden');
    }
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
    document.getElementById("playerName" + owner).innerHTML = "<span class='playerPosition'>" + position + "</span> " + firstName + " " + lastName;
    if (data.heightFeet == null) {
        document.getElementById("playerInfo" + owner).innerHTML = team + "<br>" + "Height: No Data";
    } else {
        document.getElementById("playerInfo" + owner).innerHTML = team + "<br>" + "Height: " + height;
    }
    getPlayerStats(playerId, owner);
}

// Get a player's Stats
function getPlayerStats(playerId, owner) {
    const fetchPromise = fetch("/getPlayerStats?season=2019&player_ids=" + playerId); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => showPlayerStats(data, owner));
}
function showPlayerStats(stats, owner) {
    const allStats = ["gamesPlayed","minutes","points",
    "reb", "oreb","dreb","assists","steals",
    "blocks","turnovers","fg","3p","ft"];
    console.log(stats);
    const playerId = stats.playerId; // NOT USED
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
    for (i = 0; i < allStats.length; i++) {
        if (document.getElementById(allStats[i] + "1Text").classList.contains('is-hidden')) {
            document.getElementById(allStats[i] + "1Text").classList.remove('is-hidden');
        }
    }
}

// compare the stats of the two players 
function compareStat(stat) {
    const allStats = ["gamesPlayed","minutes","points",
    "reb", "oreb","dreb","assists","steals",
    "blocks","turnovers","fg","3p","ft"];

    for (i = 0; i < allStats.length; i++) {
        if (allStats[i] + "1Text" != stat + "1Text") {
            document.getElementById(allStats[i] + "1Text").classList.add('is-hidden');
        } else {
            document.getElementById(allStats[i] + "1Text").disabled = true;
        }
    }
    let stat1 = document.getElementById(stat + "1").textContent;
    let stat2 = document.getElementById(stat + "2").textContent;
    let winTotal = document.getElementById("winCount").textContent;
    let lossTotal = document.getElementById("lossCount").textContent;
    stat1 = parseFloat(stat1);
    stat2 = parseFloat(stat2);
    winTotal = parseInt(winTotal);
    lossTotal = parseInt(lossTotal);
    if (stat1 < stat2) {
        // Lower stat
        if (stat == "turnovers") {
            document.getElementById("winCount").innerHTML = (winTotal + 1).toString();
            document.getElementById("card1").classList.add('zoom');
            document.getElementById("winCount").classList.add('zoom-green');
        } else {
            document.getElementById("lossCount").innerHTML = (lossTotal + 1).toString();
            document.getElementById("card1").classList.add('shake');
            document.getElementById("lossCount").classList.add('shake-red');
        }
    } else if (stat1 == stat2) {
        // Tie
        document.getElementById("columnsContainer").classList.add('shake-tie');
    } else {
        // // higher stat
        if (stat == "turnovers") {
            document.getElementById("lossCount").innerHTML = (lossTotal + 1).toString();
            document.getElementById("card1").classList.add('shake');
            document.getElementById("lossCount").classList.add('shake-red');
        } else {
            document.getElementById("winCount").innerHTML = (winTotal + 1).toString();
            document.getElementById("card1").classList.add('zoom');
            document.getElementById("winCount").classList.add('zoom-green');
        }
    }    

    document.getElementById("stats2").classList.remove('is-hidden');
    document.getElementById(stat + "2Text").classList.remove('is-hidden');
    document.getElementById("nextButton").classList.remove('is-hidden');

}

// Reset the visibility of stats
function resetStat() {
    const allStats = ["gamesPlayed","minutes","points",
    "reb", "oreb","dreb","assists","steals",
    "blocks","turnovers","fg","3p","ft"];
    document.getElementById("nextButton").classList.add('is-hidden');
    for (i = 0; i < allStats.length; i++) {
        if (!document.getElementById(allStats[i] + "2Text").classList.contains('is-hidden')) {
            document.getElementById(allStats[i] + "2Text").classList.add('is-hidden');
            document.getElementById(allStats[i] + "1Text").classList.add('is-hidden');
            document.getElementById(allStats[i] + "1Text").disabled = false;
        }
    }
    // Remove animation classes
    if (document.getElementById("card1").classList.contains('shake')) {
        document.getElementById("card1").classList.remove('shake');
        document.getElementById("lossCount").classList.remove('shake-red');
    }
    if (document.getElementById("card1").classList.contains('zoom')) {
        document.getElementById("card1").classList.remove('zoom');
        document.getElementById("winCount").classList.remove('zoom-green');
    }
    if (document.getElementById("columnsContainer").classList.contains('shake-tie')) {
        document.getElementById("columnsContainer").classList.remove('shake-tie');
    }
    newRound();
}

function resetRecord() {
    document.getElementById("winCount").innerHTML = "0";
    document.getElementById("lossCount").innerHTML = "0";
    newRound();
}

// how to play modal functions
document.getElementById("howToPlayButton").addEventListener("click", function () {
    document.getElementById("howToPlayModal").classList.toggle("is-active");
    if (document.getElementById("dropdownButton").classList.contains("is-active")) {
        document.getElementById("dropdownButton").classList.toggle("is-active");
        document.getElementById("navbarMenuHero").classList.toggle("is-active");
    }
});
document.getElementById("howToPlayModalBackground").addEventListener("click", function () {
    document.getElementById("howToPlayModal").classList.toggle("is-active");
});
document.getElementById("howToPlayModalCloseButton").addEventListener("click", function () {
    document.getElementById("howToPlayModal").classList.toggle("is-active");
});

// Dark/Light mode
document.getElementById("darkLightButton").addEventListener("click", function () {
    let allStatsButtons = document.getElementsByClassName('statsButton');
    let allOpponentStats = document.getElementsByClassName('opponentStats');

    if (document.getElementById("background").classList.contains("bg-dark")) {
        document.body.style.backgroundColor = "white";
        document.getElementById("html").style.backgroundColor = "white";
        document.getElementById("background").classList.remove("bg-dark");
        document.getElementById("card1").classList.remove("dark-element");
        document.getElementById("card2").classList.remove("dark-element");
        document.getElementById("navbar").classList.remove("dark-header");
        document.getElementById("navbar").classList.add("is-link");
        document.getElementById("logoImg").src = "/images/logo.png";
        document.getElementById("yourPlayerTitle").classList.remove("dark-header");
        document.getElementById("yourOpponentTitle").classList.remove("dark-header");
        document.getElementById("yourPlayerTitle").classList.add("light-header");
        document.getElementById("yourOpponentTitle").classList.add("light-header");
        document.getElementById("playerName1").classList.remove("textWhite");
        document.getElementById("playerName2").classList.remove("textWhite");
        document.getElementById("playerInfo1").classList.remove("textWhite");
        document.getElementById("playerInfo2").classList.remove("textWhite");
        for (i = 0; i < allStatsButtons.length; i++) {
            allStatsButtons[i].style.color = 'black';
            allOpponentStats[i].style.color = 'black';
        }
        document.getElementById("nextButton").classList.remove("dark-button");
        document.getElementById("nextButton").classList.add("light-button");
        document.getElementById("howToPlayHeader").classList.remove("dark-header");
        document.getElementById("howToPlayHeader").classList.add("light-header");
        document.getElementById("logoImgHowToPlay").src = "/images/logo.png";
        document.getElementById("howToPlayBody").classList.remove("dark-element");
        document.getElementById("darkLightButton").innerHTML = "Dark Mode";
    } else {
        document.body.style.backgroundColor = "#363636";
        document.getElementById("html").style.backgroundColor = "#363636";
        document.getElementById("background").classList.add("bg-dark");
        document.getElementById("card1").classList.add("dark-element");
        document.getElementById("card2").classList.add("dark-element");
        document.getElementById("navbar").classList.remove("is-link");
        document.getElementById("navbar").classList.add("dark-header");
        document.getElementById("logoImg").src = "/images/logo-dark.png";
        document.getElementById("yourPlayerTitle").classList.remove("light-header");
        document.getElementById("yourOpponentTitle").classList.remove("light-header");
        document.getElementById("yourPlayerTitle").classList.add("dark-header");
        document.getElementById("yourOpponentTitle").classList.add("dark-header");
        document.getElementById("playerName1").classList.add("textWhite");
        document.getElementById("playerName2").classList.add("textWhite");
        document.getElementById("playerInfo1").classList.add("textWhite");
        document.getElementById("playerInfo2").classList.add("textWhite");
        for (i = 0; i < allStatsButtons.length; i++) {
            allStatsButtons[i].style.color = 'white';
            allOpponentStats[i].style.color = 'white';
        }
        document.getElementById("nextButton").classList.remove("light-button");
        document.getElementById("nextButton").classList.add("dark-button");
        document.getElementById("howToPlayHeader").classList.remove("light-header");
        document.getElementById("howToPlayHeader").classList.add("dark-header");
        document.getElementById("logoImgHowToPlay").src = "/images/logo-dark.png";
        document.getElementById("howToPlayBody").classList.add("dark-element");
        document.getElementById("darkLightButton").innerHTML = "Light Mode";
    }
    if (document.getElementById("dropdownButton").classList.contains("is-active")) {
        document.getElementById("dropdownButton").classList.toggle("is-active");
        document.getElementById("navbarMenuHero").classList.toggle("is-active");
    }
});

// restart modal functions
document.getElementById("restartButton").addEventListener("click", function () {
    document.getElementById("restartModal").classList.toggle("is-active");
    if (document.getElementById("dropdownButton").classList.contains("is-active")) {
        document.getElementById("dropdownButton").classList.toggle("is-active");
        document.getElementById("navbarMenuHero").classList.toggle("is-active");
    }
});
document.getElementById("restartModalBackground").addEventListener("click", function () {
    document.getElementById("restartModal").classList.toggle("is-active");
});
document.getElementById("noModalButton").addEventListener("click", function () {
    document.getElementById("restartModal").classList.toggle("is-active");
});
document.getElementById("yesModalButton").addEventListener("click", function () {
    document.getElementById("restartModal").classList.toggle("is-active");
    resetRecord()
});

document.getElementById("dropdownButton").addEventListener("click", function () {
    document.getElementById("dropdownButton").classList.toggle("is-active");
    document.getElementById("navbarMenuHero").classList.toggle("is-active");
});

// start a round
function newRound() {
    getRandomPlayer('1');
    getRandomPlayer('2');
}

// Check for empty images
var image1 = document.getElementById('img1');
image1.onerror = function () {
  this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxIEzc2yczw7EgFufcnzrst6IcClp74SIN8w&usqp=CAU';
};
var image2 = document.getElementById('img2');
image2.onerror = function () {
  this.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQxIEzc2yczw7EgFufcnzrst6IcClp74SIN8w&usqp=CAU';
};

// Start a round on window load
window.onload = function() {
    newRound();
};