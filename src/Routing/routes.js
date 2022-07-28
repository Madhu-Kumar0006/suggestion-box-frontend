import { Route, Routes } from "react-router-dom";

//components
import Login from "../Components/Login/Login";
import SidePanel from "../Components/SidePanel/SidePanel";
import SuggestionBox from "../Components/SuggestionBox/SuggestionBox";
import Dashboard from "../Components/Dashboard/Dashboard";
import Settings from "../Components/Settings/Settings";
import TeamMembers from '../Components/TeamMembers/TeamMembers';


const BaseRoutes = () => {
  return (
    <>
      <Routes mode="absolute">
        <Route path="/" element={<Login />} />
        <Route element={<SidePanel />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/suggestion-box' element={<SuggestionBox />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/team-members' element={<TeamMembers />} />
        </Route>
      </Routes>
    </>
  );
};

export default BaseRoutes;
