import React from 'react'
import Header from '../../components/Header'
import Paragraph from '../../components/Paragraph'
import Button from '../../components/Button'
import axios from 'axios'
import AppointmentCard from './DoctorAppointment'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
const localUrl = "https://parijatham-backend.onrender.com ";


export default function DAppointments({ navigation }) {
  const [user, setUser] = useContext(UserContext);
  const [Appointments, setAppointments] = useState(null);
  const [TodayAppointments, setTodayAppointments] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get(`https://parijatham-backend.onrender.com/api/appointments/doctor/${user.Id}`)
      .then(res => {
        setAppointments(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [refresh])


  // copute todays appointments
  useEffect(() => {
    if (Appointments) {
      let today = new Date();
      let todayAppointments = Appointments.filter((appointment) => {
        let appointmentDate = new Date(appointment.Date);
        return (appointmentDate.getDate() === today.getDate() && appointmentDate.getMonth() === today.getMonth() && appointmentDate.getFullYear() === today.getFullYear())
      })
      setTodayAppointments(todayAppointments);
    }
  }, [Appointments])



  return (
    <>
      <Header>Your Appointments For Today</Header>
      {
        (TodayAppointments)
          ?
          <>
            {
              TodayAppointments.map((appointment) => {
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
          <Paragraph>No Appointments Today</Paragraph>
      }
      <Header>All Appointments</Header>
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
          <Paragraph>No Appointments Today</Paragraph>
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
