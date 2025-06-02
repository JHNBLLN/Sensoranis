import "./css/RegisterPage.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [role, setRole] = useState("1");
  const [registerMessage, setRegisterMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [validationError, setValidationError] = useState([]);

  const nameError = validationError.find(
    (error) => error.code === "EMPTY_NAME"
  );
  const lastNameError = validationError.find(
    (error) => error.code === "EMPTY_SURNAME"
  );
  const emailError = validationError.find(
    (error) => error.code === "EMPTY_EMAIL"
  );
  const passwordError = validationError.find(
    (error) => error.code === "EMPTY_PASSWORD"
  );

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", {
        email,
        password,
        name,
        lastName,
        role,
      });
      setRegisterMessage(response.data.message);
      setMessageType("success");
    } catch (err) {
      console.log(err);
      const validation_error = err.response.data.validation_error;
      if (validation_error) {
        setValidationError(validation_error);
      }
      console.log(validation_error);
      setRegisterMessage(
        `${err.response.data.message} : ${validation_error.map((v) => {
          return v.message;
        })} `
      );
      setMessageType("error");
    }
  };

  return (
    <div className="register-form-body">
      <p className="register-title">Create Account</p>
      <form
        className="register-form"
        onSubmit={(event) => {
          handleRegister(event);
        }}
      >
        <div className="register-input-field">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            style={{ border: !nameError ? null : "solid 1px red" }}
          />
          <input
            type="text"
            placeholder="lastName"
            value={lastName}
            onChange={(e) => {
              setlastName(e.target.value);
            }}
            style={{ border: !lastNameError ? null : "solid 1px red" }}
          />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ border: !emailError ? null : "solid 1px red" }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ border: !passwordError ? null : "solid 1px red" }}
          />
          <label htmlFor="role_options">role</label>
          <select
            name="role"
            id="role_options"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="1">buyer</option>
            <option value="2">seller</option>
          </select>
          <div className="register-actions">
            <button type="submit" className="register-button">
              Register
            </button>
            <button
              type="button"
              className="register-button"
              onClick={() => navigate("/login")}
            >
              Return to Login
            </button>
          </div>
        </div>
        {registerMessage && (
          <p
            style={{
              color: messageType === "success" ? "green" : "red",
              margin: "auto",
            }}
          >
            {registerMessage}
          </p>
        )}
      </form>
    </div>
  );
}

export default RegisterPage;
