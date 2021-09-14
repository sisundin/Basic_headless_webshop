import React from "react";
import { withRouter } from "react-router-dom";

const Back = ({ history }) => (
  <p className = "backbutton" onClick={history.goBack}><i className="fas fa-caret-left"></i> BACK</p>
);

export default withRouter(Back);
