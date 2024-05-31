import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <article>
      <Outlet />
    </article>
  );
};

export default UserLayout;
