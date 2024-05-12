import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { DeliveryAuthContext } from '../../../Shared/Components/context/DeliveryAuthContext';

const DeliveryPersonProfile = () => {
    const { deliveryPersonId } = useContext(DeliveryAuthContext);
    const [deliveryPerson, setDeliveryPerson] = useState({});
    const [loading, setLoading] = useState(false);

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
                </div>
            )}
        </>
    );
};

export default DeliveryPersonProfile;