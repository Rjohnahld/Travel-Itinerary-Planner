const express = require("express")
const cors = require("cors")
require('dotenv').config()
const { connect } = require("./db")
const { ObjectId } = require("mongodb")
const mongoUri = process.env.MONGO_URI
const dbname = "trip_itinerary_planner"

let app = express()

app.use(express.json())
app.use(cors())

async function main() {
    try {
        const db = await connect(mongoUri, dbname);
        console.log('Connected to MongoDB');

        app.get("/", function (req, res) {
            res.json({
                message: "Hello World!"
            });
        });

        app.get("/trips", async function (req, res) {
            try {
                const trips = await db.collection("trips").find().toArray()
                res.json({ trips })

            } catch (error) {
                console.error("Error fetching trips", error);
                res.status(500).json({ error: "Internal Server Error" })
            }
        })

        app.get("/trips/:id", async function (req, res) {
            try {
                const { id } = req.params
                const trip = await db.collection("trips").findOne({ _id: new ObjectId(id) })

                if (!trip) {
                    return res.status(400).json({ error: "Trip not found" })
                }

                res.json({ trip })

            } catch (error) {
                console.error("Error fetching trip", error)
                res.status(500).json({ error: "Internal Server Error" })
            }
        })

        app.listen(3000, () => {
            console.log("Server has started");
        });

    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}
main()