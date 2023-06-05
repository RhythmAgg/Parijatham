import Header from '../../components/Header'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'
import PatientCard from './PatientCard'
const localUrl = "https://parijatham-backend.onrender.com ";

export default function Patientslist({ navigation }) {
  const [user, setUser] = useContext(UserContext);
  const [refresh, setRefresh] = useState(0);
  const [Doctor, setDoctor] = useState(null);
  const [Patientslist, setPatientslist] = useState(null);

  useEffect(() => {
    axios.get(`https://parijatham-backend.onrender.com/api/doctors/${user.Id}`)
      .then(res => {
        setDoctor(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [refresh])





  return (
    <>
      {
        (Doctor)
          ?
          <>
            <Header>Your Current Patients</Header>
            {
              Doctor.Patients.map((patient) => {
                return (
                  <PatientCard

                    Name={patient.Name}
                    id={patient.id}
                    key={patient.id}
                    BasicDetails={patient.BasicDetails}
                    doctorId={user.Id}
                    type="1"
                    setRefresh={setRefresh}
                  />
                )
              })
            }
            <Header>Patient Request</Header>
            {
              Doctor.Requests.map((patient) => {
                return (
                  <PatientCard
                    Name={patient.Name}
                    id={patient.id}
                    key={patient.id}
                    BasicDetails={patient.BasicDetails}
                    doctorId={user.Id}
                    type="0"
                    setRefresh={setRefresh}
                  />
                )
              })
            }

          </>
          : null
      }

    </>

  )
}
