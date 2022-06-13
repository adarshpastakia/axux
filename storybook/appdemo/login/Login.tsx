// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import {
  AxButton,
  AxContent,
  AxDivider,
  AxHeading,
  AxLocalePicker,
  AxPanel,
  AxText,
  AxThemeToggle
} from "@axux/core";
import { AxField, AxForm } from "@axux/form";
import * as yup from "yup";
import { useOutletContext } from "react-router-dom";

const LoginForm = () => {
  const { setIsAuthenticated } = useOutletContext<KeyValue>();
  const schema = yup.object<KeyValue>().shape({
    username: yup.string().email().required(),
    password: yup.string().required()
  });
  return (
    <AxForm schema={schema} onSubmit={() => setIsAuthenticated(true)}>
      <AxContent>
        <AxField.Text label="Username" name="username" required autoFocus />
        <AxField.Password label="Password" name="password" required />
        <AxField.Checkbox label="Remember account" />
      </AxContent>
      <AxPanel.Footer className="ax-row--spaced ax-padding--y--sm ax-padding--x">
        <AxButton.Neutral to="../register">Register</AxButton.Neutral>
        <AxButton.Positive>Login</AxButton.Positive>
      </AxPanel.Footer>
    </AxForm>
  );
};

export const Login = () => {
  return (
    <div
      style={{
        display: "grid",
        gridArea: "page",
        padding: "1.5rem",
        overflow: "hidden",
        placeContent: "center",
        gridTemplateColumns: "320px auto 320px auto"
      }}
    >
      <div style={{ placeSelf: "center" }}>
        <AxHeading forDisplay level={5} className="ax-row ax-row--middle">
          <img src="logo.png" alt="logo" height={48} />
          <span>AxUX</span>
        </AxHeading>
        <AxText block color="muted">
          <p>
            AxUX React framework demo application showcasing basic components and data components
            for building business applications
          </p>
        </AxText>
      </div>
      <AxDivider vertical />
      <AxPanel paper>
        <LoginForm />
      </AxPanel>
      <AxButton.Group vertical>
        <AxThemeToggle />
        <AxLocalePicker />
      </AxButton.Group>
    </div>
  );
};
