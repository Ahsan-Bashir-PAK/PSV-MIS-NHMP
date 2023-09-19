import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BusFront, Scroll, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { Bus } from 'lucide-react-native';




const TripReport = () => {
 



  return (
  <ScrollView className=" border">
    <View className="bg-slate-100  flex flex-col h-screen border p-2 justify-center">
      <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
        {/* Vehicle Information Design Tab */}
        <View className=" mt-1 w-full  ">
          
         <View className=" bg-yellow-400  rounded-md p-1  w-fit items-center justify-center flex-row-reverse ">
            <Text className="text-black text-lg rounded-md font-bold ">Vehicle Trip Report </Text>
            <BusFront stroke="black" size={40}></BusFront>
        </View>
{/* Vehicle Number */}
        <View className=" bg-yellow-600  rounded-md m-1 w-fit items-center justify-center flex-row-reverse ">
            <Text className="text-black text-lg rounded-md font-bold ">Report of BUS No: LES-19-1111 </Text>
            
        </View> 

            {/*  Company NAme */}
                  <View className={styles.outerview} >
                    <View className={styles.labelstyle}><Text className="text-black  font-bold">Company Name</Text></View>
                    <View className=" w-4/6  items-center">
                    <TextInput
                          placeholderTextColor={'grey'}
                          placeholder='Company Name'
                          maxLength={50}
                    
                          className=' border-black text-black rounded-md  text-lg text-center' />

                        
                    </View>
              </View>

            {/*  Route Permit Date */}
            <View className={styles.outerview} >
                    <View className={styles.labelstyle}><Text className="text-black  font-bold">Route Permit</Text></View>
                    <View className=" w-4/6  items-center">
                    <TextInput
                          placeholderTextColor={'grey'}
                          placeholder='Route Permit'
                          maxLength={50}
                    
                          className=' border-black text-black rounded-md  text-lg text-center' />

                        
                    </View>
              </View>

              
              {/*  Fitness */}
              <View className={styles.outerview} >
                    <View className={styles.labelstyle}><Text className="text-black  font-bold">Fitness</Text></View>
                    <View className=" w-4/6  items-center">
                        <TextInput
                          placeholderTextColor={'grey'}
                          placeholder='Fitness'
                          maxLength={50}
                    
                          className=' border-black text-black rounded-md  text-lg' />
                        
                    </View>
              </View>
              {/* Tyre Condition */}
              <View className={styles.outerview}>
                    <View className={styles.labelstyle}><Text className="text-black font-bold">Tyre Condition</Text></View>
                    <View className="w-4/6 items-center">
                        <TextInput
                          placeholderTextColor={'grey'}
                          placeholder='Tyre Condition'
                          maxLength={50}
                          className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />
                        
                    </View>
              </View>
              {/* Tracker Installed */}
              <View className={styles.outerview}>
                    <View className={styles.labelstyle}><Text className="text-black font-bold">Tracker Installed</Text></View>
                    <View className="w-4/6 items-center">
                        <TextInput
                          placeholderTextColor={'grey'}
                          placeholder='Tracker Installed'
                          maxLength={50}
                          
                          className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />
                        
                    </View>
              </View>
              {/* Emergecny Exit */}
              <View className={styles.outerview}>
                    <View className={styles.labelstyle}><Text className="text-black font-bold">Emergency Exit</Text></View>
                    <View className="w-4/6 items-center">
                        <TextInput
                          placeholderTextColor={'grey'}
                          placeholder='Emergency Exit (Y/N)'
                          maxLength={70}
                          
                          className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />
                        
                    </View>
              </View>
              {/* Fire Extinguisher*/}
              <View className={styles.outerview}>
                    <View className={styles.labelstyle}><Text className="text-black font-bold">Fire Extinguihser</Text></View>
                    <View className="w-4/6 items-center">
                    <TextInput
                          placeholderTextColor={'grey'}
                          placeholder='Yes / No'
                          maxLength={50}
                    
                          className=' border-black text-black rounded-md  text-lg' />

                 
                    </View>
              </View>

              {/* Number Plate Status */}
              <View className={styles.outerview}>
                    <View className={styles.labelstyle}><Text className="text-black font-bold">Number Plate Status</Text></View>
                    <View className="w-4/6 items-center">
                    <TextInput
                              placeholderTextColor={'grey'}
                              placeholder=' Yes / No'
                              maxLength={3}
                              className=' border-black text-black rounded-md  text-lg' />
                    </View>
              </View>

               {/* Vehicle Trip Count */}
               <View className={styles.outerview}>
                    <View className={styles.labelstyle}><Text className="text-black font-bold">Vehicle Trip Count(24 Hrs)</Text></View>
                    <View className="w-4/6 items-center">
                    <TextInput
                          placeholderTextColor={'grey'}
                          placeholder='Count (24 Hrs) '
                          maxLength={50}
                    
                          className=' border-black text-black rounded-md  text-lg' />

                    </View>
              </View>

              {/* Seating Capacity */}
              <View className={styles.outerview}>
                    <View className={styles.labelstyle}><Text className="text-black font-bold">Seating Capacity</Text></View>
                    <View className="w-4/6 items-center">
                    <TextInput
                          placeholderTextColor={'grey'}
                          placeholder='Seaating Capacity'
                          maxLength={50}
                    
                          className=' border-black text-black rounded-md  text-lg' />

                    </View>
              </View>

                {/* Remarks */}
                <View className={styles.outerview}>
                    <View className={styles.labelstyle}><Text className="text-black font-bold">Remarks</Text></View>
                    <View className="w-4/6 items-center">
                    <TextInput
                          placeholderTextColor={'grey'}
                          placeholder='Remarks'
                          maxLength={70}
                          
                          className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />
                    </View>
              </View>

              {/* Road Worthy */}
            <View className="  p-2 flex flex-row  bg-slate-100">             
              <View className=" bg-[#44cf56] border border-gray-300 p-3 w-2/4 rounded-md shadow-md  shadow-blue-900">
                    <Text className="text-black font-bold">Road Worthy</Text>
                    
              </View>
              {/* warning */}
              <View className=" bg-[#e2d741] border border-gray-300 w-2/4 p-3 rounded-md shadow-md  shadow-blue-900">
                        <Text className="text-black font-bold">Warning</Text>
                    
                </View>
                </View>
                <View className="  p-2 flex flex-row bg-slate-100">   
                {/* Returned*/}
              <View className="border bg-[#eca240] border-gray-300 p-3 w-2/4 rounded-md shadow-md  shadow-blue-900">
                        <Text className="text-black font-bold">Returned</Text>
                    
                </View>
                {/* Enforced */}
              <View className="border bg-[#db5151] border-gray-300 p-3 w-2/4 rounded-md  shadow-md  shadow-blue-900">
                        <Text className="text-black font-bold">Enforced</Text>
                    
                </View>
                </View>
               

            {/* Buttons Save - Clear -Update */}
            <View className="flex-row items-center justify-center  w-fit">
                    <View className="  justify center items-center w-full  ">
                      <TouchableOpacity className="bg-[#227935] items-center  w-full rounded-md m-2 p-1">
                        <Text className="text-white  text-lg">Save</Text>
                      </TouchableOpacity>
                      </View>

                      
                    
              </View>
        </View>
       
          

      </KeyboardAvoidingView>
    </View>
  </ScrollView>
);
};

export default TripReport;

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