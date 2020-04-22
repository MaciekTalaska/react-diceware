import React from "react";
import s from "./dpgui.module.css";
import PropTypes from "prop-types";

function DpgButton(props) {
  return (
    <button className={s.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

DpgButton.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
};

export default DpgButton;
