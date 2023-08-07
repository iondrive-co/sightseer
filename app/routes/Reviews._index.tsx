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

    // Group by score buckets
    let movieGroups = movies.reduce((groups, movie) => {
        let totalRating = movie.e + movie.a + movie.n + movie.c;
        let bucket: string;

        if (totalRating >= 33) {
            bucket = "33+";
        } else if (totalRating >= 30) {
            bucket = "30+";
        } else {
            bucket = "Others";
        }

        if (!groups[bucket]) {
            groups[bucket] = [];
        }

        groups[bucket].push(movie);
        return groups;
    }, {} as { [key: string]: Movie[] });

    let orderedBuckets = ["33+", "30+"];

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
                    {orderedBuckets.map(bucket => (
                        <div key={bucket} className="movie-bucket">
                            <h1>{bucket}</h1>
                            <div className="movie-wrapper">
                                {(movieGroups[bucket] || []).sort((a, b) => {
                                    let totalRatingA = a.e + a.a + a.n + a.c;
                                    let totalRatingB = b.e + b.a + b.n + b.c;

                                    return totalRatingB - totalRatingA; // sort in descending order
                                }).map(movie => (
                                    <div key={movie.title} className="movie">
                                        <img src={movie.thumbnail} alt={movie.title}/>
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}