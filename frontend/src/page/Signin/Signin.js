import styles from "./Signin.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { login } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const redirect = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonState, setButtonState] = useState(false);

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = (email, password) => {
    let error;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter valid email");
      error = true;
    }

    if (error) return false;

    return true;
  };
  const handleSumbit = async (e) => {
    e.preventDefault();
    const valid = validateForm(user.email, user.password);
    if (valid) {
      setButtonState(true);
      const result = await login(user.email, user.password);
      if (result.status === "SUCCESS") {
        localStorage.setItem(
          "recuirterDetail",
          JSON.stringify({
            token: result.jwtToken,
            recuirterName: result.recuirterName,
            expiry: new Date().getTime() + 60 * 60 * 1000,
          })
        );
        toast.success(result.message);
        setButtonState(false);
        setTimeout(() => {
          redirect("/");
        }, 2000);
      } else {
        setTimeout(() => {
          setButtonState(false);
        }, 1000);
        toast.error(result.message);
      }
    }
  };
  return (
    <main>
      <section className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSumbit}>
          <div className={styles.formtitle}>
            <span>Already have an account?</span>
            <span>Your Personal job finder is here</span>
          </div>
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={handlechange}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handlechange}
            required
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={buttonState}
          >
            Sign in
          </button>
        </form>
        <div className={styles.signupLink}>
          Don't have an account?<a href="/signup">Sign Up</a>
        </div>
      </section>
      <div className={styles.pageimage}>Your Personal Job Finder</div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  );
};

export default Signin;
