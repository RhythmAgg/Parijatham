import React, { useEffect } from 'react'
import Background from '../../components/Background'
import Logo from '../../components/Logo'
import Header from '../../components/Header'
import Paragraph from '../../components/Paragraph'
import Button from '../../components/Button'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios'
const localUrl = "https://parijatham-backend.onrender.com ";

export default function Dashboard_doctor({ navigation }) {

  const [status, setStatus] = React.useState('loading');

  //the date is  in the form of DD-MM-YYYY
  let today = new Date();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let year = today.getFullYear();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  let date = day + "-" + month + "-" + year;


  async function fetchStatus() {
    const response = await axios.get(`https://parijatham-backend.onrender.com/api/hospitals/P/${date}`);
    console.log(response.data.status);
    setStatus(response.data.status);
  }

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <Background>
      <Logo />
      <Header>Hello Doctor!</Header>
      <Paragraph>
        Welcome
      </Paragraph>
      <Text> Hospital:{status}</Text>

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
    </Background>
  )
}



