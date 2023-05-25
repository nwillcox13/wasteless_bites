import React from "react";

const FAQPage = () => {
return (
<div className="container py-4">
    <h1 className="mb-4">Frequently Asked Questions</h1>

    <div className="accordion" id="faqAccordion">
    <div className="accordion-item">
        <h2 className="accordion-header" id="faqHeading1">
        <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse1"
            aria-expanded="false"
            aria-controls="faqCollapse1"
        >
            What is Waste-less Bytes?
        </button>
        </h2>
        <div
        id="faqCollapse1"
        className="accordion-collapse collapse"
        aria-labelledby="faqHeading1"
        data-bs-parent="#faqAccordion"
        >
        <div className="accordion-body">
            Waste-less Bytes is a platform dedicated to reducing food waste
            and improving access to food for those in need. We connect
            individuals, restaurants, and charities to foster a
            community-driven approach in minimizing food waste. Our platform
            provides a convenient and free solution for sharing surplus food
            between individuals and restaurants, benefiting those who can make
            use of it. Charities can also request food donations from
            restaurants for their events. Join us in the fight against food
            waste and be part of a world where everyone has access to quality
            food.
        </div>
        </div>
    </div>

    <div className="accordion-item">
        <h2 className="accordion-header" id="faqHeading2">
        <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse2"
            aria-expanded="false"
            aria-controls="faqCollapse2"
        >
            How can individuals and restaurants share surplus food?
        </button>
        </h2>
        <div
        id="faqCollapse2"
        className="accordion-collapse collapse"
        aria-labelledby="faqHeading2"
        data-bs-parent="#faqAccordion"
        >
        <div className="accordion-body">
            Waste-less Bytes provides a convenient and free solution for
            individuals and restaurants to share surplus food. Individuals can
            create listings specifying the type of food available, quantity,
            and pickup/delivery details. Restaurants can also list their
            surplus food and connect with individuals who can benefit from it.
            The platform facilitates the communication and coordination
            necessary to minimize food waste and ensure that surplus food is
            utilized effectively.
        </div>
        </div>
    </div>

    <div className="accordion-item">
        <h2 className="accordion-header" id="faqHeading3">
        <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#faqCollapse3"
            aria-expanded="false"
            aria-controls="faqCollapse3"
        >
            Can charities request food donations?
        </button>
        </h2>
        <div
        id="faqCollapse3"
        className="accordion-collapse collapse"
        aria-labelledby="faqHeading3"
        data-bs-parent="#faqAccordion"
        >
        <div className="accordion-body">
            Yes, charities can request food donations from restaurants through
            Waste-less Bytes. Charities hosting events or in need of food for
            their programs can submit requests for specific food items or
            general donations. Restaurants can review these requests and
            choose to donate food to support charitable initiatives.
            Waste-less Bytes aims to bridge the gap between restaurants and
            charities, ensuring that surplus food is utilized to benefit those
            in need.
        </div>
        </div>
    </div>
    </div>
</div>
);
};

export default FAQPage;
