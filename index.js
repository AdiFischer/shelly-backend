import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { addNewDevice, getAllDevices } from "./devices.js";

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3031

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}...`))

app.post('/devices', addNewDevice)
app.get('/devices', getAllDevices)