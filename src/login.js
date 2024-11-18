import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "./services/firebase";
import parseUserAgent from './services/deviceInfo';

function Login({ handleLogin }) {
  const navigate = useNavigate();

  const validateUserId = (userId) => {
    if (userId.length !== 4) {
      return "User ID must be exactly 4 characters long.";
    }
    const letters = userId.slice(0, 2);
    const numbers = userId.slice(2);
    if (!/^[A-Za-z]{2}$/.test(letters)) {
      return "The first two characters must be letters.";
    }
    if (!/^\d{2}$/.test(numbers)) {
      return "The last two characters must be numbers.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = e.target.title.value.trim();
    const userAgentData = parseUserAgent();  // Parses the current browser's user agent

    const validationError = validateUserId(userId);
    if (validationError) {
      alert(validationError);
      return;
    }

    sessionStorage.clear();
    const userRef = doc(db, "users", userId);
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        alert("This ID already exists. Please enter your initials + house number (e.g., LD15)");
      } else {
        sessionStorage.setItem("productdetailsVersion", JSON.stringify([null, null, null, null, null]));
        const searchParams = new URLSearchParams(window.location.search);
        navigate(`/home?mode=${searchParams.get("mode")}&userId=${userId}`);

        const data = {
          userId: userId,
          mode: searchParams.get("mode"),
          userAgent: userAgentData  // Sending parsed user agent data to Firestore
        };

        try {
          await setDoc(userRef, data);
        } catch (err) {
          console.error('Error writing document: ', err);
        }
      }
    } catch (err) {
      console.error('Error accessing Firestore: ', err);
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