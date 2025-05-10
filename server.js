require("dotenv").config();
const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/api/download", async (req, res) => {
    const videoUrl = req.body.url;

    try {
        const videoId = videoUrl.match(/(?:v=|youtu\.be\/)([^&]+)/)[1];

        const options = {
            method: 'GET',
            url: 'https://youtube-mp3-download.p.rapidapi.com/dl',
            params: { id: videoId },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'youtube-mp3-download.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const data = response.data;

        res.json({
            title: data.title,
            channel: data.channel,
            thumbnail: data.thumbnail,
            downloadUrl: data.link
        });
    } catch (err) {
        console.error(err);
        res.json({ error: "Failed to fetch MP3 link." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
