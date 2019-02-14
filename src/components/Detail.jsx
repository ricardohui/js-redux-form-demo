import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { Field, reduxForm, initialize } from "redux-form";
import * as actions from "../actions";
class Detail extends React.Component {
  componentDidMount() {
    this.props.fetchApps();
    initialize("appForm", { lastName: "Chan" });
  }
  renderTitleField = field => {
    // README: outside the return, you need to use field.input.name
    const elementID = `input-${field.input.name}`;
    return <TextField id={elementID} name={field.name} {...field.input} />;
  };
  onSubmit(formValues) {
    this.props.submitForm(formValues);
    // console.log(formValues);
    // this.props.createPost(values);
  }
  renderThisApplication = (applications, identifier) => {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Family Name"
            name="lastName"
            component={this.renderTitleField}
          />
          <Field
            label="Loan Amount"
            name="loanAmount"
            component={this.renderTitleField}
          />
          <Field label="Email" name="email" component={this.renderTitleField} />
          <Field
            label="Tenure"
            name="tenure"
            component={this.renderTitleField}
          />
        </form>
      </div>
    );
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

function mapStateToProps(state, ownProps) {
  const { applications } = state;
  const { id } = ownProps.match.params;
  if (applications.length > 1) {
    const applicationObj = {};
    applications.forEach(app => {
      applicationObj["" + app.id] = app;
      // debugger;
    });
    if (!applicationObj[id]) {
      return {
        applications: state.applications
      };
    }
    return {
      applications: state.applications,
      initialValues: {
        lastName: applicationObj[ownProps.match.params.id].lastName,
        loanAmount: applicationObj[ownProps.match.params.id].loanAmount,
        tenure: applicationObj[ownProps.match.params.id].tenure,
        email: applicationObj[ownProps.match.params.id].email
      }
    };
  }
  return {
    applications: state.applications
  };
}
const wrappedForm = reduxForm({
  form: "appForm",
  enableReinitialize: true
})(Detail);

export default connect(
  mapStateToProps,
  actions
)(wrappedForm);
