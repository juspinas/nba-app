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

function getRandomPlayer() {
    // Hardcoded page numbers
    let pageMin = 2741;
    let pageMax = 3268;
    const num = Math.floor(Math.random() * (pageMax - pageMin + 1)) + pageMin;
    const fetchPromise = fetch("/getPlayer?page=" + num.toString() + "&per_page=1"); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => showRandomPlayer(data));
}
function showRandomPlayer(data) {
    console.log(data);
    const playerId = data.playerId;
    const firstName = data.firstName;
    const lastName = data.lastName;
    document.getElementById("playerId").innerHTML = playerId;
    document.getElementById("playerFirstName").innerHTML = firstName;
    document.getElementById("playerLastName").innerHTML = lastName;
    getPlayerStats(playerId);
}

function getPlayerStats(playerId) {
    const fetchPromise = fetch("/getPlayerStats?season=2019&player_ids=" + playerId); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => console.log(JSON.stringify(data)));
}
// window.onload = function() {
//     getPlayerStats();
// };