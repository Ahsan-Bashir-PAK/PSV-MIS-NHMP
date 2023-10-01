import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { FileDown, FileSymlink } from 'lucide-react-native';




const Profile = () => {


    return (
        <ScrollView >
            <View className="bg-slate-100  flex flex-col  border p-2 justify-start">
                <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
                    {/* Vehicle Information Design Tab */}
                    <View className=" mt-1 w-full  ">

                        <View className=" border bg-yellow-400  rounded-md  w-fit items-center justify-center flex flex-row">
                            
                            <Text className="text-black text-lg rounded-md font-bold ">Profile</Text>
                        </View>

                        {/* User Information TaB */}
                        <View className="border  bg-slate-100 p-2 mt-2">
                           
                        </View>

                        {/* Old Password*/}
                        <View className="border  bg-slate-100 p-2 mt-2 flex flex-row">
                           <View className={styles.outerview}>
                                <Text>Change Password</Text>
                            </View>
                           <View>
                           <TextInput
                                placeholder='old Password'
                               // value={location}
                               // onChangeText={e => setlocation(e)}
                                placeholderTextColor='grey'
                                keyboardType='number-pad'
                                maxLength={10}
                                
                                className='h-[50] pl-5 text-lg  rounded-md border  bg-white border-blue-400 text-black  ' />
                           </View>
                        </View>

                        {/* Change Password*/}
                        <View className="border  bg-slate-100 p-2 mt-2 flex flex-row">
                           <View className={styles.outerview}>
                                <Text>Change Password</Text>
                            </View>
                           <View>
                           <TextInput
                                placeholder='New Password'
                               // value={location}
                               // onChangeText={e => setlocation(e)}
                                placeholderTextColor='grey'
                                keyboardType='number-pad'
                                maxLength={10}
                                
                                className='h-[50] pl-5 text-lg  rounded-md border  bg-white border-blue-400 text-black  ' />
                           </View>
                        </View>
                    </View>

                    <View className='flex flex-row mt-3'>
                        <TouchableOpacity onPress={() => clearall()} className='bg-[#fc4343] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>RESET</Text></   TouchableOpacity>
            <TouchableOpacity className='bg-[#29378a] px-5 py-2 rounded-md m-2'><Text className='text-white font-extrabold'>SAVE</Text></TouchableOpacity>
          </View>

                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
};

export default Profile;

const styles = {
    inputViolet:
        'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
    inputVioletSmall:
        'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
    labelstyle:
        'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
    outerview:
        'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900'
};