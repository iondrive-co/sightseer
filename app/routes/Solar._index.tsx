import Sidebar from "~/components/Sidebar";
import Solar from "~/components/Solar";
import '~/styles/tailwind.css';

export default function SolarScreen() {
    return (
        <div className="app">
            <Sidebar />
            <div className="main-content" style={{padding: 0}}>
                <Solar />
            </div>
        </div>
    );
}