import React, { useEffect, useState } from 'react';
import './ManageDestinations.css';

const ManageDestinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [newDestination, setNewDestination] = useState({
        DestinationId: '',
        Name: '',
        Region: '',
        Location: '',
        Latitude: '',
        Longitude: ''
    });

    // Fetch destinations from the backend
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/destinations/')
            .then(response => response.json())
            .then(data => setDestinations(data));
    }, []);

    // Handle input changes for adding a new destination
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDestination({ ...newDestination, [name]: value });
    };

    // Add a new destination
    const handleAddDestination = () => {
        if (newDestination.Name && newDestination.Region && newDestination.Location && newDestination.Latitude && newDestination.Longitude) {
            fetch('http://127.0.0.1:8000/api/destinations/add/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDestination),
            })
            .then(response => response.json())
            .then(data => {
                setDestinations([...destinations, data]);
                setNewDestination({ DestinationId: '', Name: '', Region: '', Location: '', Latitude: '', Longitude: '' });
            })
            .catch(error => console.error('Error adding destination:', error));
        }
    };

    // Delete a destination
    const handleDeleteDestination = (id) => {
        fetch(`http://127.0.0.1:8000/api/destinations/delete/${id}/`, {
            method: 'DELETE',
        })
        .then(() => {
            setDestinations(destinations.filter(destination => destination.DestinationId !== id));
        })
        .catch(error => console.error('Error deleting destination:', error));
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={styles.container}>
                <h2>Manage Destinations</h2>
                <div className="grid-section">
                    <h3>Existing Destinations</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Destination ID</th>
                                    <th>Name</th>
                                    <th>Region</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                    <th>Google Maps Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {destinations.map(destination => (
                                    <tr key={destination.DestinationId}>
                                        <td>{destination.DestinationId}</td>
                                        <td>{destination.Name}</td>
                                        <td>{destination.Region}</td>
                                        <td>{destination.Location}</td>
                                        <td>
                                            <button onClick={() => handleDeleteDestination(destination.DestinationId)} className="btn delete">Delete</button>
                                        </td>
                                        <td>
                                            {destination.GoogleMapsLink && (
                                                <a href={destination.GoogleMapsLink} target="_blank" rel="noopener noreferrer">
                                                    View on Google Maps
                                                </a>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Add New Destination</h3>
                    <input type="text" name="Name" placeholder="Name" value={newDestination.Name} onChange={handleChange} />
                    <input type="text" name="Region" placeholder="Region" value={newDestination.Region} onChange={handleChange} />
                    <input type="text" name="Location" placeholder="Location" value={newDestination.Location} onChange={handleChange} />
                    <input type="number" name="Latitude" placeholder="Latitude" value={newDestination.Latitude} onChange={handleChange} />
                    <input type="number" name="Longitude" placeholder="Longitude" value={newDestination.Longitude} onChange={handleChange} />
                    <button onClick={handleAddDestination} className="btn">Add Destination</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '80%',
        marginTop: '100px',
        marginLeft: '200px',
        background: '#fff',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
    },
};

export default ManageDestinations;
