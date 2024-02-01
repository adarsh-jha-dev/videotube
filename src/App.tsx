import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RootLayout from "./layouts/RootLayout";
import Home from "./components/Home";
import { useEffect } from "react";
import axios from "./services/axios";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/AuthSlice";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      await axios
        .get(`/users/current-user`)
        .then((response) => {
          dispatch(login({ userData: response.data.data }));
        })
        .catch((error: any) => {
          dispatch(logout());
          toast("Not logged in");
          console.log(error);
        });
    };
    fetchLoggedInUser();
  }, []);

  return (
    <ThemeProvider>
      <div>
        <main className="flex h-screen">
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route element={<RootLayout />}>
              <Route index element={<Home />}></Route>
            </Route>
          </Routes>
        </main>
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
