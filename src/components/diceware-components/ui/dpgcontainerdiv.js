import React from "react";
import s from "./dpgui.module.css";
import PropTypes from "prop-types";

function DpgContainerDiv(props) {
  return <div className={s.container}>{props.children}</div>;
}

DpgContainerDiv.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

export default DpgContainerDiv;
