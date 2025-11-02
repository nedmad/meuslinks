import { signOut } from "firebase/auth";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../services/firesbase";
import useRedirect from "../hooks/redirect";
import { useState } from "react";
import Loading from "../components/loading";

export default function Layout() {
  const { naviate } = useRedirect();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        setLoading(false);
        naviate("/login");
      })
      .catch((e) => alert("Falha ao sair"));
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
              <Link className="nav-link active" aria-current="page" to="/login">
                Login
              </Link>
              <Link className="nav-link active" aria-current="page" to="/links">
                Links
              </Link>
              <span
                onClick={logout}
                className="sair nav-link active"
                aria-current="page"
              >
                Sair
              </span>
            </div>
          </div>
        </div>
      </nav>
      <section className="body">
        {loading && <Loading />}

        <Outlet />
      </section>
    </>
  );
}
