import connect from "../../utils/database"

export default async function handler(req, res) {
    const {db} = await connect()
    const user = {
        username: ''
    }
    const response = await db.collection("linktree").findOne()
    res.status(200).json({ msg: 'teste' })
}
