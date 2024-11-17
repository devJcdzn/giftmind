"use client";

import { useState } from "react";

export const Accordion = ({
  data,
}: {
  data: { question: string; answer: string };
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left"
      >
        <span className="text-lg font-semibold text-text">{data.question}</span>
        <span className="text-2xl text-gray-400">+</span>
      </button>
      <div className="text-sm text-text">
        {isOpen && <p className="mt-2 text-sm text-text">{data.answer}</p>}
      </div>
    </div>
  );
};
