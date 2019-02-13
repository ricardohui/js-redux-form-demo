import React, { Component } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Form from "./Form";
import List from "./List";
import Home from "./Home";
import Detail from "./Detail";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/apply" render={() => <Form />} />
        <Route path="/applications" exact render={() => <List />} />
        <Route
          path="/applications/:id"
          render={props => <Detail {...props} />}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
