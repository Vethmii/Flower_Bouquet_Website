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
      answer: "You can call us at 📞 123-456-7890 or send us a message via our contact form."
    }
  ];

  return (
    <div style={{
       maxWidth: "1000px", 
       margin: "40px auto",backgroundColor: "#fbe4f8",borderRadius: "15px",  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", display: "flex", alignItems: "center", gap: "30px" ,
      padding: "20px",}}>
      
      <div style={{ flex: 1, padding: "20px" }}> {/* Takes up available space */}
        <h1 style={{ color: "#8a2be2", marginBottom: "15px", fontSize: "2.5em" }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: "#4b0082", fontSize: "1.1em", marginBottom: "30px" }}>
          Quick answers to your most common questions. If you can't find what you're looking for, feel free to contact us!
        </p>
        <div style={{ marginTop: "20px" }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ marginBottom: "15px", paddingBottom: "10px" }}>
              <h3 style={{ color: "#9932cc", marginBottom: "5px" }}>{faq.question}</h3>
              <p style={{ color: "#6a5acd" }}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      </div>
      
  );
};

export default FAQ;
