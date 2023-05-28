import { createBrowserHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import UpdateProject from "./modules/projectManagement/UpdateProject";

function App() {
  const history = createBrowserHistory();
  return (
    <BrowserRouter>
      <UpdateProject />
      <Router history={history}></Router>
    </BrowserRouter>
  );
}

export default App;
