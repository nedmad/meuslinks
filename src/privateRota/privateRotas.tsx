import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, type ReactNode } from "react";
import { auth } from "../services/firesbase";
import { useNavigate } from "react-router-dom";

interface ChildrenRota {
  children: ReactNode;
}
export default function PrivateRotas({ children }: ChildrenRota) {
  const [signed, setSigned] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const onResult = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true);
      } else {
        navigate("/login");
      }
    });
    return () => {
      onResult();
    };
  }, []);
  return children;
}
