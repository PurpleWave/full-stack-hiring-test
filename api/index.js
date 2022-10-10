const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/info", (req, res) => {
    res.json({ service: "Test API", version: "1.0.0" });
});

const EQUIPMENT_TYPES = [
    "Heavy/Construction Equipment", 
    "AG Equipment",
    "Vehicle",
    "Other"
];

app.get("/api/equipment_types", (req, res) => {
    res.json(EQUIPMENT_TYPES);
});

// This needs to be the last route defined so that it does not
// block the other defined routes since it is a wildcard match.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});
