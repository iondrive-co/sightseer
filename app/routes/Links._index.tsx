import Sidebar from "../components/Sidebar";
import '~/styles/tailwind.css';
import '~/styles/links.css';

const links = [
    {
        title: 'Project Rho',
        url: 'https://projectrho.com/public_html/rocket/',
        description: 'Exploring the technology of the future'
    },
];

export default function LinksRoute() {
    return (
        <div className="app">
            <Sidebar />
            <main className="main-content">
                <div className="links-container">
                    {links.map((link, index) => (
                        <div key={index} className="link-item">
                            <h3>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.title}
                                </a>
                            </h3>
                            <p>{link.description}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}