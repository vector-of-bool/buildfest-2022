// IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
    const conn = await mongoose
        .connect(DATABASE_URL as string)
        .catch(err => console.log(err))
    console.log("Mongoose Connection Established")

    // OUR MoLink SCHEMA
    const MoLinkSchema = new mongoose.Schema({
        alias: String,
        link: String,
    })

    // OUR MoLink MODEL
    const MoLink = mongoose.models.MoLink || mongoose.model("MoLink", MoLinkSchema)

    return { conn, MoLink }
}
