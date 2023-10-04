import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserPlus,  BadgePlus, BusFront,  UserCog2,  BookCopy, LogOutIcon, ArrowDownToLine, Link, UserCog2Icon, Plus, User, PenSquare  } from 'lucide-react-native';

import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { retrieveUserSession,storeDriverSession,storeVehicleSession } from '../config/functions';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  Button,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'react-native-svg';
import SignUp from './forms/signUp';


const search_psv = [
{
"PSV": "BSA-2019-1515", 
"seating_capacity":"45",
"company":"Faisal Movers",
"Route Permit":"15-09-2023",
"fitness":"20-11-2023",
"emergency exit":"yes"
}];



function Home() {
  const [currentUser, setCurrentUser] = useState({});

  const [reg, setReg] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [dvrCnic, setDvrCnic] = useState("");
  const navigation = useNavigation("");

  useEffect(() => {
    retrieveUserSession(setCurrentUser);
  }, []);

  // logout clear all sessions

 async function logoutSesion () {
    try{  
  //  await EncryptedStorage.clear();    
   navigation.navigate('Login');
  } catch (error) {}

  }  
  


  //============================================saving report Session

  async function  getInspectionreport() {
    try {
      if(reg && year && number && dvrCnic){
       await storeVehicleSession(reg,year,number)
       await storeDriverSession(dvrCnic)
       
        navigation.navigate("Trip Report")
      }
      else{
        Alert.alert("Please fill All Fields")
      }
      
    } catch (error) {
      console.log(error)
    }
   
  }

  //============================================================checking
  async function rptSessionProps() {
  

    
  try {
    
    await axios
      .get(
        `${global.BASE_URL}/psv/getPsv/${reg}/${year}/${number}`
      )
      .then(async response => {
        const psvDetail = response.data[0];
        if (psvDetail) {
          
          //------------------------getting driver data
          await axios
            .get(`${global.BASE_URL}/dvr/getDriver/${dvrCnic}`)
            .then(async response => {
              const driverDetail = response.data[0];
              if (driverDetail) {
                getInspectionreport()
              } else {
              
                Alert.alert('Driver not in record');
              }
            });
        } else {
        
          Alert.alert('PSV not in record');
         
        }
      });
  } catch (error) {
    console.log(error);
  }
}
  

  return (
    // <SafeAreaView>
   
    <View className="p-2 h-screen w-full bg-white">
      <View className=" flex flex-row bg- bg-[#29378a]  rounded-sm  h-[80]  w-full  text-center items-center">
      <ImageBackground source={require('../img/bground.jpg')}  resizeMode="cover" style={{ height:'100%', width:518, opacity:0.9, flex:1, justifyContent:'center'}}  />
        <Image
          source={require('../img/logo.png')}
          style={{width: 60, height: 60}}
          className="pl-2"
        />
         
        <View className=" w-5/6 ">
          <Text className="text-white items-center text-center font-extrabold text-lg">
            NHMP PSVs Dashboard
          </Text>
        </View>
      </View>
      <View className="   mt-5 rounded-m  h-2/6  w-full text-center">
        {/* View Input Type */}
        <View className=" flex-row m-2">
          <TextInput
            style={{backgroundColor: 'white'}}
            placeholderTextColor={'grey'}
            autoCapitalize={'characters'}
            placeholder="ABC"
            maxLength={3}
            keyboardType="email-address"
            value={reg}
            onChangeText={text => setReg(text)}
            className="border border-r-0 border-l-0 justify-center pl-4 bg-white border-black  rounded-md w-4/12  text-lg text-black"
          />

          <TextInput
            placeholderTextColor={'grey'}
            placeholder="Year (2023)"
            keyboardType="number-pad"
            maxLength={4}
            minLength={4}
            value={year}
            onChangeText={text => setYear(text)}
            className=" border border-r-0 border-l-0 bg-white border-black text-black  rounded-md w-4/12 text-lg"
          />
          <TextInput
            placeholderTextColor={'grey'}
            placeholder="[0000]"
            maxLength={4}
            keyboardType="number-pad"
            onChangeText={e => setNumber(e)}
            value={number}
            className="  border border-r-0 border-l-0 bg-white border-black text-black rounded-md w-4/12 text-lg"
          />
        </View>

        {/* View SearchBox Button */}
        {/* <View onPress={()=>searchPSV()} className=' flex-row p-1 justify-center  w-full '>
          <TouchableOpacity className='bg-[#29378a]  justify-center  flex-row w-full rounded-md items-center p-3 '>
            <Search stroke="white" size={25} />
            <Text className=' text-center font-bold font-white  text-lg text-white'>Search PSV</Text>
          </TouchableOpacity>
        </View> */}

        <View className=" m-2 flex-row p-1 justify-center  w-full ">
          <TextInput
            style={{backgroundColor: 'white'}}
            placeholderTextColor={'grey'}
            autoCapitalize={'characters'}
            placeholder="0000000000000 {CNIC without dashes}"
            maxLength={13}
            keyboardType="number-pad"
            value={dvrCnic}
            onChangeText={e => setDvrCnic(e)}
            className="border justify-center pl-4 bg-white border-black m-1 rounded-md w-full  text-lg text-black"
          />
        </View>
        <View className="flex-row p-1 justify-center  w-full m-2">
          <TouchableOpacity
            // onPress={() => getInspectionreport()}
            onPress={() => rptSessionProps()}
            className="bg-[#29378a]  justify-center  flex-row w-full rounded-md items-center p-3 ">
            <BookCopy stroke="white" size={25} />
            <Text className=" text-center font-bold font-white  text-lg text-white">
              Generate Inspection Report
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PSVs TABS */}
      <View className=" bg-slate-100   rounded-lg h-[30%]   p-4 ">
        {/*ADD PSV Button  */}
        <View className="flex-row justify-around">
          <TouchableOpacity
            onPress={() => navigation.push('MyTabs', {screen: 'Add Vehicle'})}
            className="shadow-md shadow-slate-950  w-2/5 flex-row  rounded-lg  flex justify-around items-center border border-slate-400  bg-white">
            <View className="  items-center gap-1 justify-center mt-2 p-1 ">
              <BusFront stroke="orange" size={40} />
              <View className="flex justify-center items-center flex-row gap-1">
                <BadgePlus stroke="black" size={20} />
                <Text className=" font-bold font-white  text-lg text-black">
                  Add PSV
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/*Add driver  */}
          <TouchableOpacity
            onPress={() => navigation.push('MyTabs', {screen: 'AddDrivernew'})}
            className="w-2/5  shadow-md shadow-slate-950 rounded-lg  flex justify-center items-center   border border-slate-400  bg-white">
            <View className="  items-center  gap-1 justify-center mt-2 p-1 ">
              <UserPlus stroke="green" size={40} />
              <View className="flex justify-center items-center flex-row gap-1">
                <BadgePlus stroke="black" size={20} />
                <Text className=" font-bold font-white  text-lg text-black">
                  Add Driver
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View className=" flex-row justify-around mt-4">
          <TouchableOpacity
           onPress={() => navigation.navigate('Downloads')}
            className="  w-2/5 flex-row shadow-md shadow-slate-950  rounded-lg  flex justify-around items-center border border-slate-400  bg-white">
            <View className="  items-center gap-1 justify-center mt-2 ">
              <ArrowDownToLine stroke="purple" size={40} />
              <View className="flex justify-center items-center flex-row gap-1">
                <Text className=" font-bold font-white  text-lg text-black">
                  Downloads
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/*online Links  */}
          <TouchableOpacity
            onPress={() => navigation.navigate('OnlineVerifications')}
            className="w-2/5  shadow-md shadow-slate-950 rounded-lg  flex justify-center items-center   border border-slate-400  bg-white">
            <View className="  items-center  gap-1 justify-center mt-2 ">
              <Link stroke="grey" size={40} />
              <View className="flex justify-center items-center flex-row gap-1">
                <Text className=" font-bold font-white  text-lg text-black">
                  Online Verifications
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add New User */}

      <View
        className={`${currentUser.role == 'Admin' ? 'block' : 'hidden'} mt-2`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          className="w-full   h-10 rounded-lg  justify-center items-center bg-[#2e3d94] ">
          <View className="justify-center flex flex-row items-center  w-full gap-2">
            <Plus stroke="white" size={25} />
            <Text className=" font-bold font-white  text-lg text-white">
              Add New User
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* User Profile*/}

      <View className=" mt-2 flex flex-row p-1 ">
        <View className="p-1 w-2/4">
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          className=" h-10 rounded-lg  justify-center items-center bg-[#258f3c] ">
          <View className="justify-center flex flex-row items-center  w-full ">
            <User stroke="white" size={25} />
            <Text className=" font-bold font-white  text-lg text-white">
              User Profile
            </Text>
          </View>
        </TouchableOpacity>
        </View>

        <View className="  p-1 w-2/4">
          <TouchableOpacity
            onPress={() => navigation.navigate('Feed Back')}
            className="  h-10 rounded-lg  justify-center items-center bg-[#40b63c] ">
            <View className="justify-center flex flex-row items-center  w-full ">
              <PenSquare stroke="white" size={25} />
              <Text className=" font-bold font-white  text-lg text-white">
              Feed Back
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Update Logout */}

      <View className="mt-2 ">
        <TouchableOpacity
          onPress={() => logoutSesion()}
          className="w-full   h-10 rounded-lg  justify-center items-center bg-[#a32d37] ">
          <View className="justify-center flex flex-row items-center  w-full gap-2">
            <LogOutIcon stroke="white" size={25} />
            <Text className=" font-bold font-white  text-lg text-white">
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

export default Home;