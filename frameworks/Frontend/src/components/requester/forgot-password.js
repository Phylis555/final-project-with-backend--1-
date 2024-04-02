import React, { useState } from "react";
import axios from "../../api/axios";
import "./footer.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // שליחת בקשת HTTP POST לשחזור הסיסמה
      const response = await axios.post("/api/reset-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("שגיאה בעת שחזור הסיסמה. אנא נסה שוב מאוחר יותר.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>שחזור סיסמה</h2>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="email">כתובת דוא"ל:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "מבצע שחזור סיסמה..." : "שחזור סיסמה"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
