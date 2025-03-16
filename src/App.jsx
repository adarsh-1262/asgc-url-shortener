import UrlShortener from "./components/UrlShortener";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <UrlShortener />
      <ToastContainer />
    </div>
  );
}

export default App;
