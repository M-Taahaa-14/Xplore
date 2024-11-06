import React, { useEffect, useState } from 'react';
import './ManageDestinations.css';

const ManageDestinations = () => {
    {/*below are some sample destinations added */}
    const [destinations, setDestinations] = useState([
        { DestinationId: 1, Name: 'Paris', Region: 'Europe', Location: 'France' },
        { DestinationId: 2, Name: 'Tokyo', Region: 'Asia', Location: 'Japan' },
        { DestinationId: 3, Name: 'New York', Region: 'North America', Location: 'USA' },
        { DestinationId: 4, Name: 'Sydney', Region: 'Australia', Location: 'Australia' },
        { DestinationId: 5, Name: 'Cairo', Region: 'Africa', Location: 'Egypt' }
    ]);

    const [newDestination, setNewDestination] = useState({
        DestinationId: '',
        Name: '',
        Region: '',
        Location: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDestination({ ...newDestination, [name]: value });
    };

    // Add a new destination
    const handleAddDestination = () => {
        if (newDestination.DestinationId && newDestination.Name && newDestination.Region && newDestination.Location) {
            //tried this but it doesn't work, destinationId is not displayed, so now doing manually
            // const newId = destinations.length + 1; // Calculate new ID
            // const newDest = { DestinationId: newId, ...newDestination }; // Assign new ID to destination

            // Convert DestinationId to a number
            const newId = parseInt(newDestination.DestinationId, 10);
            
            // Check for duplicate DestinationId
            if (destinations.some(dest => dest.DestinationId === newId)) {
                alert(`Destination ID ${newId} already exists!`);
                return; // Do nothing if duplicate
            }
            setDestinations([...destinations, newDestination]); // Add the new destination with ID
            setNewDestination({ DestinationId: '', Name: '', Region: '', Location: '' }); // Clear the form
        }
    };

    // Delete a destination
    const handleDeleteDestination = (id) => {
        setDestinations(destinations.filter(destination => destination.DestinationId !== id));
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={styles.container}>
                <h2>Manage Destinations</h2>
                <div className="grid-section">
                    <h3>Existing Destinations</h3>
                    <div className="table-container"> {/* Added scrollable container */}
                        <table>
                            <thead>
                                <tr>
                                    <th>Destination ID</th>
                                    <th>Name</th>
                                    <th>Region</th>
                                    <th>Location</th>
                                    <th>Actions</th>
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
                        name="DestinationId"
                        placeholder="DestinationId"
                        value={newDestination.DestinationId}
                        onChange={handleChange}
                    />

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
                    <button onClick={handleAddDestination} className="btn">Add Destination</button>
                </div>
            </div>
        </div>
    );
};

// Inline styles (could also use CSS files or styled-components)
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
