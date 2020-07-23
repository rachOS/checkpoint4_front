import React from "react";
import TeamsInfos from "./TeamsInfos";
import UserInfoProfile from "./UserInfoProfile";
import "./userDashboard.css";

const UserDashboard = () => {
  return (
    <>
      <UserInfoProfile />
      <TeamsInfos />
    </>
  );
};

export default UserDashboard;
