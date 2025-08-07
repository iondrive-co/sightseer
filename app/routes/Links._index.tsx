import Sidebar from "../components/Sidebar";
import '~/styles/tailwind.css';

const links = [
    {
        title: 'Eclipse Phase',
        url: 'https://robboyle.wordpress.com/eclipse-phase-pdfs/',
        description: 'A science fiction horror role-playing game with transhumanist themes',
        category: 'Worldbuilding'
    },
    {
        title: 'Necromunda',
        url: 'https://board-game-rules.com/wp-content/uploads/2025/01/necromunda_Official-Rules.pdf',
        description: 'Skirmish tabletop war game set in the dystopian underhive of massive industrial cities',
        category: 'Worldbuilding'
    },
    {
        title: 'Rifts',
        url: 'https://beta.the-eye.eu/public/Books/rpg.rem.uz/Rifts/',
        description: 'A role-playing game deriving elements from cyberpunk, science fiction, fantasy, horror, ' +
            'western, mythology and many other genres',
        category: 'Worldbuilding'
    },
    {
        title: 'Mike Duncan\'s Revolutions',
        url: 'https://podcasts.apple.com/us/podcast/revolutions/id703889772',
        description: 'Season 11: The Martian Revolution',
        category: 'Worldbuilding'
    },
    {
        title: 'Paean to SMAC',
        url: 'https://paeantosmac.wordpress.com/',
        description: 'Meditations on Sid Meier\'s Alpha Centauri',
        category: 'Worldbuilding'
    },
    {
        title: 'Astral Codex Ten',
        url: 'https://www.astralcodexten.com/archive',
        description: 'Scott Alexander\'s blog about reasoning, science, psychiatry, medicine, ethics, genetics, AI, ' +
            'economics and politics',
        category: 'Trends'
    },
    {
        title: 'Metaculus',
        url: 'https://www.metaculus.com/',
        description: 'Forecasting for a complex world',
        category: 'Trends'
    },
    {
        title: 'The Orbital Index',
        url: 'https://orbitalindex.com/',
        description: 'Weekly space news',
        category: 'Trends'
    },
    {
        title: 'Zeihan on Geopolitics',
        url: 'https://www.youtube.com/@ZeihanonGeopolitics',
        description: 'Peter Zeihan\'s take on global energy, demographic and security',
        category: 'Trends'
    },
    {
        title: 'Future of Humanity Institute',
        url: 'https://www.futureofhumanityinstitute.org/',
        description: 'Big-picture questions about humanity and its prospects',
        category: 'Science and Futurism'
    },
    {
        title: 'Isaac Arthur ',
        url: 'https://isaacarthur.net/',
        description: 'Science and Futurism with Isaac Arthur',
        category: 'Science and Futurism'
    },
    {
        title: 'Project Rho',
        url: 'https://projectrho.com/public_html/rocket/',
        description: 'Exploring the technology of the future',
        category: 'Science and Futurism'
    },
    {
        title: 'Vaclav Smil',
        url: 'https://vaclavsmil.com/publications/',
        description: 'Vaclav Smil\'s publications',
        category: 'Science and Futurism'
    },
];

export default function LinksRoute() {
    const groupedLinks = links.reduce((acc, link) => {
        if (!acc[link.category]) {
            acc[link.category] = [];
        }
        acc[link.category].push(link);
        return acc;
    }, {} as Record<string, typeof links>);

    return (
        <div className="app">
            <Sidebar />
            <main className="main-content overflow-y-auto">
                <div className="space-y-8 max-w-2xl">
                    {Object.entries(groupedLinks).map(([category, categoryLinks]) => (
                        <div key={category}>
                            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                                {category}
                            </h2>
                            <div className="space-y-4">
                                {categoryLinks.map((link, index) => (
                                    <div key={index} className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                                        <h3 className="text-lg font-semibold mb-2">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 dark:text-blue-400 hover:underline"
                                            >
                                                {link.title}
                                            </a>
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{link.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}