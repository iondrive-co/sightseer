import {json, LoaderFunction} from "@remix-run/cloudflare";
import {useLoaderData} from "@remix-run/react";
import {Movie, moviesData} from "~/components/MoviesData";
import Sidebar from "~/components/Sidebar";
import '~/styles/styles.css';
import '~/styles/movies.css';

export let loader: LoaderFunction = async () => {
  return json(moviesData);
};

export default function Movies() {
    let movies: Movie[] = useLoaderData();

    let movieGroups = movies.reduce((groups, movie) => {
        let firstLetter = movie.title[0].toUpperCase();
        if (!groups[firstLetter]) {
            groups[firstLetter] = [];
        }
        groups[firstLetter].push(movie);
        return groups;
    }, {} as { [key: string]: Movie[] });

    let sortedGroupKeys = Object.keys(movieGroups).sort();

    return (
        <div className="app">
            <Sidebar />
            <div className="main-container">
                <div className="description-container">
                    <p>
                        Enjoyable sci-fi movies, mouse over each for a no-spoiler one line review.
                    </p>
                </div>
                <div className="container">
                    {sortedGroupKeys.map(groupKey => (
                        <div key={groupKey}>
                            <h1>{groupKey}</h1>
                            {movieGroups[groupKey].map(movie => (
                                <div key={movie.title} className="movie">
                                    <img src={movie.thumbnail} alt={movie.title} />
                                    <div className="content">
                                        <h2>{movie.title}</h2>
                                        <p>{movie.summary}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}