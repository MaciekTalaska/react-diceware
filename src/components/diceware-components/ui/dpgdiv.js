import React from "react";
import s from "./dpgui.module.css";
import PropTypes from "prop-types";

function DpgDiv(props) {
  return <div className={s.div}>{props.children}</div>;
}

DpgDiv.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default DpgDiv;
