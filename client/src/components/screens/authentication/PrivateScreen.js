import { useState, useEffect } from "react";
import axios from "axios";
import Bank from "../bank/Bank";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  // Checks for the authtoken in local storage and adds the Bearer token to the header
  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        // Trys to get the user data once we have logged in
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
        // error if there is no authtoken
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchPrivateDate();
  }, [history]);

  // This will bring you back to log in and add an error if there is no authtoken, if there is then you can see the bank webapge
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <Bank />
    </>
  );
};

export default PrivateScreen;
