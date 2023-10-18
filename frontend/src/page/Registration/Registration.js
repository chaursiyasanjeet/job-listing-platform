import styles from "./Registration.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
const Registration = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = (email, password) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter valid email");
      return false;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      toast.error(
        "Password should contain at least one uppercase, one lowercase, one number, and one special character"
      );
      return false;
    }
    return true;
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    const valid = validateForm(user.email, user.password);
    if (valid) {
      toast.success("sign succesfully");
    }
  };
  return (
    <main>
      <section className={styles.formContainer}>
        <form onSubmit={handleSumbit}>
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
          />
          <input
            type="text"
            name="password"
            value={user.password}
            placeholder="Password"
            onChange={handlechange}
            required
          />
          <button type="submit">Sign in</button>
        </form>
        <div className={styles.signupLink}>
          Don't have an account?<a href="/signin">Sign Up</a>
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

export default Registration;
