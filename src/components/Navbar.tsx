import { NavLink } from "react-router-dom";

const navLinks = [
  {
    id: 1,
    to: "/",
    value: "Home",
  },
  {
    id: 2,
    to: "/user",
    value: "User",
  },
];

const Navbar = () => {
  return (
    <header className="w-full bg-slate-600 text-white">
      <nav className="max-w-screen-2xl mx-auto p-6 flex justify-between items-center">
        <div className="text-xl font-bold">React Redux API</div>
        <div className="flex gap-6">
          {navLinks.map((nav) => {
            return (
              <NavLink
                key={nav.id}
                to={nav.to}
                className={({ isActive }) =>
                  isActive ? "underline text-blue-300" : "hover:underline"
                }
              >
                {nav.value}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
