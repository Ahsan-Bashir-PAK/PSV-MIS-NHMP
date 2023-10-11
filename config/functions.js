
import axios from "axios";
import { User } from "lucide-react-native";
import EncryptedStorage from "react-native-encrypted-storage/";
import { Alert } from "react-native";
//============================user retriving session
async function retrieveUserSession(valueSetter) {
   
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session !== undefined) {
        valueSetter(JSON.parse(session));
      }
    } catch (error) {
      console.log(error);
    }
}

//===========================================vehcle storage session
async function storeVehicleSession(letter,modal,number) {

    try {
        await EncryptedStorage.setItem(
            "psv_session",
            JSON.stringify({
                psvLetter :letter ,
                psvModal:modal ,
                psvNumber:number 
            })
              
        );
    } catch (error) {
        console.log(error)
    }
}
//=======================================================
async function storeDriverSession(cnic) {

  try {
      await EncryptedStorage.setItem(
          "driver_session",
          JSON.stringify({
              dvrCnic :cnic ,
          })
            
      );
  } catch (error) {
      console.log(error)
  }
}

//==========================================================
async function retrieveDriverSession(setter) {
  try {
    const session = await EncryptedStorage.getItem('driver_session');
    if (session !== undefined) {
      setter(JSON.parse(session));
    }
  } catch (error) {
    console.log(error)
  }
}
//=============================================retrive vehicle
async function retrieveVehicleSession(setter) {
    try {
      const session = await EncryptedStorage.getItem('psv_session');
      if (session !== undefined) {
        setter(JSON.parse(session));
      }
    } catch (error) {
      console.log(error)
    }
  }

  //===================================================================check user

  const verifyDuplicateUser =(user,func)=>{
    axios.get(`${global.BASE_URL}/users/getUser/${user}`).then(
      async response=>{
        const userData = response.data
        if(userData){
          Alert.alert("User already registered")
          func()
        }
      }
    )
  }


  export {
    retrieveUserSession,
    retrieveVehicleSession,
    storeVehicleSession,
    storeDriverSession,
    retrieveDriverSession,
    verifyDuplicateUser
  }