import {json, LoaderFunction} from "@remix-run/cloudflare";
import {useLoaderData} from "@remix-run/react";
import {Movie, sciFiMoviesData} from "~/components/ReviewsData";
import Sidebar from "~/components/Sidebar";
import '~/styles/tailwind.css';
import '~/styles/reviews.css';

export const loader: LoaderFunction = async () => {
    return json(sciFiMoviesData);
};

export default function Reviews() {
    const movies: Movie[] = useLoaderData();

    // Group by score buckets
    const movieGroups = movies.reduce((groups, movie) => {
        const totalRating = movie.e + movie.a + movie.n + movie.c;
        let bucket: string;

        if (totalRating >= 33) {
            bucket = "33+";
        } else if (totalRating >= 30) {
            bucket = "30+";
        } else if (totalRating >= 25) {
            bucket = "25+";
        } else {
            bucket = "Others";
        }

        if (!groups[bucket]) {
            groups[bucket] = [];
        }

        groups[bucket].push(movie);
        return groups;
    }, {} as { [key: string]: Movie[] });

    const orderedBuckets = ["33+", "30+", "25+"];

    return (
        <div className="app">
            <Sidebar />
            <div className="main-container">
                <div className="description-container">
                    <p>
                        Enjoyable sci-fi movies, mouse over each for a no-spoiler one line review. Rating is out of 40
                        based on 4 equal categories, (e)xploration of scientific premise, (a)tmosphere, (n)arrative
                        structure, and (c)haracterisation. Good speculative fiction without (e) doesn&#39;t belong here,
                        so there is World War Z and not Train To Busan, The Adjustment Bureau and not About Time, etc.
                    </p>
                </div>
                <div className="container">
                    {orderedBuckets.map(bucket => (
                        <div key={bucket} className="movie-bucket">
                            <h1>{bucket}</h1>
                            <div className="movie-wrapper">
                                {(movieGroups[bucket] || []).sort((a, b) => {
                                    const totalRatingA = a.e + a.a + a.n + a.c;
                                    const totalRatingB = b.e + b.a + b.n + b.c;

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