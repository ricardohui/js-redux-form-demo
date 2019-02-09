import React from "react";
import { Field, reduxForm } from "redux-form";
class Form extends React.Component {
  onSubmit(formValues) {
    console.log("formValues");
    console.log(formValues);
    // this.props.createPost(values);
  }
  renderTitleField = field => {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input type="text" {...field.input} />
      </div>
    );
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h1>Loan Application Form</h1>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title" name="title" component={this.renderTitleField} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "appForm"
})(Form);
