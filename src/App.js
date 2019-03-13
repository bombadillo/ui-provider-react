import React, { Component } from "react";
import { Grid } from "chassis-react";
import styled, { StyleSheetManager } from "styled-components";

import "./App.css";

let Header = styled.h2`
  font-size: 48px;
`;

class App extends Component {
  mainEl = undefined;

  constructor() {
    super();

    this.state = {
      shadowRoot: undefined
    };

    this.mainEl = React.createRef();
  }

  componentDidMount() {
    this.hasShadowParent(this.mainEl.current);
  }

  hasShadowParent = element => {
    console.log(element);

    if (!element) {
      return;
    }

    while (element.parentNode && (element = element.parentNode)) {
      console.log(element);
      if (element instanceof ShadowRoot) {
        console.log("has shadow root");
        this.setState({ shadowRoot: element });
        return true;
      }
    }
    console.log("has no shadow root");
    return false;
  };

  render() {
    return (
      <Grid container>
        <div className="App" ref={this.mainEl}>
          {this.state.shadowRoot && (
            <StyleSheetManager target={this.state.shadowRoot}>
              <Header>Latest deals</Header>
            </StyleSheetManager>
          )}

          <ul>
            <li>Taco Deal 1</li>
            <li>Taco Deal 2</li>
            <li>Taco Deal 3</li>
          </ul>
        </div>
      </Grid>
    );
  }
}

export default App;
