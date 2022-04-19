// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import {
  AxBox,
  AxButton,
  AxContent,
  AxDivider,
  AxHeading,
  AxLocalePicker,
  AxPanel,
  AxSpacer,
  AxText,
  AxThemeToggle
} from "@axux/core";
import { AxField, AxForm } from "@axux/form";
import * as yup from "yup";
import { addYears } from "date-fns";
import { AxDateTime } from "@axux/date";

const RegistrationForm = () => {
  const maxDob = addYears(new Date(), -10);
  const schema = yup.object<KeyValue>().shape({
    username: yup.string().email().required(),
    password: yup.string().required(),
    confirmation: yup
      .string()
      .required()
      .test(
        "match-password",
        "Passwords do not match",
        (value, context) => value === context.parent.password
      ),
    salutation: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    dob: yup.date().max(maxDob),
    group: yup.string().required().oneOf(["owner", "moderator", "user"]),
    agree: yup.boolean().required().equals([true])
  });
  return (
    <AxForm schema={schema}>
      <AxContent>
        <AxField.Text label="Username" name="username" required autoFocus />
        <AxField.Password label="Password" name="password" required />
        <AxField.Password label="Confirm Password" name="confirmation" required />
        <AxDivider />
        <AxField.Select<string>
          label="Salutation"
          name="salutation"
          options={["Mr", "Ms", "Mrs", "Dr", "Prof"]}
          width={96}
        />
        <AxField.Text label="First Name" name="firstName" required />
        <AxField.Text label="Last Name" name="lastName" required />
        <AxDateTime.Input label="Date of birth" max={maxDob} />
        <AxField.Options label="User Group" name="group">
          <AxField.Radio value="owner" label="Owner" />
          <AxField.Radio value="moderator" label="Moderator" />
          <AxField.Radio value="user" label="User" />
        </AxField.Options>
        <AxSpacer />
        <AxField.Checkbox
          name="agree"
          label={
            <span>
              I have read the <a className="ax-link">User Agreement</a>
            </span>
          }
        />
      </AxContent>
      <AxPanel.Footer className="ax-row--spaced ax-padding--y--sm ax-padding--x">
        <AxButton.Neutral to="../login">Login</AxButton.Neutral>
        <AxButton.Positive>Register</AxButton.Positive>
      </AxPanel.Footer>
    </AxForm>
  );
};

export const Register = () => {
  return (
    <div
      style={{
        display: "grid",
        gridArea: "page",
        padding: "1.5rem",
        overflow: "hidden",
        placeContent: "center",
        gridTemplateColumns: "320px auto",
        gridTemplateRows: "auto auto"
      }}
    >
      <AxBox align="center">
        <AxHeading forDisplay level={5} className="ax-row ax-row--middle ax-row--center">
          <img src="logo.png" alt="logo" height={48} />
          <span>AxUX</span>
        </AxHeading>
        <AxText block color="muted">
          <p>
            AxUX React framework demo application showcasing basic components and data components
            for building business applications
          </p>
        </AxText>
        <AxDivider vertical />
      </AxBox>
      <div />
      <AxPanel paper>
        <RegistrationForm />
      </AxPanel>
      <AxButton.Group vertical>
        <AxThemeToggle />
        <AxLocalePicker />
      </AxButton.Group>
    </div>
  );
};
