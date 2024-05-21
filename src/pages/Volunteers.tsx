import React, { useEffect } from "react";
import { useVolunteersActions } from "../store/volunteers/hooks";
import {
  AssignActivityView,
  CreateActivityView,
  VolunteersHeadingView,
  VolunteersTable,
} from "../views/VolunteersViews";
import VolunteersFiltersView from "../views/VolunteersViews/VolunteersFiltersView";

const Volunteers = () => {
  const { onGetStaticData } = useVolunteersActions();
  useEffect(() => {
    onGetStaticData();
  }, []);

  return (
    <>
      <VolunteersHeadingView />
      <CreateActivityView />
      <AssignActivityView />
      <VolunteersFiltersView />
      <VolunteersTable />
    </>
  );
}

export default Volunteers;
