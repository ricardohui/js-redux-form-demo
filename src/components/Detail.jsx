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
  renderThisApplication = () => {
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
    const { match, application } = this.props;
    debugger;
    return (
      <div>
        <h1>Application {match.params.id}</h1>
        <div>{this.renderThisApplication()}</div>
        <div>Status: {this.props.application.status}</div>

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

    return {
      applications: state.applications,
      application: applicationObj[id],
      initialValues: {
        lastName: applicationObj[id].lastName,
        loanAmount: applicationObj[id].loanAmount,
        tenure: applicationObj[id].tenure,
        email: applicationObj[id].email
      }
    };
  }
  return {
    applications: [],
    application: {}
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
