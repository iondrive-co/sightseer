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
        title: 'Mike Duncan\'s Revolutions',
        url: 'https://podcasts.apple.com/us/podcast/revolutions/id703889772',
        description: 'Season 11: The Martian Revolution',
        category: 'Worldbuilding'
    },
    {
        title: 'Project Rho',
        url: 'https://projectrho.com/public_html/rocket/',
        description: 'Exploring the technology of the future',
        category: 'Futurism'
    },
    {
        title: 'The Orbital Index',
        url: 'https://orbitalindex.com/',
        description: 'Weekly space news',
        category: 'Trends'
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
            <main className="main-content">
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