// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./ViewContacts.css";

// function ViewContacts() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [contacts, setContacts] = useState([]);
//   const [login, setLogin] = useState({
//     username: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [loginLoading, setLoginLoading] = useState(false);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   // =========================
//   // Admin Login
//   // =========================

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     setLoginLoading(true);
//     setError("");

//     try {
//       const response = await fetch(
//         "https://smgalaxy-backend.onrender.com/api/admin/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(login),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Invalid username or password.");
//         return;
//       }

//       setIsAdmin(true);
//     } catch (error) {
//       console.error("Login error:", error);
//       setError("Unable to connect to server.");
//     } finally {
//       setLoginLoading(false);
//     }
//   };

//   // =========================
//   // Fetch Contacts
//   // =========================

//   useEffect(() => {
//     if (!isAdmin) {
//       return;
//     }

//     const fetchContacts = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch(
//           "https://smgalaxy-backend.onrender.com/api/contacts"
//         );

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(
//             data.message || "Failed to fetch contacts."
//           );
//         }

//         setContacts(data);
//       } catch (error) {
//         console.error("Fetch contacts error:", error);
//         setError("Unable to load messages.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContacts();
//   }, [isAdmin]);

//     // =========================
//   // Delete Contact
//   // =========================

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this message?"
//     );

//     if (!confirmDelete) {
//       return;
//     }

//     try {
//       setDeleteLoading(id);
//       setError("");

//       const response = await fetch(
//         `https://smgalaxy-backend.onrender.com/api/contacts/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to delete contact."
//         );
//       }

//       // Remove deleted contact from the screen
//       setContacts((prevContacts) =>
//         prevContacts.filter(
//           (contact) => contact._id !== id
//         )
//       );
//     } catch (error) {
//       console.error("Delete contact error:", error);
//       setError("Unable to delete message.");
//     } finally {
//       setDeleteLoading(null);
//     }
//   };

//   // =========================
//   // Logout
//   // =========================

//   const handleLogout = () => {
//     setIsAdmin(false);

//     setContacts([]);

//     setLogin({
//       username: "",
//       password: "",
//     });

//     setError("");
//   };

//   // =========================
//   // Login Page
//   // =========================

//   if (!isAdmin) {
//     return (
//       <div className="login-box">

//         <button
//           type="button"
//           className="back-btn"
//           onClick={() => navigate("/")}
//         >
//           ← Back
//         </button>

//         <h2>Admin Login</h2>

//         <form onSubmit={handleLogin}>

//           <div>
//             <input
//               type="text"
//               placeholder="Username"
//               value={login.username}
//               onChange={(e) =>
//                 setLogin({
//                   ...login,
//                   username: e.target.value,
//                 })
//               }
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="password"
//               placeholder="Password"
//               value={login.password}
//               onChange={(e) =>
//                 setLogin({
//                   ...login,
//                   password: e.target.value,
//                 })
//               }
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loginLoading}
//           >
//             {loginLoading ? "Logging in..." : "Login"}
//           </button>

//         </form>

//         {error && (
//           <p className="error-message">
//             {error}
//           </p>
//         )}

//       </div>
//     );
//   }

//   // =========================
//   // Admin Messages Page
//   // =========================

//   return (
//     <div className="admin-container">

//       <button
//         type="button"
//         className="back-btn"
//         onClick={() => navigate("/")}
//       >
//         ← Back
//       </button>

//       <button
//         type="button"
//         className="logout-btn"
//         onClick={handleLogout}
//       >
//         Logout
//       </button>

//       <h2>Messages</h2>

//       {loading && (
//         <p>Loading messages...</p>
//       )}

//       {error && (
//         <p className="error-message">
//           {error}
//         </p>
//       )}

//       {!loading &&
//         !error &&
//         contacts.length === 0 && (
//           <p>No messages found.</p>
//         )}

//       {!loading &&
//         contacts.map((item) => (
//           <div
//             key={item._id}
//             className="card"
//           >
//             <p>
//               <strong>Name:</strong>{" "}
//               {item.name}
//             </p>

//             <p>
//               <strong>Email:</strong>{" "}
//               {item.email}
//             </p>

//             <p>
//               <strong>Message:</strong>{" "}
//               {item.message}
//             </p>

//             {item.submittedAt && (
//               <p>
//                 <strong>Date:</strong>{" "}
//                 {new Date(
//                   item.submittedAt
//                 ).toLocaleString()}
//               </p>
//             )}

//               {/* DELETE BUTTON */}
//             <button
//               type="button"
//               className="delete-btn"
//               onClick={() => handleDelete(item._id)}
//               disabled={deleteLoading === item._id}
//             >
//               {deleteLoading === item._id
//                 ? "Deleting..."
//                 : "Delete"}
//             </button>
//           </div>
//         ))}
//     </div>
//   );
// }

// export default ViewContacts;



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
  const [loginLoading, setLoginLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // =========================
  // Admin Login
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://smgalaxy-backend.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid username or password."
        );
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoginLoading(false);
    }
  };

  // =========================
  // Fetch Contacts
  // =========================

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://smgalaxy-backend.onrender.com/api/contacts"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch contacts."
          );
        }

        setContacts(data);
      } catch (error) {
        console.error(
          "Fetch contacts error:",
          error
        );

        setError("Unable to load messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, [isAdmin]);

  // =========================
  // Delete Contact
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeleteLoading(id);
      setError("");

      const response = await fetch(
        `https://smgalaxy-backend.onrender.com/api/contacts/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete contact."
        );
      }

      setContacts((prevContacts) =>
        prevContacts.filter(
          (contact) => contact._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete contact error:",
        error
      );

      setError("Unable to delete message.");
    } finally {
      setDeleteLoading(null);
    }
  };

  // =========================
  // Logout
  // =========================

  const handleLogout = () => {
    setIsAdmin(false);
    setContacts([]);

    setLogin({
      username: "",
      password: "",
    });

    setError("");
    setDeleteLoading(null);
  };

  // =========================
  // Login Page
  // =========================

  if (!isAdmin) {
    return (
      <div className="login-box">
        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/")}
        >
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

          <button
            type="submit"
            disabled={loginLoading}
          >
            {loginLoading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}
      </div>
    );
  }

  // =========================
  // Admin Messages Page
  // =========================

  return (
    <div className="admin-container">
      <button
        type="button"
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <button
        type="button"
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

      <h2>Messages</h2>

      {loading && (
        <p>Loading messages...</p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        contacts.length === 0 && (
          <p>No messages found.</p>
        )}

      {!loading &&
        contacts.map((item) => (
          <div
            key={item._id}
            className="card"
          >
            <p>
              <strong>Name:</strong> {item.name}
            </p>

            <p>
              <strong>Email:</strong> {item.email}
            </p>

            <p>
              <strong>Message:</strong> {item.message}
            </p>

            {/* STORED SUBMISSION TIME */}

{item.createdAt && (
  <div className="contact-date">
    <strong>Submitted:</strong>{" "}
    {new Date(item.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })}
  </div>
)}


            {/* DELETE */}

            <button
              type="button"
              className="delete-btn"
              onClick={() =>
                handleDelete(item._id)
              }
              disabled={
                deleteLoading === item._id
              }
            >
              {deleteLoading === item._id
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>
        ))}
    </div>
  );
}

export default ViewContacts;


