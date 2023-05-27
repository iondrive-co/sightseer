import Sidebar from "../components/Sidebar";

export default function Content() {
  return (
    <div className="app">
      <Sidebar />
      <main>
        <>
          <h1>References</h1>
          <p>These are some references.</p>
        </>
      </main>
    </div>

  );
}