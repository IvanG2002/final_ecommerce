import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import "../App.css"
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider, facebookAuthProvider } from '../firebase/config.js';
function Form() {
  const login = useAuth((state) => state.login);
  const redirect = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    try {
      const response = await fetch('http://localhost/api/index.php?resource=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user);
        redirect(`/home/${data.user.id}`);
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const user = result.user.email
      login({ user, });
      if (result) {
        redirect(`/home/${result.user.providerId}`);
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookAuthProvider);
      console.log(result);
      const user = result.user.email
      login({ user, });
      if (result) {
        redirect(`/home/${result.user.providerId}`);
      }
    } catch (error) {
      console.error("Error signing in with Facebook", error);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login<i>#</i></h1>
        <h2>Welcome!</h2>
        <h4>Log in to<i>#</i></h4>
        <div className="form__section">
          <input className="input" type="text" name="username" placeholder="Username" />
        </div>
        <div className="form__section">
          <input className="input" type="password" name="password" placeholder="Password" />
        </div>
        <button className="form__btn" type="submit">Sign In</button>
        <a href="#">Forgot password?</a>
        <Link to="/register">Do not you have an account?</Link>
        <span className="span__or">or</span>
        <button className="form__btn" onClick={signInWithGoogle}><i className='bx bxl-google'></i><span>Continue with Google</span></button>
        <button className="form__btn" onClick={signInWithFacebook}><i className='bx bxl-apple'></i><span>Continue with Facebook</span></button>
      </form>
      <p className="cookies"># uses cookies for analytics, personalized content, and ads. By using serverless you agree to this use of cookies. <a href=""><b>Learn more</b></a></p>
    </>
  );
}

export default Form;
