import Sidebar from "~/components/Sidebar";
import SolarSystem from "~/components/SolarSystem";
import '~/styles/tailwind.css';

export default function Solar() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow">
                <SolarSystem />
            </div>
        </div>
    );
}