import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { FileDown, FileSymlink } from 'lucide-react-native';




const Downloads = () => {


    return (
        <ScrollView >
            <View className="bg-slate-100  flex flex-col  border p-2 justify-start">
                <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
                    {/* Vehicle Information Design Tab */}
                    <View className=" mt-1 w-full  ">

                        <View className=" border bg-yellow-400  rounded-md p-5  w-fit items-center justify-center flex flex-row">
                            <FileDown stroke="black" size={35} />
                            <Text className="text-black text-lg rounded-md font-bold ">Downloads</Text>
                        </View>

                        {/* NHSO */}
                        <View className="border  bg-slate-100 p-2 mt-2">
                            <Text className="text-black text-lg font-bold"> National Highway Safety Ordinance</Text>
                            {/* <Text></Text> */}
                            <TouchableOpacity onPress={() => Linking.openURL('https://nhmp.pitb.gov.pk/system/files/NHSO.pdf#overlay-context=RightToAccess')}>
                                <Text style={{ color: 'blue' }}>
                                    NHSO-2000, Click Here 
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Goods Dimension*/}
                        <View className="border  bg-slate-100 p-2 mt-2">
                            <Text className="text-black text-lg font-bold"> National Highway Dimension Rules for Vehicles</Text>
                            {/* <Text></Text> */}
                            <TouchableOpacity onPress={() => Linking.openURL('https://nhmp.pitb.gov.pk/system/files/National%20Highways%20Dimension%20Rules.pdf#overlay-context=RightToAccess')}>
                                <Text style={{ color: 'blue' }}>
                                    Dimesnion Rules, Click Here 
                                </Text>
                            </TouchableOpacity>
                        </View>



                    </View>



                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    );
};

export default Downloads;

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