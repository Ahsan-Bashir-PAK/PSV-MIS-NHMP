import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { CircleDot, FileDown, FileSymlink, User, UserCircle,Dot, Circle } from 'lucide-react-native';
import { retrieveUserSession } from '../config/functions';
import axios from 'axios';




const FeedBack = () => {

 
    const [feedback, setFeedBack] = useState('');

    useEffect(()=>{
      //  retrieveUserSession(setCurrentUser)
    },[])

function clearAll(){
    setFeedBack("");
   
}

function submitFeedBack () {
    if(feedback="") {Alert.alert("Please Enter Feed Back")} else {

    }
}

   
    return (
        <ScrollView >
            <View className="  flex flex-col   p-2 justify-start">
                <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
                    {/* User Profile TAB*/}
                    <View className=" mt-1 w-full  ">

                        <View className=" p-10  bg-blue-400  rounded-md  w-fit items-center justify-center flex ">
                            <View className=" border-blue-700 shadow-md border rounded-3xl w-full  bg-blue-600 h-[100]  justify-center items-center flex flex-row">
                               <Text className="font-bold  text-white text-xl">Feed Back & Suggestion</Text>
                               
                            </View>
                            <View className="mt-10 flex flex-row-reverse">
                          
                                    
                                
                                <Text className="font-extrabold text-black text-xl">
                                    {/* {`${currentUser.rank}  ${currentUser.name}`} */}
                                </Text>
                                
                            </View>
                            
                        </View>
                    </View>    
                    
              
                    {/* Feed Back Area */}
                    <View className={styles.outerview}>
                        <View className={styles.labelstyle}><Text className="text-black font-bold ">Feed Back </Text></View>
                    <View className="w-4/6 justify-start">
                    <TextInput
                            editable
                            multiline
                            numberOfLines={10}
                            maxLength={500}
                            onChangeText={text => setFeedBack(text)}
                            value={feedback}
                            style={{padding: 10}}
                            className="text-black font-bold mt-0"
                        />

                    </View>
                    </View>   
                     <View className={styles.outerview}>
                        <View className={`${styles.labelstyle} p-2 justify-Center w-full border-r-0 text-red-600`}>
                            <Text className="text-green-600 font-extrabold">* Note: Your valuable Feedback & suggestion helpfull  for improvement of this Application</Text>
                        </View>   
                     </View>   
                    

                    <View className='flex flex-row mt-3 justify-center'>
                        <TouchableOpacity onPress={() => clearAll()} className='bg-[#fc4343] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>RESET</Text></   TouchableOpacity>
                    <TouchableOpacity onPress={()=>submitFeedBack()} className='bg-[#29378a] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>Sumbit Feed Back</Text></TouchableOpacity>
                     </View>

                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
};

export default FeedBack;

const styles = {
    inputViolet:
        'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black ',
    inputVioletSmall:
        'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
    labelstyle:
        'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
    outerview:
        'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900 mt-2'
};