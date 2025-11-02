import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, type FormEvent } from "react";
import { auth } from "../../services/firesbase";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  async function valitadeLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        setLoading(false);
        navigate("/links");
      })
      .catch((e) => {
        alert("Usuario nao encontrado");
      });
  }

  return (
    <>
      {loading && <Loading />}
      <section className="formLogin container-xxl">
        <h1 className="text-light text-center pb-4">Faca seu Login</h1>
        <form onSubmit={valitadeLogin}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <label for="floatingPassword">Password</label>
          </div>
          <button type="submit" className="btn btn-primary w-100 p-3 mt-4">
            <span className="fw-bold">Login</span>
          </button>
        </form>
      </section>
    </>
  );
}
