// components
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useGlobalContext } from "./context";

function App() {
  const { loading } = useGlobalContext();
  return (
    <main>
      {loading && <div className="loading" style={{ marginTop: "6rem" }}></div>}
      {!loading && (
        <>
          <Navbar />
          <CartContainer />
        </>
      )}
    </main>
  );
}

export default App;
