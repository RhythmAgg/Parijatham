import React from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
const localUrl = "https://parijatham-backend.onrender.com ";

import { useNavigation } from "@react-navigation/native";

function Booking({ route }) {
  const navigation = useNavigation();
  const { PatientId, DoctorId } = route.params;

  const [date, setDate] = React.useState(undefined);
  const [displayDate, setDisplayDate] = React.useState({
    date1: "null",
    month1: "null"
  });
  const [hours, setHours] = React.useState("00");
  const [minutes, setMinutes] = React.useState("00");

  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      const temp = params.date;
      const dateObj = new Date(temp);

      const month1 = dateObj.toLocaleString('default', { month: 'long' }); // April
      const date1 = dateObj.getDate(); // 4
      setDisplayDate({ date1, month1 });
    },
    [setOpen, setDate, setDisplayDate]
  );

  const [visible, setVisible] = React.useState(false)
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  function onConfirm({ hours, minutes }) {
    setHours(hours);
    setMinutes(minutes);
    setVisible(false);
    console.log({ hours, minutes });
  }

  function ScheduleAppointment() {
    axios.post(`https://parijatham-backend.onrender.com/api/appointments/`, {
      doctor: DoctorId,
      patient: PatientId,
      Date:  `${displayDate.date1} and ${displayDate.month1}`,
      Time: `${hours} and ${minutes}`
    }).then((response) => {
      console.log(response.data);
      navigation.navigate("Appointments");
    }
    ).catch((error) => {
      console.log(error);
    }
    )



  }

  function navigateBack() {
     navigation.navigate("Doctors");
    // console.log("back");
  }

  return (
    <SafeAreaProvider>
      <View>
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
            Pick single date
          </Button>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
          />
        </View>
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <Button onPress={() => setVisible(true)} uppercase={false} mode="outlined">
            Pick time
          </Button>
          <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={12}
            minutes={14}
          />
        </View>
        <Text>
          <Text>DATE {displayDate.date1} {displayDate.month1}</Text>
          <Text>TIME {hours} {minutes}</Text>
        </Text>
       { (date && hours && minutes) && <Button onPress={ScheduleAppointment}>Schedule</Button>}
        <Button onPress={navigateBack}>Cancel</Button>
      </View>
    </SafeAreaProvider>
  )
}

export default Booking;