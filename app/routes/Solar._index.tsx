import Sidebar from "~/components/Sidebar";
import Solar from "~/components/Solar";
import '~/styles/tailwind.css';

export default function SolarScreen() {
    return (
        <div className="app">
            <Sidebar />
            <main id="main-content" className="main-content" style={{padding: 0}}>
                <h1 className="sr-only">Solar System Simulator</h1>
                <div className="text-fallback">
                    <h2>Solar — Hohmann Transfer Simulator</h2>
                    <p>An interactive 3D solar system visualization built with Three.js, showing Earth-to-Mars Hohmann transfer orbits. It requires JavaScript and WebGL to function.</p>
                    <p><strong>Controls:</strong> Arrow keys to rotate the camera, WASD to pan, mouse wheel to zoom, click and drag at screen edges to pan.</p>
                    <p>The simulator calculates and displays the next optimal transfer window from Earth to Mars based on real orbital mechanics.</p>
                </div>
                <Solar />
            </main>
        </div>
    );
}
