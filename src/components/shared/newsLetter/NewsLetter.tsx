import { EnvelopeIcon } from "@heroicons/react/24/outline";

const NewsLetter = () => {
  return (
    <div className="flex flex-col gap-4 items-center bg-black  px-30 py-10">
      <div className="flex flex-col items-center gap-2">
        <div className="text-white text-2xl text-center whitespace-nowrap">
          STAY UPDATED
        </div>
        <p className="text-white text-xs text-center whitespace-nowrap">
          JOIN OUR NEWSLETTER
        </p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-80">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full h-10 px-10 py-2 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <EnvelopeIcon className="h-6 w-6 text-gray-500" />
          </span>
        </div>
        <button className="bg-white text-black w-80 h-10 px-4 py-2 rounded-full mt-2">
          Subscribe To Newsletter
        </button>
      </div>
    </div>
  );
};
export default NewsLetter;
