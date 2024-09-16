import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Products from "./components/Products";
import Signup from "./components/Signup";
import User from "./components/User";
import Admin from "./components/Admin";
import { useContext, useEffect } from "react";
import { LoginContext} from "./LoginContext";

const App = () => {

    let authContext = useContext(LoginContext);
    const loggedIn = !!localStorage.getItem("isLoggedin");
    authContext?.setIsLoggedIn(loggedIn);
    const storedUserType = localStorage.getItem("UserType");
    authContext?.setUserType(storedUserType);
    console.log(authContext)

    useEffect(()=>{
      document.title = "Hello World"
    },[])

  return (
    <div>
      
      <Router>
        <Navbar/>
        <Routes>
          {!authContext?.isLoggedIn ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Navigate to={'/login'}/>} />
            </>
          ) : (
            <Route>
              {authContext?.userType === "user" ? (
                <>
                  <Route path="/" element={<Products />} />
                  <Route path="/login" element={<Navigate to={"/user"} />} />
                  <Route path="/signup" element={<Navigate to={"/user"} />} />
                  <Route path="/user" element={<User />} />
                  <Route path="/admin-dashboard" element={<Navigate to={"/"} />}
                  />
                </>
              ) : (
                <>
                  <Route path="/" element={<Products />} />
                  <Route path="/login" element={<Navigate to={"/admin-dashboard"} />}/>
                  <Route path="/signup" element={<Navigate to={"/admin-dashboard"} />}/>
                  <Route path="/admin-dashboard" element={<Admin />} />
                  <Route path="/user" element={<Navigate to={"/admin-dashboard"} />}/>
                </>
              )}
            </Route>
          )}
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
