import React from "react";
import Button from "@material-ui/core/Button";
import * as actions from "../actions";
import { connect } from "react-redux";
class Detail extends React.Component {
  componentDidMount() {
    this.props.fetchApps();
  }
  renderThisApplication = (applications, identifier) => {
    if (applications.length > 1) {
      const applicationObj = {};
      applications.forEach(app => {
        applicationObj[app.id] = app;
      });
      return (
        <div>
          {applicationObj[identifier].lastName},
          {applicationObj[identifier].loanAmount},
          {applicationObj[identifier].email},{applicationObj[identifier].tenure}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const { match, applications } = this.props;

    return (
      <div>
        <h1>Application {match.params.id}</h1>
        <div>{this.renderThisApplication(applications, match.params.id)}</div>
        <Button variant="contained" color="primary">
          Approve
        </Button>
        <Button variant="contained" color="secondary">
          Reject
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { applications: state.applications };
}
export default connect(
  mapStateToProps,
  actions
)(Detail);
