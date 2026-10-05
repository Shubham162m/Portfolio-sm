import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewContacts.css";

function ViewContacts() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      login.username === "shubham" &&
      login.password === "Shubham@123"
    ) {
      setIsAdmin(true);
      setError("");
    } else {
      setError("Wrong username or password.");
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://smgalaxy-backend.onrender.com/api/contact"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch contacts."
          );
        }

        setContacts(data.contacts || []);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Unable to load messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [isAdmin]);

  const handleLogout = () => {
    setIsAdmin(false);

    setLogin({
      username: "",
      password: "",
    });

    setContacts([]);
  };

  if (!isAdmin) {
    return (
      <div>
        <button onClick={() => navigate("/")}>
          ← Back
        </button>

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={login.username}
              onChange={(e) =>
                setLogin({
                  ...login,
                  username: e.target.value,
                })
              }
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={login.password}
              onChange={(e) =>
                setLogin({
                  ...login,
                  password: e.target.value,
                })
              }
              required
            />
          </div>

          <button type="submit">
            Login
          </button>
        </form>

        {error && <p>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>
        ← Back
      </button>

      <button onClick={handleLogout}>
        Logout
      </button>

      <h2>Messages</h2>

      {loading && <p>Loading messages...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && contacts.length === 0 && (
        <p>No messages found.</p>
      )}

      {!loading &&
        contacts.map((item) => (
          <div key={item._id}>
            <p>
              <strong>Name:</strong> {item.name}
            </p>

            <p>
              <strong>Email:</strong> {item.email}
            </p>

            <p>
              <strong>Message:</strong> {item.message}
            </p>

            {item.createdAt && (
              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            )}

            <hr />
          </div>
        ))}
    </div>
  );
}

export default ViewContacts;
