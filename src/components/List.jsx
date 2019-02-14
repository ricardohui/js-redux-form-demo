import React from "react";
import { fetchApps } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class List extends React.Component {
  componentDidMount() {
    this.props.fetchApps();
  }
  renderApplications = () => {
    const { applications } = this.props;
    if (applications.length > 0) {
      return applications.map(app => {
        return (
          <li key={app.email}>
            <Link to={"/applications/" + app.id}>{`${app.lastName} (email: ${
              app.email
            }) applied a loan for $${app.loanAmount} and promised to repay in ${
              app.tenure
            } months. `}</Link>
            {app.status && app.status.toUpperCase()}
          </li>
        );
      });
    }
    return <div />;
  };
  render() {
    return (
      <div>
        <h1>List of Loan Applications</h1>
        <ol>{this.renderApplications()}</ol>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { applications: state.applications };
}
export default connect(
  mapStateToProps,
  { fetchApps }
)(List);
