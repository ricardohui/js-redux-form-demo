import React from "react";
import { Field, reduxForm } from "redux-form";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import * as actions from "../actions";
class Form extends React.Component {
  onSubmit(formValues) {
    this.props.submitForm(formValues);
    // console.log(formValues);
    // this.props.createPost(values);
  }
  renderTitleField = field => {
    // README: outside the return, you need to use field.input.name
    const elementID = `input-${field.input.name}`;
    return (
      <FormControl>
        <InputLabel htmlFor={elementID}>{field.label}</InputLabel>
        <Input required id={elementID} name={field.name} {...field.input} />
      </FormControl>
    );
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>Loan Application Form</h1>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Family Name"
            name="lastName"
            component={this.renderTitleField}
          />
          <Field label="Email" name="email" component={this.renderTitleField} />
          <Field
            required
            label="Loan Amount"
            name="loanAmount"
            component={this.renderTitleField}
          />
          <Field
            required
            label="Tenure"
            name="tenure"
            component={this.renderTitleField}
          />
          <div>
            <Button type="submit" className="btn btn-primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const wrappedForm = reduxForm({
  form: "appForm"
})(Form);

export default connect(
  null,
  actions
)(wrappedForm);
