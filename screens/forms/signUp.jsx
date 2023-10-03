import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch, Alert } from 'react-native';

import { User } from 'lucide-react-native';
import '../../config'



import SelectDropdown from 'react-native-select-dropdown';
//import axios from 'axios';

const user_status = [ "User" ,"Admin"]; 
const region = [ "Central" ,"North", "South"]; 

const ranks = [ "SPO" ,"PO", "APO", "JPO", "Non-Uniform"];  
const Zone = [ "Motorway Central-I" ,"Motorway Central-II", "Motorway North", "N-5 Central", "N-5 North", "N-5 South", "West", "Training College", "CPO-HQ-Islamabad"];  





const SignUp = () => {

 



const [searchcnic, setCnic] = useState("");
const [officername, setOfcrname] = useState("");
const [officercnic, setOfcrcnic] = useState("");
const [officercell, setOfcrcell] = useState("");
const [officerpwd, setOfcrpwd] = useState("");

const [officerrank, setOfcrrank] = useState("");

const [officerbelt, setOfcrbelt] = useState("");
const [officerzone, setOfcrzone] = useState("");
const [officersector, setOfcrsector] = useState("");
const [officerbeat, setOfcrbeat] = useState("");

const [officerrole, setOfcrrole] = useState("");

 // Clear Data
const  clearAll =()=>{
  

  setCnic("");
  setOfcrname("");
  setOfcrcnic("");
  setOfcrcell("");
  setOfcrpwd("");
  setOfcrrank("");
  setOfcrzone("");
  setOfcrsector("");
  setOfcrbeat("");
  setOfcrrole("");
  setOfcrbelt("");
  
}


const user ={
  userCnic:officercnic,
  userName:officername,
  userPwd:officerpwd,
  cellNo :officercell ,
  rank:officerrank,
  beltNo:officerbelt,
  role:officerrole,
  status:"Active",
  beatId :officerbeat ,
  sectorId: officersector,
  zoneId:officerzone

}

//------------------------save user
const saveUser = async () => {
  if(officercnic && officerbelt && officercell && officername && officerpwd && officerrank && officersector && officerrole && officerzone && officerbeat ) {
      await fetch(`${global.BASE_URL}/users/addUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }) 
        .then(response => {
          if (response.ok) {
            Alert.alert('User created successfully');
            clearAll();
          } else {
            Alert.alert('Failed to insert data');
          }
  
        })
  
        .catch(error => {
          Alert.alert(error);
        });
      } else { Alert.alert("Note: Please Fill All Fields");}
      }

return (
    <ScrollView className=" ">
    <View className=" flex flex-col   ">
      <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>

        {/* Sing Up page */}
        <View className="  mt-1 w-full  ">

          <View className=" bg-yellow-400  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
            <Text className="text-black text-lg rounded-md font-bold ">User SignUp</Text>
            <User stroke="black" size={30}></User>
          </View>
        </View>

        {/*  FIND */}
        <View className={`${styles.outerview} `} style={{}} >
          
          <View className=" w-4/6  border border-gray-200 items-center ">
              <TextInput 
              placeholderTextColor={'grey'}
              placeholder='Search User CNIC'
              maxLength={13}
              keyboardType='numeric'
              value={searchcnic}            
              onChangeText={e=>setCnic(e)}
              className=' text-black rounded-md  text-lg' />
              
          </View>
          <View className="flex flex-row-reverse  bg-orange-2200  justify-center items-center w-2/6"><Text className="text-black text-lg  font-bold">Search</Text>
          
          {/* <Search stroke='black' /> */}
          </View>
        </View>
        
        {/*   officer Name */}
        <View className={styles.outerview} >
          <View className={styles.labelstyle}><Text className="text-black  font-bold">Officer Name</Text></View>
          <View className=" w-4/6  items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Officer Name'
              maxLength={60}
              value={officername}
              onChangeText={e=>setOfcrname(e)}
              className=' border-black text-black rounded-md  text-lg' />

          </View>
        </View>

{/*   officer CNIC */}
<View className={styles.outerview} >
          <View className={styles.labelstyle}><Text className="text-black  font-bold">Officer CNIC</Text></View>
          <View className=" w-4/6  items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='0000000000000'
              keyboardType='numeric'
              maxLength={13}
              onChangeText={e=>setOfcrcnic(e)}
              value={officercnic}
              className=' border-black text-black rounded-md  text-lg' />

          </View>
        </View>


        {/* Cell No */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Cell Number</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='00000000000'
              maxLength={11}
              keyboardType='numeric'
              value={officercell}
              onChangeText={e=>setOfcrcell(e)}
              className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>


        {/* Password */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">User Password</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Password'
              maxLength={10}
              secureTextEntry={true}
              value={officerpwd}
              onChangeText={e=>setOfcrpwd(e)}
              className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>

        {/* Rank*/}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Rank</Text></View>
          <View className="w-4/6 items-center ">
          <View className=" m-1  z-50">
              <SelectDropdown
                data= {ranks}
                
                onSelect={(selectedItem, index) => {
                  setOfcrrank(selectedItem);
                }}
                defaultButtonText="Select Rank"
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>

          </View>
        </View>

        {/* Belt No. */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Belt No.</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Belt No'
              maxLength={10}
              value={officerbelt}
              onChangeText={e=>setOfcrbelt(e)}
              className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

          </View>
        </View>

        {/* Zone */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Zone</Text></View>
          <View className="w-4/6 items-center">
          <View className=" m-1  z-50">
              <SelectDropdown
                data= {Zone}
                value={officerzone}
                onSelect={(selectedItem, index) => {
                  setOfcrzone(selectedItem);
                }}
                defaultButtonText='Select Zone'
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>


          </View>
        </View>

        {/* Sector */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Sector</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='Sector'
              value={officersector}
              maxLength={11}
              onChangeText={e=>setOfcrsector(e)}
              className=' border-black text-black rounded-md  text-lg' />
          </View>
        </View>

        {/* Beat */}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Beat</Text></View>
          <View className="w-4/6 items-center">
            <TextInput
              placeholderTextColor={'grey'}
              placeholder='(Beat-09)'
              value={officerbeat}
              maxLength={15}
              onChangeText={e=>setOfcrbeat(e)}
              className=' border-black text-black rounded-md  text-lg' />
          </View>
        </View>

        {/* Role*/}
        <View className={styles.outerview}>
          <View className={styles.labelstyle}><Text className="text-black font-bold">Role</Text></View>
          <View className="w-4/6 items-center">
          
          <View className=" m-1  z-50">
              <SelectDropdown
                data= {user_status}
                value={officerrole}
                onSelect={(selectedItem, index) => {
                  setOfcrrole(selectedItem);
                }}
                defaultButtonText='Select Status'
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>
          </View>
        </View>

         {/* Buttons Save - Clear -Update */}
         <View className="flex-row items-center justify-center ">
              <View className=" ">
                <TouchableOpacity onPress= {()=>saveUser()} className="bg-[#227935]  px-8 py-2 rounded-md m-2">
                  <Text className="text-white  text-lg">Save</Text>
                </TouchableOpacity>
              </View>


              <View className="">
                <TouchableOpacity className="bg-[#29378a] px-7 py-2 rounded-md m-2">
                  <Text className="text-white  text-lg">Update</Text>
                </TouchableOpacity>
              </View>
              <View className="">
                <TouchableOpacity onPress={()=>clearAll()} className="bg-[#a54932] px-8 py-2 rounded-md m-2">
                  <Text className="text-white text-lg">Clear</Text>
                </TouchableOpacity>
              </View>


            </View>


      </KeyboardAvoidingView>
    </View>
  </ScrollView>
  );
};

export default SignUp;

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