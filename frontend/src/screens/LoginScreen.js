import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper';
const localUrl = "https://parijatham-backend.onrender.com ";

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isloginPressed, setLoginPressed] = useState(false);

  const onLoginPressed = async () => {
    setLoginPressed(true);
    const emailError = await emailValidator(email.value)
    const credentials = { email: email.value, password: password.value }
    const passwordError = await passwordValidator(credentials)
    if (
      (passwordError != 'a' && passwordError != 'd') &&
      (emailError || passwordError)
    ) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setLoginPressed(false)
      return
    }
    if (passwordError == 'a') {
      const returnValue = await axios.post(`https://parijatham-backend.onrender.com/api/login/validpassword`, { email: email.value, PasswordHash: password.value });
      setUser(returnValue.data);
      navigation.reset({
        index: 0,
        routes: [{ name: 'PatientNavigator' }],
      })
    }
    if (passwordError == 'd') {
      const returnValue = await axios.post(`https://parijatham-backend.onrender.com/api/login/validpassword`, { email: email.value, PasswordHash: password.value });
      setUser(returnValue.data);
      navigation.reset({
        index: 0,
        routes: [{ name: 'DoctorNavigator' }],
      })
    }
  
  }
  
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
        <View>
          {
            (isloginPressed) ?
              <ActivityIndicator></ActivityIndicator>
              :

              <Button mode="contained" onPress={onLoginPressed}>
                Login
              </Button>
          }
        </View></View>
      {/* <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
