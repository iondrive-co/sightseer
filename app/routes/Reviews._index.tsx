import {json, LoaderFunction} from "@remix-run/cloudflare";
import {useLoaderData} from "@remix-run/react";
import {Movie, sciFiMoviesData} from "~/components/ReviewsData";
import Sidebar from "~/components/Sidebar";
import '~/styles/styles.css';
import '~/styles/reviews.css';

export let loader: LoaderFunction = async () => {
  return json(sciFiMoviesData);
};

export default function Reviews() {
    let movies: Movie[] = useLoaderData();

    let movieGroups = movies.reduce((groups, movie) => {
        let totalRating = movie.e + movie.a + movie.n + movie.c;
        if (!groups[totalRating]) {
            groups[totalRating] = [];
        }
        groups[totalRating].push(movie);
        return groups;
    }, {} as { [key: number]: Movie[] });

    let sortedGroupKeys = Object.keys(movieGroups).sort((a, b) => parseInt(b) - parseInt(a));

    return (
        <div className="app">
            <Sidebar />
            <div className="main-container">
                <div className="description-container">
                    <p>
                    Enjoyable sci-fi movies, mouse over each for a no-spoiler one line review. Rating is out of 40 based
                    on 4 equal categories, (e)xploration of premise, (a)tmosphere, (n)arrative structure, (c)haracterisation
                    </p>
                </div>
                <div className="container">
                    {sortedGroupKeys.map((groupKey: any) => (
                        <div key={groupKey}>
                            <h1>{groupKey}</h1>
                            {movieGroups[+groupKey].map(movie => (
                                <div key={movie.title} className="movie">
                                    <img src={movie.thumbnail} alt={movie.title} />
                                    <div className="content">
                                        <h2>{movie.title}</h2>
                                        <p>{movie.summary}</p>
                                        <div className="rating">
                                            <span className="rating-item">e: {movie.e}</span>
                                            <span className="rating-item">a: {movie.a}</span>
                                            <span className="rating-item">n: {movie.n}</span>
                                            <span className="rating-item">c: {movie.c}</span>
                                        </div>
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