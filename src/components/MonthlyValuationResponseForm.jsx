import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
function createData(
  rowNum,
  address,
  op,
  grossArea,
  salesableArea,
  valuation,
  refNum
) {
  return { rowNum, address, op, grossArea, salesableArea, valuation, refNum };
}

const ResponseForm = () => {
  const [isReviewing, setIsReviewing] = React.useState(false);
  const [valuation, setValaution] = React.useState({
    valuation0: "",
    valuation1: "",
  });
  const [reference, setReference] = React.useState({
    ref0: "",
    ref1: "",
  });
  const rows = [
    createData(
      0,
      "FLAT C ON 22ND FLOOR OF TOWER 3 THE HARBOURSIDE WEST KOWLOON",
      2010,
      1153,
      899,
      valuation.valuation0,
      reference.ref0
    ),
    createData(
      1,
      "RESIDENTIAL PARKING SPACE NO. R036 NO. 388 CHATHAM ROAD KOWLOON",
      "-",
      391,
      "-",
      valuation.valuation1,
      reference.ref1
    ),
  ];
  function handleReview() {
    setIsReviewing(!isReviewing);
    console.log(`now the state is ${isReviewing}`);
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleValuationChange(event) {
    console.log(event);
    setValaution({ ...valuation, [event.target.name]: event.target.value });
  }
  function handleRefChange(event) {
    setReference({
      ...reference,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }
  function renderValuationInput(RowNum) {
    return (
      <TextField
        id={"valuation" + RowNum}
        name={"valuation" + RowNum}
        label="Valuation Amount"
        onChange={handleValuationChange}
        value={valuation["valuation" + RowNum]}
        variant="filled"
      />
    );
  }
  function handleSubmit() {
    console.log("submit");
    handleClickOpen();
  }
  function renderRefInput(RowNum) {
    return (
      <TextField
        id={"ref" + RowNum}
        onChange={handleRefChange}
        name={"ref" + RowNum}
        label="Reference Number"
        value={reference["ref" + RowNum]}
        variant="filled"
      />
    );
  }
  return (
    <div className="flex items-center justify-center">
      <div>
        <h1 className="text-4xl">
          {!isReviewing
            ? "Monthly Valuation as at 2020 MAR 3 Request"
            : "The follwing preliminary valuation will be submitted to Speedy Finance Limited"}
        </h1>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Property Address</TableCell>
                <TableCell align="right">OP</TableCell>
                <TableCell align="right">Fross Area</TableCell>
                <TableCell align="right">Saleable Area</TableCell>
                <TableCell align="right">Valuation(HK$)</TableCell>
                <TableCell align="right">Ref No.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.rowNum}>
                  <TableCell>{row.address}</TableCell>
                  <TableCell align="right">{row.op}</TableCell>
                  <TableCell align="right">{row.grossArea}</TableCell>
                  <TableCell align="right">{row.salesableArea}</TableCell>
                  <TableCell align="right">
                    {!isReviewing
                      ? renderValuationInput(row.rowNum)
                      : row.valuation}
                  </TableCell>
                  <TableCell align="right">
                    {!isReviewing ? renderRefInput(row.rowNum) : row.refNum}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={!isReviewing ? handleReview : handleSubmit}
        >
          {!isReviewing ? "Review" : "Submit"}
        </Button>
        {isReviewing ? (
          <Button variant="contained" onClick={handleReview}>
            Go back
          </Button>
        ) : null}

        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Acknowledgement"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              2 preliminary valuation have been submitted to Speedy Finance
              Limited.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ResponseForm;
