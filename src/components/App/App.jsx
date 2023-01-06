import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "../MasterLayout/MasterLayout";
import About from "./../About/About";
import Movies from "./../Movies/Movies";
import Details from "./../Details/Details";
import Tvshows from "./../Tvshows/Tvshows";
import Register from "./../Register/Register";
import Login from "./../Login/Login";
import People from "./../People/People";
import Home from "./../Home/Home";
import Notfound from "./../Notfound/Notfound";
import "./App.scss";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthStore";

function App() {
  let { userData, saveUserData, logout } = useContext(AuthContext);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout userData={userData} logout={logout} />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute userData={userData}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedRoute userData={userData}>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: "movies",
          element: (
            <ProtectedRoute userData={userData}>
              <Movies />
            </ProtectedRoute>
          ),
        },
        {
          path: "details/:id/:mediaType",
          element: (
            <ProtectedRoute userData={userData}>
              <Details />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute userData={userData}>
              <Profile userData={userData} />
            </ProtectedRoute>
          ),
        },
        { path: "tvshows", element: <Tvshows /> },
        { path: "register", element: <Register /> },
        { path: "people", element: <People /> },

        { path: "login", element: <Login saveUserData={saveUserData} /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
