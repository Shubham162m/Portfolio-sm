import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewContacts.css";

function ViewContacts() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [login, setLogin] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (login.username === "shubham" && login.password === "Shubham@123") {
      setIsAdmin(true);
    } else {
      alert("Wrong username or password");
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetch("http://localhost:5000/api/contacts")
        .then((res) => res.json())
        .then((data) => setContacts(data));
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="login-box">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" onChange={(e) =>
              setLogin({ ...login, username: e.target.value })
            }/>

          <input type="password" placeholder="Password"onChange={(e) =>
              setLogin({ ...login, password: e.target.value })
            }/>
                <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <button className="back-btn" onClick={() => navigate("/")}> ← Back </button>
      <h2>Messages</h2>
      {contacts.map((item) => (
        <div key={item._id} className="card">
          <p><b>Name:</b> {item.name}</p>
          <p><b>Email:</b> {item.email}</p>
          <p><b>Message:</b> {item.message}</p>
        </div>
      ))}
    </div>
  );
}

export default ViewContacts;