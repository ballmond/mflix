import { connectToDatabase } from '../util/mongodb'

export default function Top({ movies }) {
  return (
    <>
      <h1>top 20 movies of all time</h1>
      <small>according to metacritic</small>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h1>{`${movie.title} (${movie.metacritic})`}</h1>
            <h2>{movie.plot}</h2>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getStaticProps() {
  const { db } = await connectToDatabase()

  const movies = await db
    .collection('movies')
    .find({})
    .sort({ metacritic: -1 })
    .limit(200)
    .toArray()

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  }
}
