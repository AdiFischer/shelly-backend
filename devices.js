import { dbConnect } from "./dbConnect.js"
import { ObjectId } from "mongodb"

const db = dbConnect()
const devices = db.collection("devices")

export async function addNewDevice(req, res) {
    const newDevice = req.body
    await devices.insertOne
        (newDevice)
        .catch(err => {
            res.status(500).send(err)
            return
        })
    res.status(201).send({ message: "New Devices Added." })

}

export async function getAllDevices(req, res) {
    const collection = await devices.find().toArray()
    res.send(collection)
}

export async function toggleSwitch(req, res) {
    fetch("http://192.168.15.137/rpc/Switch.Toggle?id=0")
}

export async function getDeviceData(req, res) {
    const data = await fetch("http://192.168.15.137/rpc/Switch.GetStatus?id=0")
    let results = ''
    try {
        const inserted = await devices.insertOne(data)
    
        results = await getOneByID(inserted, '')

    } catch (error) {
        console.log(error)
        return error
    }
    console.log(results)
    return results 

}

export async function getOneByID(req, res) {
    // const { insertedId } = req.params
    const collection = await devices
        .find({ _id: new ObjectId(req.insertedId) }).toArray()
    return collection
}
    