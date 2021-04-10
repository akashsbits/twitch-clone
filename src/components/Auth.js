import { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setError(true);
      return;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-ctr-form">
        <div className="auth-form">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            id="password"
            name="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="text"
              id="password-check"
              name="password-check"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {error && <p>Password and confirm password do not match.</p>}
          <button className="default-btn" onClick={handleSubmit}>
            Go
          </button>
        </div>
        <div className="toggle-form-btn">
          <button
            onClick={() => setIsLogin(false)}
            style={{ backgroundColor: !isLogin ? "#18181b" : "#0e0e10" }}
          >
            Sign up
          </button>
          <button
            onClick={() => setIsLogin(true)}
            style={{ backgroundColor: isLogin ? "#18181b" : "#0e0e10" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
