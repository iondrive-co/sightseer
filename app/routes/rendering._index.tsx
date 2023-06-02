import { useEffect } from 'react';
import Sidebar from "../components/Sidebar";

export default function Content() {
  useEffect(() => {
    import("../components/sightseer.js").then(() => {
      const sightseer = (window as any).sightseer;
      sightseer.draw();
    });
  }, []);

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <h1>Kotlin Rendering Test</h1>
        <p>The following is rendered via some js transpiled from kotlin:</p>
        <div id="canvas-container"></div>
      </main>
    </div>
  );
}