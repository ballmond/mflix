import { connectToDatabase } from '../../../util/mongodb'
import { ObjectId } from 'mongodb'

export default async (req, res) => {
  const {
    query: { pid },
  } = req
  const { db } = await connectToDatabase()

  const movies = await db.collection('movies').findOne({ _id: ObjectId(pid) })

  res.json(movies)
}
