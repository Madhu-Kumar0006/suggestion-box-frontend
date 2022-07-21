import { BrowserRouter } from "react-router-dom";
import BaseRoutes from "./Routing/routes";

import './App.css';


function App() {

  return (
    <div>
        <BrowserRouter>
          <BaseRoutes />
        </BrowserRouter>
    </div>
  );
}

export default App;
