import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function (req, res) {
  const { db } = await connectToDatabase();
  const {
    query: { pid },
  } = req;

  const movie = await db.collection("movies").findOne({ _id: ObjectId(pid) });

  res.json(movie);
}
