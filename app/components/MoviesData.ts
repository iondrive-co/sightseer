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
    {
        title: "Gravity",
        thumbnail: "https://www.themoviedb.org/t/p/w1280/krQrQSNb0EXd5L0e2CkoU5V6XNq.jpg",
        summary: `Watching this sci-fi thriller in IMAX was like being on a roller-coaster, it was a completely 
        engrossing white knuckle ride with stunning SFX vistas and a simple compelling plot that was both 
        compelling and gloriously executed by both main characters`
    },
    {
        title: "Donnie Darko",
        thumbnail: "https://www.themoviedb.org/t/p/w1280/3PiQIQzJX2oE8Uw6gjL08BXQRoB.jpg",
        summary: `A weird teenage angst-y film that peels back an outer layer of superficial 80s suburbia to thoughtfully 
        delve into quantum physics and time travel, and Gyllenhaal and the compelling screenplay manage to tie that 
        together and turn what could easily have been a corny or stoner movie in beautiful and soulful piece of art`
    },
];
