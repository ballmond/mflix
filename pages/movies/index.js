import { connectToDatabase } from '../../util/mongodb'

export default function Movies({ movies }) {
  return (
    <>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(according to metacritic)</small>
      </p>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h1>{`${movie.title} (${movie.metacritic}`})</h1>
            <h2>{movie.plot}</h2>
          </li>
        ))}
      </ul>
    </>
  )
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase()

  const movies = await db
    .collection('movies')
    .find({})
    .sort({ metacritic: -1 })
    .limit(5)
    .toArray()

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  }
}
