import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <article>
      <Outlet />
    </article>
  );
};

export default GuestLayout;
