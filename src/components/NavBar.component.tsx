import { useState } from "react";
import {
  FiBell,
  FiSettings,
  FiUser,
  FiAlignJustify,
  FiSearch,
  FiX,
  FiLogOut,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
function NavBar({ getSwapState }: any) {
  const [swapState, setSwapState] = useState(true);
  return (
    <div className="relative">
      <nav className="text-xl text-yellow-300 font-extrabold bg-black  p-4 w-full flex items-center justify-between">
        <NavLink to={"/"}>
          <span className="cursor-pointer">LOGO</span>
        </NavLink>
        <div>
          <div className="dropdown mr-16 md:mr-96">
            <span className="cursor-pointer">
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  checked={swapState}
                  onChange={() => {
                    setSwapState(!swapState);
                    getSwapState(swapState);
                  }}
                />

                <FiSearch className="swap-on scale-[150%]" />
                <FiX className="swap-off scale-[150%]" />
              </label>
            </span>
          </div>
          <div className="dropdown">
            <span className="cursor-pointer" role="button" tabIndex={0}>
              <FiAlignJustify className="scale-[200%]" />
            </span>
            <ul
              className="absolute bg-black p-3 rounded-md space-y-2 top-12 -right-3 font-normal dropdown-content z-10"
              tabIndex={0}
            >
              <li>
                {/* <NavLink to={"/wishlist"}>
                  <span className="inline-flex items-center space-x-2">
                    <FiHeart />
                    <div>Wishlist</div>
                  </span>
                </NavLink> */}
              </li>
              <li>
                <NavLink to={"/notifications"}>
                  <span className="inline-flex items-center space-x-2">
                    <FiBell />
                    <div>Notifications</div>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/settings"}>
                  <span className="inline-flex items-center space-x-2">
                    <FiSettings />
                    <div>Settings</div>
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>
                  <span className="inline-flex items-center space-x-2">
                    <FiUser />
                    <div>Profile</div>
                  </span>
                </NavLink>
              </li>
              <li>
                <span className="inline-flex items-center space-x-2">
                  <FiLogOut />
                  <div>Logout</div>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
