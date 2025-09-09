import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How can I place an order?",
      answer: "You can browse our bouquets and add them to your cart, then proceed to checkout."
    },
    {
      question: "Do you offer same-day delivery?",
      answer: "Yes, we offer same-day delivery for orders placed before 2 PM within Colombo."
    },
    {
      question: "Can I customize a bouquet?",
      answer: "Absolutely! Visit our 'Customize Orders' page to submit your special request."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept cash on delivery, credit/debit cards, and online payments."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can call us at 📞 +94 722912965 or send us a message via our contact form."
    }
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Frequently Asked Questions</h1>
      <div style={{ marginTop: "20px" }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: "15px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
