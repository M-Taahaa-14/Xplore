import React, { useState } from 'react';
import './TourGuide.css';

const TourGuide = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [currentGuide, setCurrentGuide] = useState(0); // State to track which guide is being viewed

  const reviews = [
    "The guide was amazing, very knowledgeable about the northern regions of Pakistan!",
    "Excellent experience, highly recommended for any traveler exploring the mountains.",
    "A fantastic tour! The guide made the trip to Hunza unforgettable.",
    "Great guide! Friendly, informative, and fun, especially when trekking through the valleys.",
  ];

  const guides = [
    {
      name: "John Doe",
      age: 30,
      rating: 4.9,
      image: "https://via.placeholder.com/150",
      tours: [
        {
          name: "Hunza Valley Trekking",
          price: "$300",
          details: "Explore the stunning Hunza Valley with its beautiful landscapes, trekking through mountain passes and visiting historical sites.",
        },
        {
          name: "Karimabad Cultural Tour",
          price: "$250",
          details: "Dive into the culture of Karimabad, visit Altit Fort, Baltit Fort, and learn about the heritage of the Hunza people.",
        },
      ],
    },
    {
      name: "Jane Smith",
      age: 28,
      rating: 4.8,
      image: "https://via.placeholder.com/150",
      tours: [
        {
          name: "Swat Valley Exploration",
          price: "$220",
          details: "A scenic journey through the breathtaking Swat Valley, exploring ancient Buddhist archaeological sites and beautiful valleys.",
        },
        {
          name: "Malam Jabba Skiing",
          price: "$180",
          details: "Enjoy skiing in Malam Jabba, the premier skiing resort in Pakistan, with stunning views of the surrounding peaks.",
        },
      ],
    },
    {
      name: "Alice Johnson",
      age: 35,
      rating: 4.7,
      image: "https://via.placeholder.com/150",
      tours: [
        {
          name: "Fairy Meadows Adventure",
          price: "$350",
          details: "Stay at Fairy Meadows, surrounded by the majestic Nanga Parbat, and hike in one of the most scenic areas in the world.",
        },
        {
          name: "Rafting in Gilgit River",
          price: "$150",
          details: "Experience the thrill of rafting in the fast-moving waters of the Gilgit River, surrounded by towering mountains.",
        },
      ],
    },
    {
      name: "Mark Lee",
      age: 40,
      rating: 5.0,
      image: "https://via.placeholder.com/150",
      tours: [
        {
          name: "Skardu and Deosai National Park",
          price: "$280",
          details: "Explore the majestic Skardu valley and venture into Deosai National Park, one of the highest plateaus in the world, known for its unique wildlife and stunning views.",
        },
        {
          name: "Shangrila Resort Tour",
          price: "$220",
          details: "Visit the famous Shangrila Resort, also known as 'Heaven on Earth', located near Skardu with its breathtaking views of Upper Kachura Lake.",
        },
      ],
    },
    {
      name: "Emily Davis",
      age: 32,
      rating: 4.6,
      image: "https://via.placeholder.com/150",
      tours: [
        {
          name: "Murree Hills Tour",
          price: "$180",
          details: "Enjoy a peaceful escape in the scenic Murree Hills, known for its pine forests, panoramic views, and cool climate.",
        },
        {
          name: "Naltar Valley Skiing and Trekking",
          price: "$210",
          details: "Take part in skiing or trekking in Naltar Valley, famous for its lush green meadows, crystal-clear lakes, and snowy peaks.",
        },
      ],
    },
  ];

  const nextReview = () => {
    if (currentReview < reviews.length - 1) {
      setCurrentReview(currentReview + 1);
    } else {
      setCurrentReview(0); // Loop back to the first review
    }
  };

  const prevReview = () => {
    if (currentReview > 0) {
      setCurrentReview(currentReview - 1);
    } else {
      setCurrentReview(reviews.length - 1); // Loop to the last review
    }
  };

  const nextGuide = () => {
    if (currentGuide < guides.length - 1) {
      setCurrentGuide(currentGuide + 1);
    } else {
      setCurrentGuide(0); // Loop back to the first guide
    }
  };

  const prevGuide = () => {
    if (currentGuide > 0) {
      setCurrentGuide(currentGuide - 1);
    } else {
      setCurrentGuide(guides.length - 1); // Loop to the last guide
    }
  };

  return (
    <div className="tour-guide-container">
      {/* Guide Selection Navigation */}
      <div className="guide-nav">
        <button className="arrow left" onClick={prevGuide}>
          &lt;
        </button>
        <h3>{guides[currentGuide].name}</h3>
        <button className="arrow right" onClick={nextGuide}>
          &gt;
        </button>
      </div>

      {/* Guide Info */}
      <div className="guide-info">
        <img src={guides[currentGuide].image} alt={guides[currentGuide].name} className="guide-image" />
        <div className="guide-details">
          <h2>{guides[currentGuide].name}</h2>
          <p>Age: {guides[currentGuide].age}</p>
          <p>Rating: {guides[currentGuide].rating} ⭐</p>
        </div>
      </div>

      {/* Reviews */}
      <div className="reviews-container">
        <div className="reviews">
          <button className="arrow left" onClick={prevReview}>
            &lt;
          </button>
          <div className="review">{reviews[currentReview]}</div>
          <button className="arrow right" onClick={nextReview}>
            &gt;
          </button>
        </div>
      </div>

      {/* Tour Packages */}
      <div className="pricing">
        <h3>Tour Packages:</h3>
        {guides[currentGuide].tours.map((tour, index) => (
          <div key={index} className="tour-package">
            <h4>{tour.name}</h4>
            <p>{tour.details}</p>
            <p className="price">{tour.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourGuide;
