import { usePermissions } from "../store/user";
import { GraphView } from "../views/RelationsViews";

const Relations = () => {
  const permissions = usePermissions("connections");

  return (
    <>
    {permissions.Read && <GraphView />}      
    </>
  );
};

export default Relations;
