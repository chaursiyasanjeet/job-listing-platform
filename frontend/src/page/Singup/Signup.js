import styles from "./Signup.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { register, login } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const redirect = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);

  const validateForm = (name, email, mobile, password) => {
    let error;
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name) || name === "") {
      toast.error("Inavalid Name");
      error = true;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter valid email");
      error = true;
    }
    if (!/^(?!0)[0-9]{10}$/.test(mobile) || mobile === "") {
      toast.error("Enter Valid mobile number");
      error = true;
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      toast.error(
        "Password should contain at least one uppercase, one lowercase, one number, and one special character"
      );
      error = true;
    }

    if (check === false) {
      toast.error("Please select the check box to proceed");
      error = true;
    }

    if (error) {
      return false;
    }

    return true;
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const valid = validateForm(name, email, mobile, password);
    if (valid) {
      const result = await register(name, email, mobile, password);
      if (result) {
        const result2 = await login(email, password);
        localStorage.setItem(
          "recuirterDetail",
          JSON.stringify({
            token: result2.jwtToken,
            recuirterName: result2.recuirterName,
            expiry: new Date().getTime() + 60 * 60 * 10000,
          })
        );
        toast.success(result.message);
        setTimeout(() => {
          redirect("/");
        }, 2000);
      } else {
        toast.error(result.mesage);
      }
    }
  };

  return (
    <main>
      <section className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.formtitle}>
            <span>Create an account?</span>
            <span>Your Personal job finder is here</span>
          </div>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="mobile"
            maxLength={10}
            value={mobile}
            placeholder="Mobile"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            required
            className={styles.input}
          />
          <input
            type="text"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className={styles.input}
          />
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              className={styles.checkobx}
              value={check}
              onChange={(e) => {
                setCheck(e.target.checked);
              }}
            />
            <span className={styles.checkboxtext}>
              By creating an account, I agree to our terms of use and privacy
              policy
            </span>
          </div>
          <button className={styles.button} onClick={handleSumbit}>
            Create Account
          </button>
        </form>
        <div className={styles.signupLink}>
          Already have an account?<a href="/signin">Sign In</a>
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

export default Signup;
