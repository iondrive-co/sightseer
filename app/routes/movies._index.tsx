import {json, LoaderFunction} from "@remix-run/cloudflare";
import {useLoaderData} from "@remix-run/react";
import Sidebar from "../components/Sidebar";
import '../styles/styles.css';
import '../styles/movies.css';

interface Movie {
  title: string;
  thumbnail: string;
  summary: string;
}

export let loader: LoaderFunction = async () => {
  // Some dummy data
  let movies: Movie[] = [
    {
      title: "Alien",
      thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg",
      summary: `Ridley Scott's masterclass in slow-burning, atmospheric filmmaking cements its place
      in cinema history with its groundbreaking visual effects and an almost perfectly cast crew capped
      off by Sigourney Weaver's formidable performance as Ellen Ripley`
    },
    {
      title: "Animatrix",
      thumbnail: "https://static.wikia.nocookie.net/toonami/images/8/82/Animatrix.jpg",
      summary: `Directed by some of the most respected names in animation, the Animatrix is an 
      atmospheric and engrosing series of philosophically charged short films`
    },
  ];

  return json(movies);
};

export default function Movies() {
  let movies: Movie[] = useLoaderData();

  return (
    <div className="app">
      <Sidebar />
      <div className="container">
        {movies.map(movie => (
          <div key={movie.title} className="movie">
            <img src={movie.thumbnail} alt={movie.title} />
            <div className="content">
              <h2>{movie.title}</h2>
              <p>{movie.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
