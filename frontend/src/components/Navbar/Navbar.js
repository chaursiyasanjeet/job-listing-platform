import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const redirect = useNavigate();
  const tokenTime = JSON.parse(localStorage.getItem("recuirterDetail"));
  const currentTime = new Date().getTime();
  const [loggedin, setloggedin] = useState(
    tokenTime.expiry > currentTime ? true : false
  );
  return (
    <navbar className={styles.nav}>
      <h3 className={styles.title} onClick={redirect("/")}>
        Jobfinder
      </h3>
      {loggedin ? (
        <div className={styles.loginView}>
          <span
            onClick={() => {
              toast.success("Logout successfull");
              setloggedin(false);
            }}
          >
            Logout
          </span>
          <span>Hello! {tokenTime.recuirterName}</span>
          <div className={styles.recruiterLogo}>S</div>
        </div>
      ) : (
        <div className={styles.logoutView}>
          <button onClick={() => redirect("/signin")}>Login</button>
          <button onClick={() => redirect("/signup")}>Register</button>
        </div>
      )}
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
    </navbar>
  );
};
export default Navbar;
