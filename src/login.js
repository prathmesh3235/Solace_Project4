import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "./services/firebase";

function Login({ handleLogin }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = e.target.title.value.trim();

    if (userId.length > 0) {
      sessionStorage.clear();
      // Check if the user already exists in the database
      const userRef = doc(db, "users", userId);
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          // User already exists, prevent login
          alert(
            "This ID already exists. Please enter your initials + house number (e.g., LD15)"
          );
        } else {
          // User does not exist, navigate to the home page
          sessionStorage.removeItem("shuffledIDs");
          sessionStorage.setItem("productdetailsVersion",JSON.stringify([...Array(5)].map(() => Math.random() < 0.5)));
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
        Please enter your response ID (initials + day of birth, e.g., LD03)
        </label>
        <input required type="text" className="form-control" name="title" />
        <br />
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
