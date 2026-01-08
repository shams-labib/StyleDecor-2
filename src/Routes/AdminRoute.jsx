import React from "react";
import useAuth from "../Hooks/useAuth";
import UseRole from "../Hooks/useRole";
import ErrorPage from "../Pages/Error/Error";
import Loading from "../Pages/Loader/Loading";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { roleLoading, role } = UseRole();
  if (loading || roleLoading) {
    return <Loading></Loading>;
  }
  if (role !== "admin") {
    return <ErrorPage></ErrorPage>;
  }

  return children;
};

export default AdminRoute;
