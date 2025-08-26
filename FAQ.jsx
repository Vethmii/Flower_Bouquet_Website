import React, { useState } from "react";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What types of flowers do you offer?",
      answer:
        "We offer a wide variety of fresh flowers including roses, lilies, carnations, chrysanthemums, orchids, and seasonal blooms. Our selection varies based on availability and season to ensure maximum freshness.",
    },
    {
      id: 2,
      question: "How far in advance should I place my order?",
      answer:
        "For regular orders, we recommend placing your order at least 24 hours in advance. For special occasions like Valentine's Day or Mother's Day, we suggest ordering 3-5 days ahead to ensure availability.",
    },
    {
      id: 3,
      question: "Do you offer same-day delivery?",
      answer:
        "Yes, we offer same-day delivery for orders placed before 2:00 PM, subject to availability. Additional charges may apply for same-day delivery service.",
    },
    {
      id: 4,
      question: "What areas do you deliver to?",
      answer:
        "We deliver throughout Colombo and surrounding areas including Nugegoda, Maharagama, Kotte, Battaramulla, and nearby suburbs. Contact us to confirm delivery to your specific location.",
    },
    {
      id: 5,
      question: "How long do your flowers last?",
      answer:
        "With proper care, our fresh flowers typically last 5-7 days. We provide care instructions with each delivery to help you maximize the lifespan of your bouquet.",
    },
    {
      id: 6,
      question: "Can I customize my bouquet?",
      answer:
        "Absolutely! We love creating custom arrangements. Use our 'Customize Orders' page to specify your preferences for flowers, colors, wrapping style, and occasion.",
    },
    {
      id: 7,
      question: "What payment methods do you accept?",
      answer:
        "We accept cash on delivery, bank transfers, and mobile payment methods. For online orders, payment details will be confirmed when we contact you.",
    },
    {
      id: 8,
      question: "Do you offer corporate services?",
      answer:
        "Yes, we provide flower arrangements for corporate events, office decorations, and business gifts. Contact us for bulk orders and corporate pricing.",
    },
    {
      id: 9,
      question: "What if I'm not satisfied with my order?",
      answer:
        "Customer satisfaction is our priority. If you're not completely satisfied with your order, please contact us within 24 hours and we'll work to resolve the issue.",
    },
    {
      id: 10,
      question: "Do you provide flowers for weddings and events?",
      answer:
        "Yes, we offer comprehensive floral services for weddings and special events including bridal bouquets, centerpieces, and venue decorations. Please contact us for event consultation.",
    },
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="relative h-80 rounded-lg overflow-hidden mb-6">
          <img
            src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=320&fit=crop"
            alt="FAQ"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-white text-center">
              <h1 className="text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl">
                Find answers to common questions about our services
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Common Questions
          </h2>
          <div className="space-y-4">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-pink-50
                  focus:outline-none focus:bg-pink-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-pink-600 transform transition-transform ${
                      openItem === item.id ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openItem === item.id && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-pink-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our friendly team is here
            to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/94771234567"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white
              rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.051 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.869 9.869 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z" />
              </svg>
              WhatsApp Us
            </a>
            <button
              className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700
              transition-colors"
            >
              Call Us: +94 77 123 4567
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
