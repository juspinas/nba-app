const express = require('express');
const app = express();
const request = require("request-promise");
const PORT = process.env.PORT || 3000

app.use(express.static("public"));
app.get('/', (req, res) => res.sendFile(__dirname + "/client/index.html"))

app.get('/getPlayer', async (req, res) => {
    var settings = {
        qs: {
            "page": req.query.page,
            "per_page": req.query.per_page,
        },
        async: true,
        crossDomain: true,
        url: encodeURI("https://www.balldontlie.io/api/v1/players"),
        method: "GET",
        headers: {
            "Content-Type": "application/text"
        }
    };
    const nbaResponse = await request(settings).catch(error => console.log(error));
    const nbaResponseObj = JSON.parse(nbaResponse);
    res.status(200).send({
        playerId: nbaResponseObj.data[0].id,
        firstName: nbaResponseObj.data[0].first_name,
        lastName: nbaResponseObj.data[0].last_name,
        team: nbaResponseObj.data[0].team.full_name,
        position: nbaResponseObj.data[0].position,
        heightFeet: nbaResponseObj.data[0].height_feet,
        heightInches: nbaResponseObj.data[0].height_inches,
    });
});

app.get('/getPlayerStats', async (req, res) => {
    var settings = {
        qs: {
            "season": req.query.season,
            "player_ids[]": req.query.player_ids,
        },
        async: true,
        crossDomain: true,
        url: encodeURI("https://www.balldontlie.io/api/v1/season_averages"),
        method: "GET",
        headers: {
            "Content-Type": "application/text"
        }
    };
    const nbaResponse = await request(settings).catch(error => console.log(error));
    const nbaResponseObj = JSON.parse(nbaResponse);
    res.status(200).send({
        playerId: nbaResponseObj.data[0].player_id,
        gamesPlayed: nbaResponseObj.data[0].games_played,
        minutes: nbaResponseObj.data[0].min,
        points: nbaResponseObj.data[0].pts,
        rebounds: nbaResponseObj.data[0].reb,
        offRebounds: nbaResponseObj.data[0].oreb,
        defRebounds: nbaResponseObj.data[0].oreb,
        assists: nbaResponseObj.data[0].ast,
        steals: nbaResponseObj.data[0].stl,
        blocks: nbaResponseObj.data[0].blk,
        turnovers: nbaResponseObj.data[0].turnover,
        fieldGoalPct: nbaResponseObj.data[0].fg_pct,
        fieldGoal3Pct: nbaResponseObj.data[0].fg3_pct,
        freeThrowPct: nbaResponseObj.data[0].ft_pct,
    });
});

app.listen(PORT, () => console.log('Example app listening on port 3000!'))