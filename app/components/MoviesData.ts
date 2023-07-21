export interface Movie {
    title: string;
    thumbnail: string;
    summary: string;
}

export const moviesData: Movie[] = [
    {
        title: "Alien",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/c3/Alien_movie_poster.jpg",
        summary: `Ridley Scott's slow-burning, atmospheric filmmaking melds a first-rate screenplay, Giger's art, and
        Sigourney Weaver's formidable performance into a masterpiece of sci-fi cinema`
    },
    {
        title: "Animatrix, The",
        thumbnail: "https://static.wikia.nocookie.net/toonami/images/8/82/Animatrix.jpg",
        summary: `Directed by some notable animators, The Animatrix was a slick way to add flavour to the Matrix 
        universe via an atmospheric series of short films, which ended up being more enjoyable than the subsequent movies`
    },
    {
        title: "Donnie Darko",
        thumbnail: "https://www.themoviedb.org/t/p/w1280/3PiQIQzJX2oE8Uw6gjL08BXQRoB.jpg",
        summary: `A weird teenage angst-y film that peels back an outer layer of superficial 80s suburbia to thoughtfully 
        delve into quantum physics and time travel, and Gyllenhaal and the compelling screenplay manage to tie that 
        together and turn what could easily have been a corny or stoner movie in beautiful and soulful piece of art`
    },
    {
        title: "Gravity",
        thumbnail: "https://www.themoviedb.org/t/p/w1280/krQrQSNb0EXd5L0e2CkoU5V6XNq.jpg",
        summary: `Watching this sci-fi thriller in IMAX was a wild, this movie is a completely engrossing white knuckle 
        ride with stunning SFX vistas and a simple compelling plot that is exceptionally well executed by both main 
        characters`
    },
    {
        title: "Martian, The",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/c/cd/The_Martian_film_poster.jpg",
        summary: `Andy Weir's upbeat, funny protagonist of science Mark Watney is a perfect fit for Matt Damon, and
         coupled with Ridley Scott's eye for the stunning visuals this is a glorious and very enjoyable movie`
    },
    {
        title: "Moon",
        thumbnail: "https://upload.wikimedia.org/wikipedia/en/a/af/Moon_%282009_film%29.jpg",
        summary: `This minimalistic gem uses a haunting score and few slick effect shots of the 
        indifferent beauty of the moon to perfectly set up an atmosphere of claustrophobic isolation, 
        into which Sam Rockwell delivers a riveting performance through some tightly written plot beats`
    },
];
