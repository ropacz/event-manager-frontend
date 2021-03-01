import "./App.css";
import { Router, BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import history from "./history";

function App() {
  return (
    <BrowserRouter>
      <Router history={history}>
        <Routes />
      </Router>
    </BrowserRouter>
  );
}

export default App;
