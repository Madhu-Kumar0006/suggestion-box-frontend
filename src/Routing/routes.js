import { Route, Routes } from "react-router-dom";

//components
import Login from "../Components/Login/Login";
import SidePanel from "../Components/SidePanel/SidePanel";
import SuggestionBox from "../Components/SuggestionBox/SuggestionBox";
import SuggestionBoxLayout from "../Components/SuggestionBox/SuggestionBoxLayout";
import Dashboard from "../Components/Dashboard/Dashboard";
import Settings from "../Components/Settings/Settings";
import User from "../Components/User/User";
import Suggestions from "../Components/Suggestions/Suggestions";
import Registration from '../Components/Registration/Registration';
import ResetPassword from "../Components/ResetPassword/ResetPassword";
import TeamMembers from "../Components/TeamMembers/TeamMembers";

const BaseRoutes = () => {
  return (
    <>
      <Routes mode="absolute">
        <Route path='/register' element={<Registration />} />
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<SidePanel />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/team-members' element={<TeamMembers/>} />
          <Route path='/suggestion-box' element={<SuggestionBoxLayout />}>
            <Route path='suggestions/:id' element={<Suggestions />} />
            <Route index element={<SuggestionBox />} />
          </Route>
          <Route path='/settings' element={<Settings />} />
        </Route>
        <Route path="/response/:token" element={< User/>} />
      </Routes>
    </>
  );
};

export default BaseRoutes;
