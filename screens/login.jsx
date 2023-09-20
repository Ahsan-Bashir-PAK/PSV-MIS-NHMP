import React, { useState } from 'react';
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
    KeyboardAvoidingView
} from 'react-native';

import axios from 'axios';
import '../config'
function Login() {
    const [user, setUser] = useState("")
    const [userpwd, setPwd] = useState("")
    const [userbound, setBound] = useState("")
    const [location,setlocation] = useState("")

   
  

    // const signIn =async()=>{       
    //     if(user && userpwd && location && userbound){
    //     const response = await fetch(
    //         `${global.BASE_URL}/users/getUser/${user}`,
    //         {
    //           method: "GET",
    //           headers: {
    //             "Content-Type": "application/json",
               
    //           },
    //         }
    //       );
          

    //       const result = await response.json();
          
    //       if(userpwd == result[0].userPwd){
           
    //         storeUserSession(user,result[0].role)
    //         navigation.navigate("Home")
    //       }
    //       else {
    //         Alert.alert("Wrong Password")
    //       }
    //     }
    //     else {Alert.alert("Please enter All fields")}
    
        
    //  } 


        const signIn =async()=>{       
        if(user && userpwd && location && userbound){
        const response = await axios.get(
            `${global.BASE_URL}/users/getUser/${user}`,
           
          );

          const result = await response.json()
          console.log(result)
        }}


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
             // Congrats! You've just stored your first value!
         } catch (error) {
             // There was an error on the native side
         }
     }

    
    
    
    const navigation = useNavigation();


    return (
        <KeyboardAvoidingView >
        <View className='px-2 flex justify-center items-center h-screen  bg-gray-900  '>
            
            {/* Logo VIEW */}
            <View className="w-full border border-yellow-100 h-2/4 bg-blue-900 flex justify-center items-center ">
                <Image source={require('../img/logo.png')} style={{width:180, height:180}} className='w-[270] h-[300] border ' />
                <Text className='font-extrabold text-3xl  text-white'>PSVs MIS</Text>
                <Text className='font-extrabold sm:text-2xl text-lg text-yellow-500'>National Highways & Motorway Police</Text>
            </View>
            
            <View className='w-full border border-gray-200 flex justify-center items-center h-fit bg-slate-600 py-10 '>
               
                <TextInput
                    placeholder='User CNIC'
                    value={user}
                    onChangeText={text=>setUser(text)}
                    placeholderTextColor='grey'
                    keyboardType='numeric'
                    className=' h-[50] p-2 text-lg border bg-slate-100 border-white text-black m-3 rounded-md w-10/12' />

                <TextInput
                    secureTextEntry={true}
                    placeholder='Password'
                    value={userpwd}
                    onChangeText={e => setPwd(e)}
                    placeholderTextColor='grey'
                    
                    className='h-[50]  text-lg p-2 border bg-slate-100 border-white text-black m-3 rounded-md w-10/12' />
                
{/* Location Row   */}
<View className="  w-10/12  flex flex-row  bg-slate-100 rounded-md ">
<View className="   w-4/6 flex flex-row  ">
                <TextInput  
                    placeholder='Location'
                    value={location}
                    onChangeText={e => setlocation(e)}
                    placeholderTextColor='grey'
                    keyboardType='numeric'
                    maxLength={4}
                    className='h-[50] p-2 ml-1e text-black   text-lg' />
                <Text className=" text-black mt-3 font-bold text-lg" > {userbound} </Text>
</View>
<View className=" flex flex-row ">
    <TouchableOpacity onPress={()=>setBound('NB')} className="bg-green-700 p-3 m-1 rounded-md"><Text className="font-bold text-white">North</Text></TouchableOpacity>
    <TouchableOpacity   onPress={()=>setBound('SB')} className="bg-orange-700 p-3 m-1 rounded-md"><Text className="font-bold text-white">South</Text></TouchableOpacity>

</View>
</View>
                <TouchableOpacity onPress={()=>signIn()} 
                    className='p-3 bg-slate-200 text-center rounded-md w-6/12 mt-10' >
                    <Text className='text-blue-500 text-center font-bold text-lg'>Login</Text>

                </TouchableOpacity>
            </View>
            <View className='text-white p-2 w-full flex justify-center  items-center bg-slate-500 border-y  border-yellow-300'>
                <Text className="text-white">Copyright reserved by</Text>
                <Text className="text-white">NHMP Training  College, IT Wing</Text>
            </View>
            
        </View>
        </KeyboardAvoidingView>
    );
}



export default Login;
