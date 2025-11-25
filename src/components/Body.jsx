import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const API_URL = import.meta.env.VITE_API_URL;

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const url = `${API_URL}/profile/view`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      dispatch(addUser(data));
    } catch (error) {
      console.error("Error:", error);
      if (error.status === 401) {
        return navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
