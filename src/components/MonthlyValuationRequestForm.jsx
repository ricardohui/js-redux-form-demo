import React from "react";
import { Field, reduxForm } from "redux-form";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Checkbox } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import { KeyboardDatePicker } from "@material-ui/pickers";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class MonthylValuationRequestForm extends React.Component {
  state = {
    currentValuer: ["cbre", "cbre", "rhl"],
    checkbox: [false, false, false],
    toggleAll: false,
    isModalOpen: false,
    showSnackbar: false,
    dateOfValuation: Date.now(),
  };

  atLeastOneTrue() {
    return this.state.checkbox.filter(box => box).length > 0;
  }
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
  handleCurrentValuerChange(event, rowId) {
    // console.log(event);

    let newValuers = Object.assign(this.state.currentValuer, {});
    newValuers[rowId] = event.target.value;

    this.setState({ newValuers });
  }

  handleSubmitRequest() {
    this.handleDialogClose();
    this.handleSnackbarOpen();
  }
  handleCheckboxChange(rowId) {
    this.setState(state => {
      let checkboxs = Object.assign(state.checkbox, {});
      checkboxs[rowId] = !checkboxs[rowId];
      return { ...state, checkbox: checkboxs };
    });
  }
  handleToggleAll() {
    console.log("toggle all");

    this.setState(state => {
      let checkboxs = Object.assign(state.checkbox, {});
      for (const row in checkboxs) {
        if (checkboxs.hasOwnProperty(row)) {
          const element = checkboxs[row];
          checkboxs[row] = !this.state.toggleAll;
          console.log(`now checkbox ${row} is ${checkboxs[row]}`);
        }
      }
      return { ...state, checkbox: checkboxs, toggleAll: !state.toggleAll };
    });
  }

  handleDialogOpen = () => {
    this.setState({ isModalOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ isModalOpen: false });
  };

  handleSnackbarOpen = () => {
    this.setState({ showSnackbar: true });
  };

  handleSnackbarClose = () => {
    this.setState({ showSnackbar: false });
  };
  handleDateChange = date => {
    this.setState({ dateOfValuation: date });
  };

  renderCurrentValuer(itemId) {
    const { currentValuer } = this.state;
    console.log(currentValuer);
    return (
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentValuer[itemId]}
        onChange={e => this.handleCurrentValuerChange(e, itemId)}
      >
        <MenuItem value="rhl">RHL</MenuItem>
        <MenuItem value="pruden">Pruden</MenuItem>
        <MenuItem value="cbre">CBRE</MenuItem>
      </Select>
    );
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h1 className="text-5xl ">Monthly Valuation Form</h1>
        <p className="text-left pl-8 ">
          To make valuation request :<br></br>1) Under first column, tick the
          required property(ies) <br />
          2) Under "Current valuer" column, choose the Valuer for this valuation
          request <br />
          3) Click the "Send Request" button below the table and you would be
          asked to select the valuation date for this request{" "}
        </p>
        <div className="pt-8">
          <table className="table-auto ">
            <tbody>
              <tr>
                <th className="bg-gray-400">
                  <Checkbox
                    onChange={this.handleToggleAll.bind(this)}
                    checked={this.state.toggleAll}
                  ></Checkbox>
                </th>
                <th className="bg-gray-400  px-4 py-2">
                  Mortgaged Property Address
                </th>
                <th className="bg-gray-400  px-4 py-2">Original Valuer</th>
                <th className="bg-gray-400  px-4 py-2">Current Valuer</th>
                <th className="bg-gray-400  px-4 py-2">Last Valuation(HK$)</th>
                <th className="bg-gray-400  px-4 py-2">Date of Valuation</th>
              </tr>
              <tr>
                <td className="border px-4 py-2">
                  <Checkbox
                    checked={this.state.checkbox[0]}
                    onChange={e => this.handleCheckboxChange(0)}
                  />
                </td>
                <td className="border px-4 py-2">
                  FLAT C ON 22ND FLOOR OF TOWER 3 THE HARBOURSIDE WEST KOWLOON
                </td>
                <td className="border px-4 py-2">Pruden</td>
                <td className="border px-4 py-2">
                  {this.renderCurrentValuer(0)}
                </td>
                <td className="border px-4 py-2">10,115,000</td>
                <td className="border px-4 py-2">25 DEC 2019</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">
                  <Checkbox
                    checked={this.state.checkbox[1]}
                    onChange={e => this.handleCheckboxChange(1)}
                  />
                </td>
                <td className="border px-4 py-2">
                  RESIDENTIAL PARKING SPACE NO. R036 NO. 388 CHATHAM ROAD
                  KOWLOON
                </td>
                <td className="border px-4 py-2">CBRE</td>
                <td className="border px-4 py-2">
                  {this.renderCurrentValuer(1)}
                </td>
                <td className="border px-4 py-2">6,650,000</td>
                <td className="border px-4 py-2">19 JAN 2019</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">
                  <Checkbox
                    checked={this.state.checkbox[2]}
                    onChange={e => this.handleCheckboxChange(2)}
                  />
                </td>
                <td className="border px-4 py-2">
                  Suite 1402, 14/F, Chinachem Tower, 34-37 Connaught Road
                  Central, Hong Kong
                </td>
                <td className="border px-4 py-2">RHL</td>
                <td className="border px-4 py-2">
                  {this.renderCurrentValuer(2)}
                </td>
                <td className="border px-4 py-2">20,310,000</td>
                <td className="border px-4 py-2">19 Jan 2020</td>
              </tr>
            </tbody>
          </table>
          <Button
            variant="contained"
            color="primary"
            disabled={!this.atLeastOneTrue()}
            onClick={this.handleDialogOpen}
          >
            Confirm
          </Button>

          <Dialog
            open={this.state.isModalOpen}
            onClose={this.handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Sending Monthly Valuation Request
            </DialogTitle>
            <DialogContent>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="YYYY/MMM/DD"
                margin="normal"
                id="date-picker-inline"
                label="Date of Valuation"
                value={this.state.dateOfValuation}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleSubmitRequest.bind(this)}
                color="primary"
                autoFocus
              >
                Send Request
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={this.state.showSnackbar}
            autoHideDuration={10000}
            onClose={this.handleSnackbarClose}
            message="Request sent!"
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={this.handleSnackbarClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
      </div>
    );
  }
}

const wrappedForm = reduxForm({
  form: "appForm",
})(MonthylValuationRequestForm);

export default connect(null, actions)(wrappedForm);
