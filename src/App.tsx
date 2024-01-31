import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import RootLayout from "./layouts/RootLayout";
import Home from "./components/Home";

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
