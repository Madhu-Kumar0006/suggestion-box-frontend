import React, {Fragment} from 'react';
import {Outlet} from 'react-router-dom';
import SideNavbar from './SideNavbar';

function SideNavbarLayout() {
  return (
    <Fragment>
      <Outlet />
      <SideNavbar />
    </Fragment>
  )
}

export default SideNavbarLayout
