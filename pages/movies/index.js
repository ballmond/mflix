/** @jsx jsx */
import { ThemeProvider, Image, Card, jsx } from "theme-ui";
import theme from "../../styles/theme";
import { connectToDatabase } from "../../util/mongodb";

export default function Movies({ movies }) {
  return (
    <ThemeProvider theme={theme}>
      <h1>top movies</h1>
      <h6>(per metacritic)</h6>
      {movies.map((movie) => (
        <Card key={movie._id} sx={{ variant: "cards.compact" }}>
          <h3>
            {movie.title} {` `}
            <span sx={{ color: "highlight" }}>({movie.imdb.rating})</span>
            <Image
              src={movie.poster}
              alt="image of movie poster"
              sx={{ maxInlineSize: "25%" }}
            />
          </h3>
          <h6 sx={{ color: "secondary" }}>{`${movie.plot}`}</h6>
        </Card>
      ))}
    </ThemeProvider>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: 1 })
    .limit(20)
    .toArray();

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}
