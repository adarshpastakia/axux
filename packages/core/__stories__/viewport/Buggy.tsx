// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Component } from "react";

export class Buggy extends Component {
  public state = { greeting: "Welcome" };
  public componentDidMount() {
    throw new Error("An error has occurred in Buggy component!");
  }
  public render() {
    return <h2>{this.state.greeting}</h2>;
  }
}
