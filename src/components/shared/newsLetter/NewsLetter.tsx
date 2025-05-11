const NewsLetter = () => {
  return (
    <div className="flex flex-col gap-4 items-center bg-black  px-30 py-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-white text-2xl text-center whitespace-nowrap">
          STAY UPDATED
        </h1>
        <p className="text-white text-xs text-center whitespace-nowrap">
          JOIN OUR NEWSLETTER
        </p>
      </div>
      <div className="flex flex-col items-center  gap-2 ">
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-80 h-10 px-4 py-2 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button className="bg-white text-black w-80 h-10 px-4 py-2 rounded-full mt-2">
          Subscribe To Newsletter
        </button>
      </div>
    </div>
  );
};
export default NewsLetter;
