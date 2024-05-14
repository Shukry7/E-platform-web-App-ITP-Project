import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DeliveryAuthContext } from '../../../Shared/Components/context/DeliveryAuthContext';
import Toast from "../../../Shared/Components/UiElements/Toast/Toast";

const DeliveryPersonProfile = () => {
    const { deliveryPersonId } = useContext(DeliveryAuthContext);
    const [deliveryPerson, setDeliveryPerson] = useState({});
    const [loading, setLoading] = useState(false);
    const [availability, setAvailability] = useState('Yes'); // Set default availability to 'Yes'

    useEffect(() => {
        console.log('DeliveryPersonProfile - deliveryPersonId:', deliveryPersonId);

        if (!deliveryPersonId) {
            console.error('deliveryPersonId is undefined or null');
            return;
        }

        setLoading(true);
        axios.get(`http://localhost:5000/delivery/${deliveryPersonId}`)
            .then((res) => {
                console.log(res.data)
                setDeliveryPerson(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [deliveryPersonId]);

    const handleAvailabilityChange = (selectedAvailability) => {
        setAvailability(selectedAvailability);
    };

    const handleSubmitAvailability = () => {
        console.log('Button clicked'); // Log a message to indicate the button was clicked
        axios.get(`http://localhost:5000/available/${deliveryPersonId}`)
            .then((res) => {
                if (res.data.length > 0) {
                    // If an availability entry already exists, update it using PUT
                    axios.put(`http://localhost:5000/available/${res.data[0]._id}`, {
                        available: availability
                    })
                    .then((updateRes) => {
                        console.log('Response:', updateRes.data); // Log the response data
                        Toast("Availability Updated!! 🔥", "success");
                    })
                    .catch((updateErr) => {
                        console.error(updateErr);
                        Toast("Failed to update availability.", "error");
                    });
                } else {
                    // If no availability entry exists, create a new one using POST
                    axios.post("http://localhost:5000/available/", {
                        delivery: deliveryPersonId,
                        available: availability
                    })
                    .then((createRes) => {
                        console.log('Response:', createRes.data); // Log the response data
                        Toast("Availability Submitted!! 🔥", "success");
                    })
                    .catch((createErr) => {
                        console.error(createErr);
                        Toast("Failed to submit availability.", "error");
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                Toast("Failed to check availability.", "error");
            });
    };

    return (
        <>
            {loading ? (
                <center>Loading...</center>
            ) : (
                <div>
                    <h1>Delivery Person Profile</h1>
                    <p>ID: {deliveryPerson.ID}</p>
                    <p>Name: {deliveryPerson.name}</p>
                    <p>Telephone: {deliveryPerson.telephone}</p>
                    <p>Mail: {deliveryPerson.mail}</p>
                    <p>Address: {deliveryPerson.address}</p>
                    <p>License Number: {deliveryPerson.license}</p>
                    <p>Number Plate: {deliveryPerson.numberplate}</p>
                    <p>Type & Capacity: {deliveryPerson.type} ({deliveryPerson.capacity}kg)</p>
                    <p>Availability:
                    <select value={availability} onChange={(e) => handleAvailabilityChange(e.target.value)}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    </select>
                        <button onClick={handleSubmitAvailability}>Submit Availability</button>
                    </p>
                </div>
            )}
        </>
    );
};

export default DeliveryPersonProfile;
