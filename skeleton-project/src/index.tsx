/*
 * AX/UX skeleton project
 * @version   : 0.0.1
 * @copyright : 2022
 * @license   : MIT
 */

import { AxApplicationProvider, AxViewport } from "@axux/core";
import { Fragment, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Outlet, RouterProvider, createMemoryRouter } from "react-router";
import i18next from "./i18n";
import reportWebVitals from "./reportWebVitals";
import "./styles/styles.css";

// @ts-expect-error ignore
const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createMemoryRouter([
  {
    path: "/",
    element: (
      <AxViewport>
        <div>Build the ui here</div>
        <Outlet />
      </AxViewport>
    ),
    children: [
      {
        path: "page",
        // @ts-expect-error ignore
        // eslint-disable-next-line react/jsx-no-undef
        element: <Page />,
      },
      {
        path: "page",
        // @ts-expect-error ignore
        // eslint-disable-next-line react/jsx-no-undef
        element: <Page />,
      },
    ],
  },
]);

const Wrapper = process.env.NODE_ENV === "development" ? Fragment : StrictMode;
root.render(
  <Wrapper>
    <AxApplicationProvider defaultPrimary="denim" defaultAccent="coral">
      <I18nextProvider i18n={i18next}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </AxApplicationProvider>
  </Wrapper>,
);

// @ts-expect-error ignore
if (module.hot) {
  // @ts-expect-error ignore
  module.hot.accept();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.debug);
