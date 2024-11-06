import React, { useState, useEffect } from 'react';
import './ManageTours.css';

const ManageTours = () => {
    const [tours, setTours] = useState([
        {
            TourId: 1,
            TourName: 'Romantic Paris',
            DestinationName: 'Paris',
            Price: 1200,
            MaxTravellers: 10,
            StartDate: '2024-10-20',
            EndDate: '2024-10-25',
            Nights: 5,
            Days: 6,
        },
        {
            TourId: 2,
            TourName: 'Adventure in Tokyo',
            DestinationName: 'Tokyo',
            Price: 1800,
            MaxTravellers: 8,
            StartDate: '2024-11-01',
            EndDate: '2024-11-07',
            Nights: 6,
            Days: 7,
        },
        {
            TourId: 3,
            TourName: 'Adventure in Tokyo',
            DestinationName: 'Tokyo',
            Price: 1800,
            MaxTravellers: 8,
            StartDate: '2024-11-01',
            EndDate: '2024-11-07',
            Nights: 6,
            Days: 7,
        },
        {
            TourId: 4,
            TourName: 'Adventure in Tokyo',
            DestinationName: 'Tokyo',
            Price: 1800,
            MaxTravellers: 8,
            StartDate: '2024-11-01',
            EndDate: '2024-11-07',
            Nights: 6,
            Days: 7,
        },
        {
            TourId: 5,
            TourName: 'Adventure in Tokyo',
            DestinationName: 'Tokyo',
            Price: 1800,
            MaxTravellers: 8,
            StartDate: '2024-11-01',
            EndDate: '2024-11-07',
            Nights: 6,
            Days: 7,
        },
        {
            TourId: 6,
            TourName: 'Adventure in Tokyo',
            DestinationName: 'Tokyo',
            Price: 1800,
            MaxTravellers: 8,
            StartDate: '2024-11-01',
            EndDate: '2024-11-07',
            Nights: 6,
            Days: 7,
        },
        {
            TourId: 7,
            TourName: 'Adventure in Tokyo',
            DestinationName: 'Tokyo',
            Price: 1800,
            MaxTravellers: 8,
            StartDate: '2024-11-01',
            EndDate: '2024-11-07',
            Nights: 6,
            Days: 7,
        },
        {
            TourId: 8,
            TourName: 'Adventure in Tokyo',
            DestinationName: 'Tokyo',
            Price: 1800,
            MaxTravellers: 8,
            StartDate: '2024-11-01',
            EndDate: '2024-11-07',
            Nights: 6,
            Days: 7,
        },
    ]);

    const [tourDetails, setTourDetails] = useState({
        tourName: '',
        destinationId: '',
        price: '',
        maxTravellers: '',
        startDate: '',
        endDate: '',
        nights: '',
        days: '',
    });

    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        loadDestinations();
    }, []);

    const loadDestinations = async () => {
        // Mock fetching destinations
        const data = [
            { DestinationId: 1, Name: 'Paris' },
            { DestinationId: 2, Name: 'Tokyo' },
            { DestinationId: 3, Name: 'New York' },
        ];
        setDestinations(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTourDetails({ ...tourDetails, [name]: value });
    };

    const addTour = async (e) => {
        e.preventDefault();
        setTours([...tours, { ...tourDetails, TourId: tours.length + 1 }]);
        // Clear form
        setTourDetails({
            tourName: '',
            destinationId: '',
            price: '',
            maxTravellers: '',
            startDate: '',
            endDate: '',
            nights: '',
            days: '',
        });
    };

    const deleteTour = (tourId) => {
        setTours(tours.filter(tour => tour.TourId !== tourId));
    };

    return (
        <div className="manage-tours">
            <div className="container">
                <h2>Manage Tours</h2>
                <div className="grid-section">
                    <h3>Existing Tours</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tour ID</th>
                                <th>Tour Name</th>
                                <th>Destination</th>
                                <th>Price</th>
                                <th>Max Travellers</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Nights</th>
                                <th>Days</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tours.map(tour => (
                                <tr key={tour.TourId}>
                                    <td>{tour.TourId}</td>
                                    <td>{tour.TourName}</td>
                                    <td>{tour.DestinationName}</td>
                                    <td>{tour.Price}</td>
                                    <td>{tour.MaxTravellers}</td>
                                    <td>{new Date(tour.StartDate).toLocaleDateString()}</td>
                                    <td>{new Date(tour.EndDate).toLocaleDateString()}</td>
                                    <td>{tour.Nights}</td>
                                    <td>{tour.Days}</td>
                                    <td>
                                        <button onClick={() => deleteTour(tour.TourId)} className="btn delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="form-section">
                    <h3>Add New Tour</h3>
                    <form onSubmit={addTour}>
                        <label>Tour Name: </label>
                        <input
                            type="text"
                            name="tourName"
                            placeholder="Enter Tour Name"
                            value={tourDetails.tourName}
                            onChange={handleChange}
                            required
                        />
                        <label>Destination: </label>
                        <select
                            name="destinationId"
                            value={tourDetails.destinationId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Destination</option>
                            {destinations.map(dest => (
                                <option key={dest.DestinationId} value={dest.DestinationId}>
                                    {dest.Name}
                                </option>
                            ))}
                        </select>
                        <label>Price: </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Enter Tour Price"
                            value={tourDetails.price}
                            onChange={handleChange}
                            required
                        />
                        <label>Maximum Travellers: </label>
                        <input
                            type="number"
                            name="maxTravellers"
                            placeholder="Max Travellers"
                            value={tourDetails.maxTravellers}
                            onChange={handleChange}
                            required
                        />
                        <label>Start Date:</label>
                        <input
                            type="date"
                            name="startDate"
                            value={tourDetails.startDate}
                            onChange={handleChange}
                            required
                        />
                        <label>End Date:</label>
                        <input
                            type="date"
                            name="endDate"
                            value={tourDetails.endDate}
                            onChange={handleChange}
                            required
                        />
                        <label>Nights: </label>
                        <input
                            type="number"
                            name="nights"
                            placeholder="Nights"
                            value={tourDetails.nights}
                            onChange={handleChange}
                            required
                        />
                        <label>Days: </label>
                        <input
                            type="number"
                            name="days"
                            placeholder="Days"
                            value={tourDetails.days}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn">Add Tour</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
};

export default ManageTours;
