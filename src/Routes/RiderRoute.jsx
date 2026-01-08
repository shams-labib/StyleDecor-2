import React from "react";
import useAuth from "../Hooks/useAuth";
import UseRole from "../Hooks/useRole";
import Loading from "../Pages/Loader/Loading";
import ErrorPage from "../Pages/Error/Error";

const DecoratorRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = UseRole();
  if (loading || !user || roleLoading) {
    return <Loading></Loading>;
  }
  if (role !== "decorator") {
    return <ErrorPage></ErrorPage>;
  }

  return children;
};

export default DecoratorRoute;
