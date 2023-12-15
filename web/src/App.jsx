import Home from "./components/Home";
import Login from "./components/Login";

import { useEffect, useContext, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { GlobalContext } from "./context/context";

import "./App.css";
import axios from "axios";
import { baseUrl } from "./core.mjs";

const App = () => {

  const { state, dispatch } = useContext(GlobalContext);
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        config.withCredentials = true;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    getUser();

    return () => {
      // cleanup function
    }

  }, []);

  const getUser = async () => {
    try {
      const userResponse = await axios.get(`${baseUrl}/api/v1/profile`);
      // console.log("user: ", userResponse.data);
      setUser(userResponse.data);
      dispatch({ type: "USER_LOGIN", payload: userResponse.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "USER_LOGOUT" });
    }
  };

  // console.log(state);

  return (
    <div className="div">
      {state.isLogin === true ? (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}

      {state.isLogin === false ? (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
          </Routes>
        </>
      ) : null}

      {
        state.isLogin === null ?
          <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <h1 className="text-[1.5em] text-center text-[#f7f9fb] font-bold">Loading . . .</h1>
          </div>
          : null
      }
    </div>
  );
};

export default App;
