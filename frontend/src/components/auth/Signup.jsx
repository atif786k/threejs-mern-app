import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
// import { useSnackbar } from "notistack";
import { CiUser, CiLock, CiMail } from "react-icons/ci";
import "./auth.css";

const Signup = () => {
    // const navigate = useNavigate();
  // const enqueueSnackbar = useSnackbar();

  const [fieldsValues, setFieldValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const clearAllFields = () => {
    setFieldValues({
      username: "",
      email: "",
      password: "",
    });
  };

//   const handleSignForm = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post("/auth/register", fieldsValues);
//       // enqueueSnackbar(response.data.msg, { varient: "success" });
//       console.log(response.data.msg);
//       navigate("/login");
//       clearAllFields();
//     } catch (error) {
//       alert(
//         "Failed to register: " +
//           (error.response ? error.response.data.msg : error.message)
//       );
//     }
//   };
  return (
    <>
      <div className="signin-container">
        <form className="signin-form space-y-4" >
          <div className="signin-title">
            <h2>Create an account</h2>
            <h4>
              Already have an account?{" "}
              {/* <Link to="/login" className="font-bold">
                Login
              </Link> */}
            </h4>
          </div>
          <div className="input-div">
            <CiUser className="signin-icon-style" />
            <input
              className="signin-input-fields"
              id="username"
              required
              onChange={(event) =>
                setFieldValues((prev) => ({
                  ...prev,
                  username: event.target.value,
                }))
              }
              value={fieldsValues.username} // Ensure this is set
              type="text"
              name="username"
              placeholder="User Name"
            />
          </div>

          <div className="input-div">
            <CiMail className="signin-icon-style" />
            <input
              className="signin-input-fields"
              id="email"
              required
              onChange={(event) =>
                setFieldValues((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              value={fieldsValues.email} // Ensure this is set
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>

          <div className="input-div">
            <CiLock className="signin-icon-style" />
            <input
              className="signin-input-fields"
              id="password"
              required
              onChange={(event) =>
                setFieldValues((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              value={fieldsValues.password} // Ensure this is set
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="submit-sign-form signin-btn">
            Sign in
          </button>
        </form>
      </div>
    </>
  )
}

export default Signup