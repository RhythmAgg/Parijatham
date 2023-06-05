import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const localUrl = "https://parijatham-backend.onrender.com ";

const PatientCard = ({ id, Name, BasicDetails, type, doctorId, setRefresh, refresh }) => {
    const [patientType, setPatientType] = React.useState(type);

    const navigation = useNavigation();

    const handleAccept = () => {
        axios.post(`https://parijatham-backend.onrender.com/api/doctors/accept`, {
            PatientId: id,
            DoctorId: doctorId,
        })
            .then(res => {
                setRefresh(refresh + 1);
            })
    };

    const handleReject = () => {
        axios.post(`https://parijatham-backend.onrender.com/api/doctors/reject`, {
            PatientId: id,
            DoctorId: doctorId,
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
                    (type === "0") ?
                        <>
                            <TouchableOpacity style={styles.button} onPress={handleAccept}>
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleReject}>
                                <Text style={styles.buttonText}>Reject</Text>
                            </TouchableOpacity>
                        </>
                        :
                        <>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DoctorChatScreen", {
                                patientId: id,
                                doctorId: doctorId,
                                currentUserId: doctorId
                            })}>
                                <Text style={styles.buttonText}>Chat</Text>
                            </TouchableOpacity>
                        </>
                }
            </View>
        </View>
    )
}


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

export default PatientCard;