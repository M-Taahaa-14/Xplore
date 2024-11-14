import React from 'react';
import './aboutus.css';

const teamMembers = [
    {
        name: "Muhammad Taahaa",
        image: "/images/f2.jpeg",
        quote: "Your guide to unforgettable journeys. Muhammad blends cultural insights with travel expertise, ensuring every traveler enjoys a rich, immersive experience."
    },
    {
        name: "Ali Abbas",
        image: "/images/ali.jpg",
        quote: "Bringing dreams to destinations. With a knack for turning travel dreams into reality, Ali focuses on creating bespoke experiences tailored to individual preferences."
    },
    {
        name: "Fahad Jamil",
        image: "/images/fahad.jpeg",
        quote: "Crafting memories, creating experiences. Fahad's meticulous planning and attention to detail guarantee that each trip is a seamless and enjoyable adventure."
    },
    {
        name: "Momin Shahzad",
        image: "/images/momin.jpg",
        quote: "Tries to be funny, but isn't. Momin is dedicated to making every moment forgettable."
    },
    {
        name: "Faiza Fatima",
        image: "/images/faiza.jpg",
        quote: "Navigating the globe with passion. Faiza combines her love for travel with extensive knowledge, offering unique and personalized itineraries for every explorer."
    }
];

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <h1>Our Team</h1>
            <p className="intro-text">Xplore is dedicated to providing the best hiking tours and travel experiences. Our expert guides and 24/7 customer support ensure your adventure is safe, enjoyable, and unforgettable.</p>
            <div className="team-grid">
                {teamMembers.map((member, index) => (
                    <div className="team-card" key={index}>
                        <img src={member.image} className="team-image" alt={`Profile of ${member.name}`} />
                        <h2>{member.name}</h2>
                        <blockquote>{member.quote}</blockquote>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutUs;



//==============================================================================================
//==============================================================================================
//==============================================================================================
// import React from 'react';
// import './aboutus.css';

// const teamMembers = [
//     {
//         name: "Momin Shahzad",
//         image: "images/f1.jpeg",
//         quote: "Tries to be funny, but isn't. Momin is dedicated to making every moment forgettable."
//     },
//     {
//         name: "Muhammad Taahaa",
//         image: "/images/f2.jpeg",
//         quote: "Your guide to unforgettable journeys. Muhammad blends cultural insights with travel expertise, ensuring every traveler enjoys a rich, immersive experience."
//     },
//     {
//         name: "Fahad Jamil",
//         image: "/images/f3.jpeg",
//         quote: "Crafting memories, creating experiences. Fahad's meticulous planning and attention to detail guarantee that each trip is a seamless and enjoyable adventure."
//     },
//     {
//         name: "Haris Usman",
//         image: "/images/f4.jpeg",
//         quote: "Navigating the globe with passion. Haris combines his love for travel with extensive knowledge, offering unique and personalized itineraries for every explorer."
//     },
//     {
//         name: "Muhammad Arshad",
//         image: "/images/f5.jpeg",
//         quote: "Bringing dreams to destinations. With a knack for turning travel dreams into reality, Muhammad focuses on creating bespoke experiences tailored to individual preferences."
//     },
//     {
//         name: "Sahal Sohail",
//         image: "/images/f6.jpeg",
//         quote: "Discovering wonders, sharing smiles. Sahal's enthusiasm for uncovering new places and cultures makes every tour exciting and filled with joy."
//     }
// ];

// const AboutUs = () => {
//     return (
//         <div>
//             <header>
//                 <nav>
//                     <ul>
//                         <li><a href="Home">Home</a></li>
//                         <li><a href="tours">Tours</a></li>
//                         <li><a href="Trek">Treks</a></li>
//                         <li><a href="Faqs">FAQs</a></li>
//                         <li><a href="UserProfile">Profile</a></li>
//                         <li><a href="AboutUs" className="active">About Us</a></li>
//                     </ul>
//                 </nav>
//             </header>
//             <section className="Chefs">
//                 <div className="container">
//                     <h1>Our Team</h1>
//                     <p className="text-center">Gill Hikes is dedicated to providing the best hiking tours and travel experiences. Our expert guides and 24/7 customer support ensure your adventure is safe, enjoyable, and unforgettable.<br /></p>
//                     <p className="text-center">"Discover the world's beauty through our eyes."<br /><br /></p>
//                     <div className="row">
//                         {teamMembers.map((member, index) => (
//                             <div className="col-md-4 text-center" key={index}>
//                                 <div className="profile">
//                                     <img src={member.image} className="user" alt={`Profile of ${member.name}`} />
//                                     {/* <img src="/images/f1.jpeg" className="user" alt="Test Image" /> */}

//                                     <h2>{member.name}</h2>
//                                     <blockquote>{member.quote}</blockquote>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//             <footer>
//                 <p>&copy; 2024 Xplore. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// };

// export default AboutUs;
