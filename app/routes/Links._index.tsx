import Sidebar from "../components/Sidebar";
import '~/styles/tailwind.css';

const links = [
    {
        title: 'Project Rho',
        url: 'https://projectrho.com/public_html/rocket/',
        description: 'Exploring the technology of the future'
    },
    {
        title: 'Mike Duncan\'s Revolutions',
        url: 'https://podcasts.apple.com/us/podcast/revolutions/id703889772',
        description: 'Season 11: The Martian Revolution'
    },
    {
        title: 'The Orbital Index',
        url: 'https://orbitalindex.com/',
        description: 'Weekly space news'
    },
    {
        title: 'Eclipse Phase',
        url: 'https://robboyle.wordpress.com/eclipse-phase-pdfs/',
        description: 'A science fiction horror role-playing game with transhumanist themes'
    },
];

export default function LinksRoute() {
    return (
        <div className="app">
            <Sidebar />
            <main className="main-content">
                <div className="space-y-4 max-w-2xl">
                    {links.map((link, index) => (
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
            </main>
        </div>
    );
}