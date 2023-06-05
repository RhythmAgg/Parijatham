import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import BookingDialog from './Booking/Booking';
import axios from 'axios';
const localUrl = "https://parijatham-backend.onrender.com ";

import { useNavigation} from '@react-navigation/native';

const DoctorCard = ({ id, Name, BasicDetails, type, patiendId, setRefresh, refresh }) => {

    const navigation = useNavigation();
    const [doctorType, setDoctorType] = React.useState(type);
    const handleRequest = () => {
        axios.post(`https://parijatham-backend.onrender.com/api/doctors/request`, {
            PatientId: patiendId,
            DoctorId: id,
        })
            .then(res => {

                setRefresh(refresh + 1);
            })
    };


    return (
        <View style={styles.card}>
            <View style={styles.cardDetails}>
                <Text style={styles.name}>{Name}</Text>
                <Text style={styles.basicDetails}>{BasicDetails}</Text>
            </View>
            <View style={styles.cardActions}>
                {
                    (type === "2") ?
                        <Text style={styles.buttonText}>OnRequest</Text>
                        :
                        <>
                            {
                                (type === "0") ?
                                    <TouchableOpacity style={styles.button} onPress={handleRequest}>
                                        <Text style={styles.buttonText}>Request</Text>
                                    </TouchableOpacity>
                                    :
                                    <>
                                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PatientChatScreen",{
                                            patientId: patiendId,
                                            doctorId:id,
                                            currentUserId:patiendId
                            
                                        })}
                                        >
                                            <Text style={styles.buttonText}>Chat</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("BookingDialog",{
                                            PatientId: patiendId,
                                            DoctorId:id
                                        })}>
                                            <Text style={styles.buttonText}>Book</Text>
                                        </TouchableOpacity>
                                    </>

                            }
                        </>
                }

            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardDetails: {
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    basicDetails: {
        fontSize: 16,
        color: '#888',
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DoctorCard;
