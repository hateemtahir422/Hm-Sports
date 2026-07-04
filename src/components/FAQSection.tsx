import { useState } from "react";
import { FAQS } from "../data";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`bg-pitchgreen-light/20 border ${
              isOpen ? "border-limeaccent/40 bg-pitchgreen-light/30" : "border-pitchgreen-light/40"
            } rounded-2xl overflow-hidden transition-all duration-300`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-5 sm:px-6 py-5 text-left text-white focus:outline-none cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="font-display font-bold text-base sm:text-lg tracking-tight pr-4 flex items-start">
                <HelpCircle className="h-5 w-5 text-limeaccent mr-3 flex-shrink-0 mt-0.5" />
                <span>{faq.question}</span>
              </span>
              <span className="bg-pitchgreen p-1.5 rounded-lg border border-pitchgreen-light/30 text-limeaccent transition-transform duration-300">
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </span>
            </button>

            {/* Answer Accordion Dropdown panel */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-80 border-t border-pitchgreen-light/20" : "max-h-0"
              } overflow-hidden`}
            >
              <div className="px-5 sm:px-6 py-5 text-gray-300 font-sans text-sm leading-relaxed bg-pitchgreen-dark/40">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
