import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterForm() {
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para manejar la redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const username = e.target.elements[1].value;
    const password = e.target.elements[2].value;
    const confirmPassword = e.target.elements[3].value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost/api/index.php?resource=register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/login'); // Redirige al usuario a la página de login
      } else {
        setError(data.message);
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      setError('Error registering user');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Register<i>#</i></h1>
        {error && <div className="error">{error}</div>}
        <div className="form__section">
          <input className="input" type="email" name="email" required placeholder="Type your email..." />
        </div>
        <div className="form__section">
          <input className="input" type="text" name="username" required placeholder="Type your username..." />
        </div>
        <div className="form__section">
          <input className="input" type="password" name="password" required placeholder="Type your password..." />
        </div>
        <div className="form__section">
          <input className="input" type="password" name="confirmPassword" required placeholder="Confirm your password" />
        </div>
        <div className="confirm">
          <input type="checkbox" name="terms" id="terms" required />
          <p>I agree to the terms & conditions</p>
        </div>
        <button className="form__btn" type="submit">Sign Up</button>
        <span className="span__or">or</span>
        <button className="form__btn" type="button"><i className='bx bxl-google'></i><span>Continue with Google</span></button>
        <button className="form__btn" type="button"><i className='bx bxl-apple' ></i><span>Continue with Apple</span></button>
        <span>Already Have An Account?<Link to="/login">Sign In</Link></span>
      </form>
    </>
  );
}

export default RegisterForm;
