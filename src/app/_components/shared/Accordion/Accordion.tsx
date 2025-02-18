/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiBook, FiChevronDown } from "react-icons/fi";

const Accordion = ({ children }: { children: React.ReactNode }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (accordionName: string) => {
    setOpenAccordion(openAccordion === accordionName ? null : accordionName);
  };

  return (
    <>
      <div className="w-full">
        {/* Recipe Accordion */}
        <div className="border-b border-gray-200">
          <div
            className="flex items-center justify-between text-base font-medium text-gray-600 hover:text-emerald-600 px-2 py-2 cursor-pointer"
            onClick={() => toggleAccordion("recipeManagement")}
          >
            <div className="flex items-center gap-2">
              <FiBook size={18} className="text-gray-500" />
              Recipe
            </div>
            {/* Animated Dropdown Icon */}
            <motion.div
              animate={{
                rotate: openAccordion === "recipeManagement" ? 180 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <FiChevronDown size={18} />
            </motion.div>
          </div>

          {openAccordion === "recipeManagement" && (
            <div className="bg-white pl-6">{children}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accordion;
