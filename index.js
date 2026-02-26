const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const jadwal = {
  senin: {
    "07:00": "Matematika",
    "08:00": "Bahasa Indonesia",
    "09:00": "IPA"
  },
  selasa: {
    "07:00": "IPS",
    "08:00": "Bahasa Inggris",
    "09:00": "PKN"
  }
};

app.post("/webhook", (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const tanggal = req.body.queryResult.parameters.date;
  const jam = req.body.queryResult.parameters.time;

  const hari = new Date(tanggal).toLocaleDateString("id-ID", { weekday: 'long' }).toLowerCase();
  const jamFormatted = new Date(jam).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });

  let responseText = "Jadwal tidak ditemukan.";

  if (jadwal[hari] && jadwal[hari][jamFormatted]) {
    responseText = `Hari ${hari} jam ${jamFormatted} pelajaran ${jadwal[hari][jamFormatted]}`;
  }

  res.json({
    fulfillmentText: responseText
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server jalan di port " + PORT));
