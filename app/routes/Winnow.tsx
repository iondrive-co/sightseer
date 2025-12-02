import Sidebar from "~/components/Sidebar";

export default function WinnowRoute() {
    return (
        <div className="app">
            <Sidebar />
            <main className="main-content">
                <iframe
                    src="/winnow/index.html"
                    title="Winnow"
                    style={{ border: "none", width: "100%", height: "100vh" }}
                />
            </main>
        </div>
    );
}

