import { Route, Routes } from "react-router-dom";

//components
import Login from "../Components/Login/Login";
import SideNavbarLayout from "../Components/SideNavbar/SideNavbarLayout";
import SuggestionBox from "../Components/SuggestionBox/SuggestionBox";
import Dashboard from "../Components/Dashboard/Dashboard";
import Settings from "../Components/Settings/Settings";
import TeamMembers from '../Components/TeamMembers/TeamMembers';


const BaseRoutes = () => {
  return (
    <>
      <Routes mode="absolute">
        <Route path="/" element={<Login />} />
        <Route element={<SideNavbarLayout />}>
          <Route path='/home' element={<SuggestionBox />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/team-members' element={<TeamMembers />} />
        </Route>
      </Routes>
    </>
  );
};

export default BaseRoutes;