function getPlayerCount() {
    const fetchPromise = fetch("/playerCount"); 
    const streamPromise = fetchPromise.then((response) => response.json()); 
    streamPromise.then((data) => storePlayerCount(data));
}
function storePlayerCount(data) {
    alert(data)
    document.getElementById("playerCount").innerHTML = data.playerCount;
}

window.onload = function() {
    getPlayerCount();
};