// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { MemoryRouter, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { AxViewport } from "@axux/core";
import { Login } from "./login/Login";
import { useEffect, useState } from "react";
import { AppViewport } from "./AppViewport";
import { Register } from "./login/Register";

const RouteCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  useEffect(() => {
    navigate(isAuthenticated ? "app" : "login", { replace: true });
  }, [isAuthenticated]);
  return <Outlet context={{ isAuthenticated, setIsAuthenticated }} />;
};
export const Demo = () => {
  return (
    <AxViewport>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<RouteCheck />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="app/*" element={<AppViewport />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AxViewport>
  );
};
