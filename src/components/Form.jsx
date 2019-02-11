import React from "react";
import { Field, reduxForm } from "redux-form";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
class Form extends React.Component {
  onSubmit(formValues) {
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
            name="name"
            component={this.renderTitleField}
          />
          <Field label="Email" name="email" component={this.renderTitleField} />
          <Field
            required
            label="Loan Amount"
            name="amount"
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

export default reduxForm({
  form: "appForm"
})(Form);
