import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {

  const [authenticated,setAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  return (

    <div>

      {authenticated ? (
        <Dashboard/>
      ) : (
        <Login setAuthenticated={setAuthenticated}/>
      )}

    </div>

  );

}

export default App;