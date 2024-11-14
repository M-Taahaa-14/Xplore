import React, { useState } from 'react';

const Faqs = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can add the logic to submit the message
        setResponseMessage('Your query has been submitted!');
        setMessage(''); // Clear the input field
    };

    const faqs = [
        {
            question: "What is the cancellation policy?",
            answer: "You can cancel your booking up to 24 hours before the scheduled time for a full refund. Cancellations made within 24 hours will incur a 50% fee."
        },
        {
            question: "How can I make a booking?",
            answer: "You can make a booking directly through our website by selecting your desired tour, entering your details, and making a payment."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods including credit cards, debit cards, and PayPal."
        },
        {
            question: "Are there any group discounts?",
            answer: "Yes, we offer group discounts for parties of 10 or more. Please contact our support team for more details."
        },
        {
            question: "Can I modify my booking?",
            answer: "Yes, you can modify your booking up to 48 hours before the scheduled departure. Please contact our support team for assistance."
        },
        {
            question: "Is travel insurance included in the booking?",
            answer: "No, travel insurance is not included in the booking. We recommend purchasing travel insurance separately for added protection."
        },
        {
            question: "Can I bring my pet on the tour?",
            answer: "Pets are generally not allowed on our tours for safety and comfort reasons. However, service animals are permitted. Please contact us for specific inquiries."
        },
        {
            question: "What should I do if I have dietary restrictions?",
            answer: "If you have dietary restrictions, please inform us at the time of booking. We will do our best to accommodate your needs, but please note that we cannot guarantee special dietary requests."
        },
        {
            question: "Are there age restrictions for your tours?",
            answer: "Our tours are suitable for all ages, but some activities may have age restrictions. Please check the tour details or contact us for more information."
        },
        {
            question: "What should I bring on the tour?",
            answer: "We recommend bringing comfortable clothing, sunscreen, water, and any personal items you may need. Specific items required for each tour will be listed in the tour details."
        }
    ];

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <h2 style={styles.header}>Frequently Asked Questions</h2>
                <div className="accordion">
                    {faqs.map((faq, index) => (
                        <div key={index} style={styles.accordionItem}>
                            <div
                                style={styles.accordionHeader}
                                onClick={() => toggleAccordion(index)}
                            >
                                {faq.question}
                                <span style={{ float: 'right', marginLeft: '10px' }}>
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </div>
                            {activeIndex === index && (
                                <div style={styles.accordionBody}>
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div style={styles.feedbackForm}>
                    <h3 style={styles.header}>Send us your queries</h3>
                    {responseMessage && <p style={styles.responseMessage}>{responseMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label htmlFor="message" style={styles.label}>Message:</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={styles.textarea}
                            ></textarea>
                        </div>
                        <button type="submit" style={styles.button}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        backgroundImage: "url('images/t1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: '10px',
        backgroundColor: '#f4f4f4',
    },
    container: {
        width: '50%', // Half of the screen
        margin: '20px auto',
        padding: '20px',
        background: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    accordionItem: {
        borderTop: '1px solid #ddd',
    },
    accordionHeader: {
        backgroundColor: '#4CAF50',
        color: 'white',
        cursor: 'pointer',
        padding: '15px',
        textAlign: 'left',
        outline: 'none',
        fontSize: '18px',
        transition: 'background-color 0.3s',
    },
    accordionBody: {
        padding: '15px',
        backgroundColor: 'white',
        borderTop: '1px solid #ddd',
    },
    feedbackForm: {
        marginTop: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#333',
        fontFamily:'arial',
    },
    textarea: {
        width: '600px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        resize: 'horizontal',
        height: '100px',
    },
    button: {
        display: 'block',
        width: '100%',
        padding: '10px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    responseMessage: {
        color: 'green',
        textAlign: 'center',
    },
};
export default Faqs;
