import React from "react";
import { Field, reduxForm } from "redux-form";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import * as actions from "../actions";
class Form extends React.Component {
  onSubmit(formValues) {
    //debugger;
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
  componentDidMount() {
    /** change the value of a status field to processing or create one if not exist. change() is a function prop passed by redux-form. */
    this.props.change("status", "processing");
  }
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
  form: "appForm",
})(Form);

export default connect(null, actions)(wrappedForm);
