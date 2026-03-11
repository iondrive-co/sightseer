import Sidebar from "~/components/Sidebar";

export default function WinnowRoute() {
    return (
        <div className="app">
            <Sidebar />
            <main id="main-content" className="main-content">
                <h1 className="sr-only">Winnow</h1>
                <div className="text-fallback">
                    <h2>Winnow — In-Browser Image Editor</h2>
                    <p>Winnow is a web-based image editing tool for quickly sorting and editing photos. It requires JavaScript to function.</p>
                    <p>Source code and desktop version: <a href="https://github.com/iondrive-co/winnow">github.com/iondrive-co/winnow</a></p>
                </div>
                <iframe
                    src="/winnow/index.html"
                    title="Winnow — In-browser image editor"
                    style={{ border: "none", width: "100%", height: "100vh" }}
                />
            </main>
        </div>
    );
}
