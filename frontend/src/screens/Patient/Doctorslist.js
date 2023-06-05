import React from 'react'
import Header from '../../components/Header'
import DoctorCard from './DoctorCard'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../contexts/UserContext'
import axios from 'axios'
import { useIsFocused, useNavigation } from '@react-navigation/native';

const localUrl = "https://parijatham-backend.onrender.com ";

export default function Doctorlist() {
  const [user, setUser] = useContext(UserContext);
  const [refresh, setRefresh] = useState(0);
  const [Patient, setPatient] = useState(null);
  const [Doctorslist, setDoctorslist] = useState([]);
  const [RequestDoctor, setRequestDoctor] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get(`https://parijatham-backend.onrender.com/api/patients/${user.Id}`)
      .then(res => {
        setPatient(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [refresh])

  useEffect(() => {
    axios.get(`https://parijatham-backend.onrender.com/api/doctors/others/${user.Id}`)
      .then(res => {
        setDoctorslist(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [refresh])





  return (<>
    {
      (Patient)
        ?
        <>
          <Header>Your Current Doctors</Header>
          {
            Patient.Doctors.map((doctor) => {

              return (
                <DoctorCard
                  Name={doctor.Name}
                  id={doctor.id}
                  key={doctor.id}
                  BasicDetails={doctor.BasicDetails}
                  patiendId={user.Id}
                  type="1"
                  setRefresh={setRefresh}
                />
              )
            }
            )

          }
          <Header>Doctors you have requested</Header>
          {
            Patient.Requests.map((doctor) => {
              return (
                <DoctorCard
                  Name={doctor.Name}
                  id={doctor.id}
                  key={doctor.id}
                  BasicDetails={doctor.BasicDetails}
                  patiendId={user.Id}
                  type="2"
                  setRefresh={setRefresh}
                  refresh={refresh}
                />
              )
            }
            )
          }

          <Header>Other Doctors</Header>
          {
            Doctorslist.map((doctor) => {
              return (
                <DoctorCard
                  Name={doctor.Name}
                  id={doctor.id}
                  key={doctor.id}
                  BasicDetails={doctor.BasicDetails}
                  patiendId={user.Id}
                  type="0"
                  setRefresh={setRefresh}
                />
              )
            }
            )
          }
        </>
        : <Header>Loading...</Header>

    }

  </>
  )
}
