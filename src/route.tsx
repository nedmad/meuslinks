import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import MeusLinks from "./pages/links/MeusLinks";
import Layout from "./pages/layout";
import PrivateRotas from "./privateRota/privateRotas";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/links",
        element: (
          <PrivateRotas>
            <MeusLinks />
          </PrivateRotas>
        ),
      },
    ],
  },
]);
