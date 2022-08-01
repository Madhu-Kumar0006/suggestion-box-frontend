import React, {Fragment} from 'react';
import {Outlet} from 'react-router-dom';
import SideNavbar from './SideNavbar';

function SideNavbarLayout() {
  return (
    <Fragment>
      <SideNavbar />
      <Outlet />
    </Fragment>
  );
}

export default SideNavbarLayout
