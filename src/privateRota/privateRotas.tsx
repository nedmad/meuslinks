import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, type ReactNode } from "react";
import { auth } from "../services/firesbase";
import { Navigate } from "react-router-dom";

interface ChildrenRota {
  children: ReactNode;
}
export default function PrivateRotas({ children }: ChildrenRota) {
  const [signed, setSigned] = useState<boolean | null>(null);

  useEffect(() => {
    const onResult = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true);
      } else {
        setSigned(false);
      }
    });

    return () => {
      onResult();
    };
  }, []);

  if (signed == false) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
