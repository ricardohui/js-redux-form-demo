import React, { Component } from "react";
import Button from "@material-ui/core/Button";
class ApproveOrReject extends Component {
  render() {
    const {
      input: { value, onChange }
    } = this.props;
    return (
      <div>
        <span>The current status is {value}.</span>

        <Button
          variant="contained"
          color="primary"
          onClick={() => onChange("approved")}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onChange("rejected")}
        >
          Reject
        </Button>
      </div>
    );
  }
}

export default ApproveOrReject;
