import { useState } from "react";
import NavBar from "../components/NavBar.component";
import SearchBar from "../components/SearchBar.component";
import { Outlet } from "react-router-dom";

function HomePage() {
  const [isshow, setIsShow] = useState(false);
  const getSwapState = (state: boolean) => {
    setIsShow(state);
  };
  return (
    <>
      <div>
        <NavBar getSwapState={getSwapState} />
        {isshow && <SearchBar />}
        <div className="min-h-screen">
            <Outlet/>
        </div>
      </div>
    </>
  );
}

export default HomePage;
