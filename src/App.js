import { BrowserRouter } from "react-router-dom";
import BaseRoutes from "./Routing/routes";
import { Provider } from "react-redux";
import store from "./Redux/Store/Store";
import setAuthToken from "./Utils/SetAuthToken";

import './App.css';


function App() {

  //setting auth token in headers
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }


  return (
    <Provider store={store}>
      <div>
          <BrowserRouter>
            <BaseRoutes />
          </BrowserRouter>
      </div>
    </Provider>
    
  );
}

export default App;
