import React from 'react';
import './trek.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const Trek = () => {
    const treks = [
        {
            title: 'Chitta Katha Lake Trek (4100 meters)',
            duration: '5 Days, 4 Nights',
            price: 'From PKR 35000',
            image: 'images/chittalake.jpg',
            alt: 'Chitta Katha Lake Trek',
        },
        {
            title: 'Rakaposhi Base Camp Trek (3500 Meters)',
            duration: '8 Days, 7 Nights',
            price: 'From PKR 80000',
            image: 'images/rakaposhi.jpeg',
            alt: 'Rakaposhi Base Camp Trek',
        },
        {
            title: 'Haramosh Valley (Kutwal Lake) Trek (7409m)',
            duration: '5 Days, 4 Nights',
            price: 'From PKR 55000',
            image: 'images/kutwal.jpg',
            alt: 'Harmosh Valley',
        },
        {
            title: 'K2 Base Camp Trek',
            duration: '15 Days, 14 Nights',
            price: 'From PKR 80000',
            image: 'images/k2.jpeg',
            alt: 'K2 Base Camp',
        },
        {
            title: 'Ratti Gali Trek',
            duration: '3 Days, 2 Nights',
            price: 'From PKR 20000',
            image: 'images/ratti.jpeg',
            alt: 'Ratti Gali',
        },
        {
            title: 'Fairy Meadows',
            duration: '6 Days, 5 Nights',
            price: 'From PKR 40000',
            image: 'images/fairymeadows.jpeg',
            alt: 'Fairy Meadows',
        },
    ];

    const navigate = useNavigate();

    const handleBookNow = (trek) => {
        navigate('/booking', {
            state: { trekDetails: trek }, // Pass trek data via state
        });
    };

    return (
        <div>
            <main>
                <section className="heading">
                    <h1>Xplore Tour Guides</h1>
                </section>
                <section className="trek-cards">
                    {treks.map((trek, index) => (
                        <div className="card" key={index}>
                            <img src={trek.image} alt={trek.alt} />
                            <div className="card-content">
                                <h3>{trek.title}</h3>
                                <p>{trek.duration}</p>
                                <p>{`PKR ${trek.price}`}</p>
                            </div>
                            <div className="overlay">
                                <button className="book-now-btn" onClick={() => handleBookNow(trek)}>Book Now</button>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default Trek;
