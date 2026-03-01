import Sidebar from "~/components/Sidebar";

export default function ChadRoute() {
    return (
        <div className="app">
            <Sidebar />
            <main className="main-content">
                <iframe
                    src="/chad/index.html"
                    title="Chad"
                    style={{ border: "none", width: "100%", height: "100vh" }}
                />
            </main>
        </div>
    );
}
