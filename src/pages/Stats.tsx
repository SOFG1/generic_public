import React from "react";
import { GraphicsView, MapAndStatusView, StatsView } from "../views/StatsViews";
import { usePermissions } from "../store/user/hooks";

const Stats = React.memo(() => {

  const permissions = usePermissions("SM_stats");


  return (
    <div id="stats-page">
      <StatsView />
      {!permissions["posts"] ? null : <GraphicsView />}
      <MapAndStatusView />
    </div>
  );
});

export default Stats;
