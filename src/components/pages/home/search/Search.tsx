import SearchInput from "@/components/shared/SearchInput";
import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col items-start w-full gap-4">
      {/* Changed flex-start to items-start */}
      <div className="flex flex-col space-y-1 items-start">
        <button className="text-lg font-[400] hover:underline">MEN</button>
        <button className="text-lg font-[400] hover:underline">WOMEN</button>
        <button className="text-lg font-[400] hover:underline">KIDS</button>
      </div>
      <div className="w-full max-w-[400px] lg:max-w-[500px]">
        <SearchInput />
      </div>
    </div>
  );
};

export default Search;
