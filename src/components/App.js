import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Form from "./Form";
import List from "./List";
import Home from "./Home";
import Detail from "./Detail";
import MonthlyValuationRequestForm from "./MonthlyValuationRequestForm";
import MonthlyValuationResponseForm from "./MonthlyValuationResponseForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/apply" render={() => <Form />} />
        <Switch>
          <Route
            exact
            path="/batch_valuation"
            render={() => <MonthlyValuationRequestForm />}
          />
          <Route
            path="/batch_valuation/:id"
            render={() => <MonthlyValuationResponseForm />}
          />
        </Switch>
        <Route path="/loans" exact render={() => <List />} />
        <Route path="/loans/:id" render={props => <Detail {...props} />} />
        <Footer />
      </div>
    );
  }
}

export default App;
