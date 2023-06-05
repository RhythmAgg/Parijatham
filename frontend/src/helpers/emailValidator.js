import axios from 'axios';
const localUrl = "https://parijatham-backend.onrender.com ";

export async function emailValidator(email) {
  const returnValue = await axios.post(`https://parijatham-backend.onrender.com/api/login/validemail`, { email: email });
  const returnMessage = returnValue.data;
  const re = /\S+@\S+\.\S+/
  if (!email) return "Email can't be empty."
  if (!re.test(email)) return 'Ooops! We need a valid email address.'
  if (returnMessage == "exists") return ''
  return "This email is not registered"
}
