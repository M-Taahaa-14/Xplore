import React, { useEffect, useState } from 'react';
import './ManageDestinations.css';

const ManageDestinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [newDestination, setNewDestination] = useState({
        Name: '',
        Region: '',
        Location: '',
        Latitude: '',
        Longitude: '',
        Price: '',
        MaxTravellers: '',
        StartDate: '',
        EndDate: '',
        Image: null,
    });

    useEffect(() => {
        // Fetch existing destinations from the backend
        fetch('http://127.0.0.1:8000/api/destinations/')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch destinations');
                }
                return response.json();
            })
            .then(data => setDestinations(data))
            .catch(error => console.error('Error fetching destinations:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDestination({ ...newDestination, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewDestination({ ...newDestination, Image: e.target.files[0] });
    };

    const handleAddDestination = () => {
        const formData = new FormData();

        // Append all fields to FormData, including the image
        Object.keys(newDestination).forEach((key) => {
            if (newDestination[key]) {
                formData.append(key, newDestination[key]);
            }
        });

        // POST request to the backend to add the new destination
        fetch('http://127.0.0.1:8000/api/destinations/add/', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add destination');
                }
                return response.json();
            })
            .then(data => {
                setDestinations([...destinations, data]);
                setNewDestination({
                    Name: '',
                    Region: '',
                    Location: '',
                    Latitude: '',
                    Longitude: '',
                    Price: '',
                    MaxTravellers: '',
                    StartDate: '',
                    EndDate: '',
                    Image: null,
                });
            })
            .catch(error => console.error('Error adding destination:', error));
    };

    const handleDeleteDestination = (id) => {
        fetch(`http://127.0.0.1:8000/api/destinations/delete/${id}/`, { method: 'DELETE' })
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
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Destination ID</th>
                                    <th>Name</th>
                                    <th>Region</th>
                                    <th>Location</th>
                                    <th>Price</th>
                                    <th>Max Travellers</th>
                                    <th>Nights</th>
                                    <th>Days</th>
                                    <th>Actions</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {destinations.map(destination => (
                                    <tr key={destination.DestinationId}>
                                        <td>{destination.DestinationId}</td>
                                        <td>{destination.Name}</td>
                                        <td>{destination.Region}</td>
                                        <td>{destination.Location}</td>
                                        <td>{destination.Price}</td>
                                        <td>{destination.MaxTravellers}</td>
                                        <td>{destination.Nights}</td>
                                        <td>{destination.Days}</td>
                                        <td>
                                            <button onClick={() => handleDeleteDestination(destination.DestinationId)} className="btn delete">Delete</button>
                                        </td>
                                        <td>
                                            {destination.Image && (
                                                <img 
                                                    src={`http://127.0.0.1:8000${destination.Image}`} 
                                                    alt="Destination" 
                                                    style={styles.image}  
                                                />
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
                    <input 
                        type="text" 
                        name="Name" 
                        placeholder="Name" 
                        value={newDestination.Name} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="text" 
                        name="Region" 
                        placeholder="Region" 
                        value={newDestination.Region} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="text" 
                        name="Location" 
                        placeholder="Location" 
                        value={newDestination.Location} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="number" 
                        name="Latitude" 
                        placeholder="Latitude" 
                        value={newDestination.Latitude} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="number" 
                        name="Longitude" 
                        placeholder="Longitude" 
                        value={newDestination.Longitude} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="number" 
                        name="Price" 
                        placeholder="Price" 
                        value={newDestination.Price} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="number" 
                        name="MaxTravellers" 
                        placeholder="Max Travellers" 
                        value={newDestination.MaxTravellers} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="date" 
                        name="StartDate" 
                        value={newDestination.StartDate} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="date" 
                        name="EndDate" 
                        value={newDestination.EndDate} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="file" 
                        name="Image" 
                        onChange={handleFileChange} 
                    />
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
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    image: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
    },
};

export default ManageDestinations;
