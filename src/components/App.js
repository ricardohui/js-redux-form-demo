import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Form from "./Form";
import List from "./List";
import Detail from "./Detail";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route path="/apply" render={() => <Form />} />
        <Route path="/applications" exact render={() => <List />} />
        <Route path="/applications/:id" render={() => <Detail />} />
        <Footer />
      </div>
    );
  }
}

export default App;
