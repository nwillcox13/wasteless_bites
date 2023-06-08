import React, { useState } from "react";
import ChrisRoldanImage from "./images/Chris Roldan.jpg";
import HarimWooImage from "./images/Harim Woo.png";
import NickWillcoxImage from "./images/Nick Willcox.jpg";
import RiverWalshImage from "./images/River Walsh.jpg";
import "./Faq.css";

// Define the team members and their details
const teamMembers = [
  {
    name: "Chris Roldan",
    image: ChrisRoldanImage,
    description:
      "Chris is a highly creative software engineer with a knack for problem-solving. His background in digital design fuels his passion for coding visually stunning and user-friendly applications.",
  },
  {
    name: "Harim Woo",
    image: HarimWooImage,
    description:
      "Harim brings a unique perspective to the team with his background in computer science and mathematics. He's known for his detail-oriented approach and exceptional ability to crack complex algorithms.",
  },
  {
    name: "Nick Willcox",
    image: NickWillcoxImage,
    description:
      "Nick is a versatile software engineer who loves a good challenge. His broad skill set ranges from front-end development to data analysis, making him a valuable asset to any team.",
  },
  {
    name: "River Walsh",
    image: RiverWalshImage,
    description:
      "River is a software engineer with a passion for clean, efficient code. He is always on the cutting edge of technology and is an advocate for open source and collaborative coding.",
  },
];

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Frequently Asked Questions</h1>

      <div className="accordion" id="faqAccordion">
        <div className="accordion-item">
          <h2
            className="accordion-header"
            id="faqHeading1"
            onClick={() => handleAccordionClick(0)}
          >
            <button
              className={`accordion-button ${
                activeIndex === 0 ? "" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse1"
              aria-expanded={activeIndex === 0 ? "true" : "false"}
              aria-controls="faqCollapse1"
            >
              What is Waste-less Bytes?
            </button>
          </h2>
          <div
            id="faqCollapse1"
            className={`accordion-collapse collapse ${
              activeIndex === 0 ? "show" : ""
            }`}
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
          <h2
            className="accordion-header"
            id="faqHeading2"
            onClick={() => handleAccordionClick(1)}
          >
            <button
              className={`accordion-button ${
                activeIndex === 1 ? "" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse2"
              aria-expanded={activeIndex === 1 ? "true" : "false"}
              aria-controls="faqCollapse2"
            >
              How can individuals and restaurants share surplus food?
            </button>
          </h2>
          <div
            id="faqCollapse2"
            className={`accordion-collapse collapse ${
              activeIndex === 1 ? "show" : ""
            }`}
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
          <h2
            className="accordion-header"
            id="faqHeading3"
            onClick={() => handleAccordionClick(2)}
          >
            <button
              className={`accordion-button ${
                activeIndex === 2 ? "" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse3"
              aria-expanded={activeIndex === 2 ? "true" : "false"}
              aria-controls="faqCollapse3"
            >
              Can charities request food donations?
            </button>
          </h2>
          <div
            id="faqCollapse3"
            className={`accordion-collapse collapse ${
              activeIndex === 2 ? "show" : ""
            }`}
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

        <div className="accordion-item">
          <h2
            className="accordion-header"
            id="faqHeading4"
            onClick={() => handleAccordionClick(3)}
          >
            <button
              className={`accordion-button ${
                activeIndex === 3 ? "" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse4"
              aria-expanded={activeIndex === 3 ? "true" : "false"}
              aria-controls="faqCollapse4"
            >
              What precautions should I take when meeting an unknown person from
              online?
            </button>
          </h2>
          <div
            id="faqCollapse4"
            className={`accordion-collapse collapse ${
              activeIndex === 3 ? "show" : ""
            }`}
            aria-labelledby="faqHeading4"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              When meeting an unknown person from online, it's important to
              prioritize your safety. Here are some precautions you should take:
              <ul>
                <li>
                  Arrange to meet in a well-lit, public place with plenty of
                  people around.
                </li>
                <li>
                  Let a trusted friend or family member know where you're going
                  and who you're meeting.
                </li>
                <li>
                  Consider bringing a friend along or scheduling the meeting
                  during daylight hours.
                </li>
                <li>
                  Trust your instincts and be prepared to leave if you feel
                  uncomfortable or unsafe.
                </li>
                <li>
                  Avoid sharing personal information too soon and maintain
                  privacy until you feel comfortable.
                </li>
                <li>
                  Use reliable communication channels and avoid sharing
                  sensitive details online.
                </li>
                <li>
                  Consider conducting a background check or verifying the
                  person's identity before meeting.
                </li>
                <li>
                  Remember, it's always okay to prioritize your safety and
                  cancel the meeting if you have any doubts.
                </li>
              </ul>
              By following these precautions, you can help ensure a safer
              experience when meeting someone from the online world.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2
            className="accordion-header"
            id="faqHeading5"
            onClick={() => handleAccordionClick(4)}
          >
            <button
              className={`accordion-button ${
                activeIndex === 4 ? "" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse5"
              aria-expanded={activeIndex === 4 ? "true" : "false"}
              aria-controls="faqCollapse5"
            >
              Are the images shown on the site accurate?
            </button>
          </h2>
          <div
            id="faqCollapse5"
            className={`accordion-collapse collapse ${
              activeIndex === 4 ? "show" : ""
            }`}
            aria-labelledby="faqHeading5"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Unfortunately, these images are generated by the item name and
              item type of the post and are not going to be accurate yet. But we
              are working diligently to add user-uploaded photos and hope to
              have it available to you soon!
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2
            className="accordion-header"
            id="faqHeading6"
            onClick={() => handleAccordionClick(5)}
          >
            <button
              className={`accordion-button ${
                activeIndex === 5 ? "" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#faqCollapse6"
              aria-expanded={activeIndex === 5 ? "true" : "false"}
              aria-controls="faqCollapse6"
            >
              Who are we?
            </button>
          </h2>
          <div
            id="faqCollapse6"
            className={`accordion-collapse collapse ${
              activeIndex === 5 ? "show" : ""
            }`}
            aria-labelledby="faqHeading6"
            data-bs-parent="#faqAccordion"
          >
            <div className="accordion-body">
              Just 4 handsome guys with great hair.
              <div className="team-members">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-member">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="team-member-image"
                    />
                    <div className="team-member-info">
                      <h3>{member.name}</h3>
                      <p>{member.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
