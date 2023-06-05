import React from 'react'
import Header from '../../components/Header'
import Paragraph from '../../components/Paragraph'
import Button from '../../components/Button'
import axios from 'axios'
import AppointmentCard from './PatientAppointment'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { Text } from 'react-native-paper'
const localUrl = "https://parijatham-backend.onrender.com ";

export default function PAappointments({ navigation }) {
    const [user, setUser] = useContext(UserContext);
    const [Appointments, setAppointments] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        axios.get(`https://parijatham-backend.onrender.com/api/appointments/patient/${user.Id}`)
            .then(res => {
                setAppointments(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [refresh])


    return (
        <>
            <Header>Your Appointments</Header>
            {
                (Appointments)
                    ?
                    <>
                        {
                            Appointments.map((appointment) => {
                                return (
                                    <AppointmentCard
                                        Appointment={appointment}
                                        key={appointment.id}
                                        setRefresh={setRefresh}
                                    />
                                )
                            })
                        }
                    </>
                    :
                    <Text>No Appointments</Text>
            }

            <Button
                mode="outlined"
                onPress={() =>
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'StartScreen' }],
                    })
                }
            >
                Logout
            </Button>
        </>
    )
}