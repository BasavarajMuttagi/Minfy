import { FiSearch } from "react-icons/fi";

function SearchBar() {
  return (
    <div
      className="flex space-x-2   dropdown-content  justify-center mt-1 font-extrabold absolute z-50 w-full"
      tabIndex={0}
    >
      <input
        type="text"
        placeholder="Search Something"
        className="rounded-sm  bg-black p-2 w-[75%] text-yellow-300"
      />
      <button
        onClick={() => alert("Search")}
        className="p-4 bg-yellow-300 rounded-sm"
      >
        <FiSearch className="scale-[140%]" />
      </button>
    </div>
  );
}

export default SearchBar;
