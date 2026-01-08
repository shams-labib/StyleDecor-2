import React from "react";
import UseRole from "../../Hooks/useRole";
import Loading from "../Loader/Loading";
import AdminDashboardHome from "../Dashboard/Admin/AdminDashboardHome/AdminDashboardHome";
import Todayshedule from "../DecoratorPage/Todayshedule/Todayshedule";
import ProfileCard from "../Profile/Profile";

const DashboardHome = () => {
  const { role, roleLoading } = UseRole();

  if (roleLoading) {
    return <Loading></Loading>;
  }

  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "rider") {
    return <Todayshedule></Todayshedule>;
  } else {
    return <ProfileCard></ProfileCard>;
  }
};

export default DashboardHome;
