export interface Movie {
    title: string;
    thumbnail: string;
    summary: string;
}

export const moviesData: Movie[] = [
    {
        title: "Alien",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg",
        summary: `Ridley Scott's masterclass in slow-burning, atmospheric filmmaking cements its place 
        in cinema history with its groundbreaking visual effects and an almost perfectly cast crew capped
        off by Sigourney Weaver's formidable performance as Ellen Ripley`
    },
    {
        title: "Animatrix, The",
        thumbnail: "https://static.wikia.nocookie.net/toonami/images/8/82/Animatrix.jpg",
        summary: `Directed by some of the most respected names in animation, The Animatrix is an 
        atmospheric and engrossing series of philosophically charged short films`
    },
    {
        title: "Moon",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/af/Moon_%282009_film%29.jpg",
        summary: `This minimalistic gem uses a haunting score and few slick effect shots of the 
        indifferent beauty of the moon to perfectly set up an atmosphere of claustrophobic isolation, 
        into which Sam Rockwell delivers a riveting performance through some tightly written plot beats`
    },
];
