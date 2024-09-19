import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../componants/common/LoadingSpinner.jsx"; // Import the LoadingSpinner component
import styles from "../CSS/LoginForm.module.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const API_URL = import.meta.env.VITE_API_URL; // url for host
    e.preventDefault();
    setErrors({});
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post(
        // "http://127.0.0.1:8000/api/login",
        `${API_URL}/api/login`,
        {
          email,
          password,
        }
      );
      console.log("the message of the response of the login", response);

      //  {"message": "Login successfully",
      //     "token": "390|8ICSKML4LjrZ7lv0AgPZArTRuBzVzUZKnsEWxld0302755c6",
      //     "success": true,
      //     "reg_id": 0,
      //     "role_id": "",
      //     "academic_yr": "2023-2024",
      //     "institutename": "St. Arnold's Central School"}

      localStorage.setItem("authToken", response.data.token);

      const sessionData = {
        user: response.data.data,
        settings: response.data.settings,
      };
      sessionStorage.setItem("sessionData", JSON.stringify(sessionData));
      navigate("/dashboard");
    } catch (error) {
      const newErrors = {};
      if (error.response) {
        if (error.response.status === 404) {
          newErrors.email = "Invalid username";
        } else if (error.response.status === 401) {
          newErrors.password = "Invalid password";
        } else {
          newErrors.api = "An unexpected error. Please try again later.";
        }
      } else {
        newErrors.api = "An unexpected error. Please try again later.";
      }
      setErrors(newErrors);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className={styles.loginForm}>
      <h2>Log-In</h2>
      <p>Enter your details to login to your account</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.inputWrapper}>
            <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className={styles.eyeIcon}
              onClick={toggleShowPassword}
            />
          </div>
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        {errors.api && (
          <span
            className={`${styles.error} text-center relative -left-3  text-nowrap text-xs`}
          >
            {errors.api}
          </span>
        )}

        <button
          type="submit"
          className={`${styles.loginButton} flex place-items-center justify-center`}
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Login"}
        </button>
        <div className={styles.formFooter}></div>
      </form>
    </div>
  );
};

export default LoginForm;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// // ../components/common/LoadingSpinner.jsx
// import LoadingSpinner from "../componants/common/LoadingSpinner.jsx"; // Import the LoadingSpinner component
// import styles from "../CSS/LoginForm.module.css";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const toggleShowPassword = () => setShowPassword(!showPassword);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setLoading(true); // Set loading to true when form is submitted
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/login`,
//         {
//           email,
//           password,
//         }
//       );

//       localStorage.setItem("authToken", response.data.token);

//       const sessionData = {
//         user: response.data.data,
//         settings: response.data.settings,
//       };
//       sessionStorage.setItem("sessionData", JSON.stringify(sessionData));
//       navigate("/dashboard");
//     } catch (error) {
//       const newErrors = {};
//       if (error.response) {
//         // Display error message from the server
//         if (error.response.data && error.response.data.error) {
//           newErrors.api = error.response.data.error;
//         } else {
//           newErrors.api =
//             "An unexpected error occurred. Please try again later.";
//         }
//       } else {
//         newErrors.api = "An unexpected error occurred. Please try again later.";
//       }
//       setErrors(newErrors);
//     } finally {
//       setLoading(false); // Set loading to false after the request is complete
//     }
//   };

//   return (
//     <div className={styles.loginForm}>
//       <h2>Log-In</h2>
//       <p>Enter your details to login to your account</p>
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           {/* Display server error message */}
//           {errors.api && <span className={styles.error}>{errors.api}</span>}
//           <div className={styles.inputWrapper}>
//             <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter Email"
//               required
//             />
//           </div>
//         </div>{" "}
//         {errors.api && <span className={styles.error}>{errors.api}</span>}
//         <div className={styles.formGroup}>
//           <div className={styles.passwordWrapper}>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               name="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password"
//               required
//             />
//             <FontAwesomeIcon
//               icon={showPassword ? faEyeSlash : faEye}
//               className={styles.eyeIcon}
//               onClick={toggleShowPassword}
//             />
//           </div>
//         </div>
//         <button
//           type="submit"
//           className={`${styles.loginButton} flex place-items-center justify-center`}
//           disabled={loading}
//         >
//           {loading ? <LoadingSpinner /> : "Login"}
//         </button>
//         <div className={styles.formFooter}></div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
