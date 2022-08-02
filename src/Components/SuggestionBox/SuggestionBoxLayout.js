import { Outlet } from "react-router-dom";
import { Fragment } from "react";

const SuggestionBoxLayout = (props) => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export default SuggestionBoxLayout;
