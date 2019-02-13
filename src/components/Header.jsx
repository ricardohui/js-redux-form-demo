import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <span>
        <Link to="/apply">Apply Loan</Link>
      </span>
      <span>, </span>
      <span>
        <Link to="/applications">View Existing Loan Applications</Link>
      </span>
    </div>
  );
};
export default Header;
