import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState, type FormEvent } from "react";
import { db } from "../../services/firesbase";
import Loading from "../../components/loading";

interface MeusLinksInterFace {
  id: string;
  name: string;
  colorInput: string;
  colorLink: string;
  link: string;
}

export default function MeusLinks() {
  const [nameLink, setNameLink] = useState("");
  const [link, setLink] = useState("");
  const [colorInpput, setColorInpput] = useState("black");
  const [colorTextLink, setColorTextLink] = useState("lightcyan");
  const [meusLinks, setMeusLink] = useState<MeusLinksInterFace[]>([]);
  const [loadingLinks, setLoadingLinks] = useState(false);

  async function inserirLink(event: FormEvent) {
    event.preventDefault();
    setLoadingLinks(true);
    await addDoc(collection(db, "links"), {
      name: nameLink,
      colorInput: colorInpput,
      colorLink: colorTextLink,
      link: link,
    })
      .then(() => {
        setLoadingLinks(false);

        setNameLink("");
        setLink("");
      })
      .catch((e) => console.log(e));
  }
  async function deletarLink(id: string) {
    const doRef = doc(db, "links", id);
    await deleteDoc(doRef);
  }

  useEffect(() => {
    const collecao = collection(db, "links");
    const fazerQuery = query(collecao);
    setLoadingLinks(true);
    const onsub = onSnapshot(fazerQuery, (snapshot) => {
      const arrayLinks = [] as MeusLinksInterFace[];

      snapshot.forEach((linksQuery) => {
        arrayLinks.push({
          id: linksQuery.id,
          name: linksQuery.data().name,
          colorInput: linksQuery.data().colorInput,
          colorLink: linksQuery.data().colorLink,
          link: linksQuery.data().link,
        });
      });
      setLoadingLinks(false);
      setMeusLink(arrayLinks);
    });
    return () => {
      onsub();
    };
  }, []);
  return (
    <>
      <section className="container-xxl ">
        <h1 className="text-light text-center pb-4">Crie o seu Link</h1>

        <form onSubmit={inserirLink}>
          <div className="d-flex flex-column gap-3">
            <input
              className="form-control p-3"
              type="text"
              placeholder="Default input "
              aria-label="default input example"
              value={nameLink}
              onChange={(e) => setNameLink(e.target.value)}
            />
            <input
              className="form-control p-3"
              type="text"
              placeholder="Default input"
              aria-label="default input example"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            <div className="colors d-flex gap-3">
              <input
                type="color"
                className="form-control form-control-color"
                id="exampleColorInput"
                value={colorInpput}
                title="Choose your color"
                onChange={(e) => setColorInpput(e.target.value)}
              />
              <input
                type="color"
                className="form-control form-control-color"
                id="exampleColorInput"
                value={colorTextLink}
                title="Choose your color"
                onChange={(e) => setColorTextLink(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loadingLinks}
              className="btn btn-primary w-100 p-3"
            >
              <span className="fw-bold">Incluir</span>
            </button>
          </div>
        </form>
        <section className="meuLink mt-4">
          {nameLink && (
            <a
              target="_blank"
              href={link}
              type="submit"
              className="btn  w-100 p-3"
              style={{ color: colorTextLink, backgroundColor: colorInpput }}
            >
              <span className="fw-bold">{nameLink}</span>
            </a>
          )}
          {loadingLinks ? (
            <Loading />
          ) : (
            meusLinks.map((lin) => (
              <section
                key={lin.id}
                className="btn  w-100 p-3 mt-2 d-flex justify-content-between justify-content-center align-items-center"
                style={{
                  color: lin.colorLink,
                  backgroundColor: lin.colorInput,
                }}
              >
                <a
                  className="text-decoration-none"
                  style={{ color: lin.colorLink }}
                  target="_blank"
                  href={lin.link}
                >
                  <span className="fw-bold">{lin.name}</span>
                </a>
                <button
                  onClick={() => deletarLink(lin.id)}
                  className="btn btn-danger"
                >
                  Deletar
                </button>
              </section>
            ))
          )}
        </section>
      </section>
    </>
  );
}
