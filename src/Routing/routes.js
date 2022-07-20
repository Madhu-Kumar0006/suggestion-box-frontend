import { Route, Routes } from "react-router-dom";

//components
import Login from "../Components/Login/Login";


const BaseRoutes = () => {
  return (
    <>
      <Routes mode="absolute">
        <Route path="/" element={<Login />} />
        
      </Routes>
    </>
  );
};

export default BaseRoutes;