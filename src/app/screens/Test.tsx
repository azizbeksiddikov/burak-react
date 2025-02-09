// @ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  changeDetail = () => {
    // this.setState({ color: "blue", brand: "Tesla", year: 2023 });
    this.state.color = "blue";
    console.log("jafhakjh");
  };

  componentDidMount(): void {
    console.log("componentDidMount");
    // runs after first render
  }

  componentWillUnmount(): void {
    console.log("componentWillUnmount");
    // runs before component is removed
  }

  componentDidUpdate(): void {
    console.log("componentDidUpdate");
    // runs after state is updated
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Color: {this.state.color} - Model: {this.state.model}
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change color
        </button>
      </div>
    );
  }
}

export default Test;
