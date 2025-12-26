import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EmailConfirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("confirmation");

    if (!token) return;

    fetch(
      `http://localhost:1337/api/auth/email-confirmation?confirmation=${token}`
    )
      .then(async res => {
        if (!res.ok) throw new Error("Invalid token");
        return res.json();
      })
      .then(() => {
        alert("Email confirmed successfully ✅");
        navigate("/login");
      })
      .catch(() => {
        alert("Invalid or expired confirmation link ❌");
      });
  }, [navigate]);

  return <p>Confirming your email...</p>;
}
