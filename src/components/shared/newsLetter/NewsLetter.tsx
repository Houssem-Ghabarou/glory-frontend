"use client";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { handleNewsletterSubmit } from "../../../lib/api/newsletter";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    await handleNewsletterSubmit(
      email,
      () => setMessage("Merci pour votre inscription !"),
      (err) => setMessage(err)
    );
  };
  return (
    <div className="flex flex-col gap-4 items-center bg-black w-full py-15">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-10 py-2 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <EnvelopeIcon className="h-6 w-6 text-gray-500" />
          </span>
        </div>
        <button
          onClick={handleSubscribe}
          className="bg-white text-black w-80 h-10 px-4 py-2 rounded-full mt-2"
        >
          Subscribe To Newsletter
        </button>
        {message && <p className="texte-white">{message}</p>}
      </div>
    </div>
  );
};

export default NewsLetter;
