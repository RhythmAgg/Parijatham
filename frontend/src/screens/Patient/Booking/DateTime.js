import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

const CurrentDate = ({date}) => {

  return (
    <View style={styles.container}>
      <Chip>
        <View style={styles.box}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </Chip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  date: {
    fontSize: 24,
  },
});

export default CurrentDate;
