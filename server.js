const express = require('express');
const app = express();
const request = require("request-promise");
const PORT = process.env.PORT || 3000

app.use(express.static("public"));
app.get('/', (req, res) => res.sendFile(__dirname + "/client/index.html"))

app.get('/playerCount', async (req, res) => {
    var settings = {
        async: true,
        crossDomain: true,
        url: "https://www.balldontlie.io/api/v1/players?page=1&per_page=1",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const nbaResponse = await request(settings).catch(error => console.log(error));
    const nbaResponseObj = JSON.parse(nbaResponse);
    res.status(200).send({
        playerCount: nbaResponseObj.meta.total_count,
    });
});

app.listen(PORT, () => console.log('Example app listening on port 3000!'))