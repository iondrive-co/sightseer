import Sidebar from "~/components/Sidebar";

export default function ChadRoute() {
    return (
        <div className="app">
            <Sidebar />
            <main id="main-content" className="main-content">
                <h1 className="sr-only">Chad</h1>
                <div className="text-fallback">
                    <h2>Chad — Mobile Coding Agent</h2>
                    <p>Chad is an interactive coding assistant that runs in your browser. It requires JavaScript to function.</p>
                    <p>Source code: <a href="https://github.com/iondrive-co/chad">github.com/iondrive-co/chad</a></p>
                </div>
                <iframe
                    src="/chad/index.html"
                    title="Chad — Mobile coding agent"
                    style={{ border: "none", width: "100%", height: "100vh" }}
                />
            </main>
        </div>
    );
}
