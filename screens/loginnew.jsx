import React, { useState, Linking,useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
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
    Alert,
    Platform,
    KeyboardAvoidingView
    
} from 'react-native';

import axios from 'axios';
import '../config';
import { Facebook, Twitter } from 'lucide-react-native';

function Login() {

useEffect(()=>{
    function clearStorage(){

        EncryptedStorage.clear()
    }
clearStorage()
},[])
 
    const [user, setUser] = useState("")
    const [userpwd, setPwd] = useState("")
    const [userbound, setBound] = useState("")
    const [location,setlocation] = useState("")

//-----------Signin & get User 
        const signIn =async()=>{       
            
        if(user && userpwd && location && userbound){
         await axios.get(`${global.BASE_URL}/users/getUser/${user}`
           // console.log(`${global.BASE_URL}/users/getUser/${user}`)
           
          ).then(
            function (response){
                const result = response.data[0]
          if(result) {
          if(userpwd == result.userPwd){
           
            storeUserSession(user,result.role)
            
            navigation.navigate("Home")
            clearAll()
          }
          else {
            Alert.alert("Wrong Password")
          }
        }
        else{
           Alert.alert("User Not Registered")
    }

    }
            
          ).catch(
            function(error){
                console.log(error)
            }
          )
        }}


     //---------------------------------------store session

//
function clearAll(){
        setUser("")
        setPwd("")
        setlocation("")
        setBound("")
}
     //---------------------------------------

    

     async function storeUserSession(user,role) {
         try {
             await EncryptedStorage.setItem(
                 "user_session",
                 JSON.stringify({
                     userName : user,
                     role:role,
                     location:location+userbound
                 })
             );
           
         } catch (error) {
             console.log(error)
         }
     }

    
    
    
    const navigation = useNavigation();


    return (
      
        <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'position' : null}
        style={styles.container} enabled>
        <View className='  flex justify-center items-center h-screen bg-blue-800  '>
          
            {/* Logo VIEW */}
            <View className="w-full  h-2/5 bg-blue-800 flex justify-center items-center  rounded-tl-full border-l-[50px] border-t-yellow-500 border-l-yellow-500   ">
                <Image source={require('../img/logo.png')} style={{width:180, height:180}} className='w-[270] h-[300] border ' />
                <Text className='font-extrabold text-3xl  text-white'>PSVs MIS</Text>
                <Text className='font-extrabold sm:text-2xl text-lg text-yellow-500'>National Highways & Motorway Police</Text>
                <Text className="text-white font-light font-mono italic">(Version 1.0)</Text>
            </View>
           
                       {/* Login Panel */}
            <View className='w-full    border-yellow-500 shadow-xl shadow-yellow-700 flex justify-center items-center h-fit bg-slate-100 py-10 px-4'>
                
               {/* User name */}
               <View className="w-full ">
                    <TextInput
                    placeholder='User CNIC'
                    value={user}
                    onChangeText={text=>setUser(text)}
                    placeholderTextColor='grey'
                    keyboardType='number-pad'
                    className=' h-[50]  pl-5 text-lg border bg-white border-blue-400 text-black m-3 rounded-md ' />
                </View>

                {/* Password  */}
                <View className="  w-full">
                <TextInput
                    secureTextEntry={true}
                    placeholder='Password'
                    value={userpwd}
                    onChangeText={e => setPwd(e)}
                    placeholderTextColor='grey'
                    
                    className='h-[50]  pl-5 text-lg  border  bg-white border-blue-400 text-black m-3 rounded-md ' />
                </View>
                <View className="  w-full flex flex-row">
                        <View className=" mt-3 mb-3 ml-3 w-4/12">
                        <TextInput
                        placeholder='Location'
                        value={location}
                        onChangeText={e => setlocation(e)}
                        placeholderTextColor='grey'
                        keyboardType='number-pad'
                        maxLength={4}
                        
                        className='h-[50] pl-5 text-lg  rounded-md border  bg-white border-blue-400 text-black  ' />
                        </View>

                        <View className="w-12  rounded-md mt-3 mb-3  justify-center ">    
                                 <Text className="text-center items-center text-black  font-bold text-lg " > {userbound} </Text>
                        </View>

                        <View className=" w-3/12  text-center items-center flex flex-row ">
                        <TouchableOpacity onPress={()=>setBound('NB')} className="bg-green-700 p-3 px-5 ml-2 rounded-md"><Text className="font-bold text-white">North</Text></TouchableOpacity>
                        <TouchableOpacity   onPress={()=>setBound('SB')} className="bg-orange-700 p-3 px-5  ml-3 rounded-md"><Text className="font-bold text-white">South</Text></TouchableOpacity>

                    </View>

                </View>



                    <TouchableOpacity onPress={()=>signIn()} 
                    className='p-3 bg-blue-800 text-center rounded-md w-6/12 mt-10' >
                    <Text className='text-white text-center font-bold text-lg'>Login</Text>

                    </TouchableOpacity>
            </View>
            {/* important NMHP social links */}
            <View className='text-white p-2 w-full flex  flex-row justify-center  items-center bg-blue-800 '>
                {/* <Text>Official Pages NHMP</Text> */}
               <TouchableOpacity > 
                    <Facebook stroke="#140aa4" size={35} fill="white" / >
                </TouchableOpacity>
                <TouchableOpacity>
                <Twitter stroke="#0898b4" size={35} fill="white"  />
                </TouchableOpacity>
            </View>

            {/* copyrights Tab */}
            <View className='text-white  w-full  justify-center  items-center pt-3'>
                <Text className="text-white">All Rights Reserve by</Text>
                <Text className="text-white">NHMP Training  College, IT Wing</Text>
            </View>
            
        
        
        </View>
        </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }

  });

export default Login;
