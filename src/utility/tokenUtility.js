import { jwtDecode } from "jwt-decode";
import axios from "axios";

const checkForExpiration = () => {
  try {
    const token = localStorage.getItem("accessToken");
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = Math.floor((decoded.exp - now) / 60);
    return timeLeft;
  } catch (err) {
    console.error("Something went wrong with checking the token!", err);
    return false;
  }
};

const refreshToken = async () => {
  const timeLeft = checkForExpiration();
  if ((typeof timeLeft === "number" && timeLeft <= 1) || !timeLeft) {
    await axios
      .post(
        `/api/refresh`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return false;
  }
};

const tokenDecode = () =>{
  const token = localStorage.getItem('accessToken');
  const decode = jwtDecode(token);
  
  return decode;
}
const getRole =() =>{
  
  const role = tokenDecode().roles;

  return role;
}
export { refreshToken, getRole };