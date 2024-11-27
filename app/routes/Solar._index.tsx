import Sidebar from "~/components/Sidebar";
import Solar from "~/components/Solar";
import '~/styles/tailwind.css';

export default function SolarScreen() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow">
                <Solar />
            </div>
        </div>
    );
}