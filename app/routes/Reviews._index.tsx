import type {LoaderFunction} from "react-router";
import {useLoaderData} from "react-router";
import {Movie, sciFiMoviesData} from "~/components/ReviewsData";
import Sidebar from "~/components/Sidebar";
import '~/styles/tailwind.css';
import '~/styles/reviews.css';

export const loader: LoaderFunction = async () => {
    return sciFiMoviesData;
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
        } else if (totalRating >= 20) {
            bucket = "20+";
        } else {
            bucket = "<20";
        }

        if (!groups[bucket]) {
            groups[bucket] = [];
        }

        groups[bucket].push(movie);
        return groups;
    }, {} as { [key: string]: Movie[] });

    const orderedBuckets = ["33+", "30+", "25+", "20+", "<20"];

    return (
        <div className="app">
            <Sidebar />
            <main id="main-content" className="main-container">
                <div className="description-container">
                    <h1 className="sr-only">Sci-Fi Movie Reviews</h1>
                    <p>
                        Enjoyable sci-fi movies, mouse over each for a no-spoiler one line review. Rating is out of 40
                        based on 4 equal categories, (e)xploration of scientific premise, (a)tmosphere, (n)arrative
                        structure, and (c)haracterisation. Good speculative fiction without (e) doesn&#39;t belong here,
                        so there is World War Z and not Train To Busan, The Adjustment Bureau and not About Time, etc.
                    </p>
                </div>
                <div className="container">
                    {orderedBuckets.map(bucket => (
                        <section key={bucket} className="movie-bucket" aria-label={`Rating ${bucket}`}>
                            <h2>{bucket}</h2>
                            <div className="movie-wrapper" role="list">
                                {(movieGroups[bucket] || []).sort((a, b) => {
                                    const totalRatingA = a.e + a.a + a.n + a.c;
                                    const totalRatingB = b.e + b.a + b.n + b.c;

                                    return totalRatingB - totalRatingA; // sort in descending order
                                }).map(movie => (
                                    <article key={movie.title} className="movie" role="listitem" tabIndex={0}
                                        aria-label={`${movie.title} — ${movie.e + movie.a + movie.n + movie.c}/40`}>
                                        <img src={movie.thumbnail} alt={`${movie.title} poster`}/>
                                        <div className="content">
                                            <h3>{movie.title}</h3>
                                            <p>{movie.summary}</p>
                                            <div className="rating">
                                                <span className="rating-item"><abbr title="Exploration">e</abbr>: {movie.e}</span>
                                                <span className="rating-item"><abbr title="Atmosphere">a</abbr>: {movie.a}</span>
                                                <span className="rating-item"><abbr title="Narrative">n</abbr>: {movie.n}</span>
                                                <span className="rating-item"><abbr title="Characterisation">c</abbr>: {movie.c}</span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
}
