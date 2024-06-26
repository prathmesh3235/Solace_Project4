import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "./services/firebase";

function Login({ handleLogin }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = e.target.title.value.trim();

    if (userId.length > 0) {
      // Check if the user already exists in the database
      const userRef = doc(db, "users", userId);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          // User already exists, prevent login
          alert(
            "Dieser Probandencode exitiert bereits. Bitte geben Sie stattdessen 𝐈𝐡𝐫𝐞 𝐈𝐧𝐢𝐭𝐢𝐚𝐥𝐞𝐧 𝐮𝐧𝐝 𝐢𝐡𝐫𝐞 𝐇𝐚𝐮𝐬𝐧𝐮𝐦𝐦𝐞𝐫 (z.B. LM06) ein."
          );
        } else {
          // User does not exist, navigate to the home page
          const searchParams = new URLSearchParams(window.location.search);
          navigate(`/home?mode=${searchParams.get("mode")}&userId=${userId}`);

          // Create a new user record in the database
          const data = {
            userId: userId,
            mode: searchParams.get("mode"),
          };

          try {
            await setDoc(userRef, data);
          } catch (err) {
            console.error(err);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="label-text">
          Bitte geben Sie noch einmal Ihren Probandencode ein (Initialen +
          Geburtstag, z.B. LV03)
        </label>
        <input required type="text" className="form-control" name="title" />
        <br />
        <input type="submit" className="btn btn-primary" value="abschicken" />
      </form>
    </div>
  );
}

export default Login;
