import React from "react";
import { View, Text } from "react-native";
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function DatePicker({ date, setDate }) {

    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
        },
        [setOpen, setDate]
    );
    

    return (
        <SafeAreaProvider>
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
        </SafeAreaProvider>
    );
}