const express = require("express")

const app = express();

app.get("/", (req, res) => {
    res.send("Hello Express JS")
});

app.listen(5000, () => {
    console.log(`Sunucu ${5000} portunda çalışıyor.`)
})

app.get("/api", (req, res) => {
    res.send("Bu API Route.")
})