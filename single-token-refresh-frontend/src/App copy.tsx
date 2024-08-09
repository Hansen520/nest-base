/*
 * @Date: 2024-08-09 14:45:08
 * @Description: description
 */
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [content, setContent] = useState("");

  async function query() {
    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        username: "han",
        password: "123456",
      });
      console.log(res.data);
      const res2 = await axios.get("http://localhost:3000/bbb", {
        headers: {
          Authorization: `Bearer ${res.data}`,
        },
      });
      setContent(res2.data);
    } catch (e: Error) {
      console.log(e.response.data.message);
    }
  }

  useEffect(() => {
    axios.interceptors.response.use((response) => {
      const newToken = response.headers["token"];
      console.log(response.headers);
      if (newToken) {
        localStorage.setItem("token ", newToken);
      }
      return response;
    });

    query();
  }, []);

  return (
    <>
      Hello Nest
      {content}
    </>
  );
}

export default App;
