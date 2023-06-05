import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import io from "socket.io-client";
const localUrl = "https://parijatham-backend.onrender.com";
const socket = io.connect(`https://parijatham-backend.onrender.com`);
import { Button } from 'react-native-paper';

const ChatScreen = ({ route }) => {
    const { patientId, doctorId, currentUserId } = route.params;
    const navigation = useNavigation();

    const [messages, setMessages] = useState([]);
    const [datastatus, setdatastatus] = useState(false);
    const [chatId, setChatId] = useState("");
    const chatroom = doctorId + "_" + patientId;

    const onSend = (newMessages = []) => {
        console.log(newMessages);
        socket.emit("s_message", { messages, room: chatroom });
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );
        
        axios.post(`https://parijatham-backend.onrender.com/api/chats/addmessage`, {
            chatId: chatId,
            message: newMessages[0].text,
            whosent: currentUserId
        });
    };

    async function fetchData() {
        const data = await axios.get(`https://parijatham-backend.onrender.com/api/chats/` + doctorId + "_" + patientId);
        console.log(data.data);
        setChatId(data.data._id);
        setMessages(data.data.messages);
        setdatastatus(true);
    }

    if (!datastatus && messages.length === 0) {
        fetchData();
    }
    const joinRoom = () => {
        if (!datastatus) {
            socket.emit("join_room", { room: chatroom });
        }
    };
    joinRoom();

    useEffect(() => {
        socket.on("r_message", async (data) => {
            const data2 = await axios.get(`https://parijatham-backend.onrender.com/api/chats/` + doctorId + "_" + patientId);
            setMessages(data2.data.messages);
            setdatastatus(true);
        });
    }, [socket, messages, datastatus]
    );

    return (
        <>
            <Button onPress={()=>navigation.goBack()}>Back</Button>
            <GiftedChat
                messages={messages}
                onSend={(newMessages) => onSend(newMessages)}
                placeholder="Type your message here..."
                user={{ _id: currentUserId }}
            />
        </>
    );
};

export default ChatScreen;
