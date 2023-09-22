import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert, Modal, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BusFront, Scroll, User, Square, CheckSquare } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Bus } from 'lucide-react-native';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios'
import EncryptedStorage from 'react-native-encrypted-storage';
import retrieveUserSession from '../../config';




const Vehicletype = [ "BUS" ,"HIACE", "HIROOF", "COASTER", "APV", "OTHER"];  
  



const AddVehicle = () => {

  // Vehicle Add states

  const [Vehicle_type, setType] = useState(""); // LES
  const [Vehicle_letter, setLetter] = useState(""); // LES
  const [Vehicle_year, setYear] = useState("");  //2019
  const [Vehicle_number, setNumber] = useState(""); //5351
  const [vehicle_chasis , setChasis] = useState(""); // chasis
  const [vehcile_engine, setEngine] = useState(""); // engine
  const [vehcile_make, setMake] = useState(""); // make company
  const [vehcile_color, setColor] = useState(""); // color
  
 
  const [vehcile_ac, setAc] = useState(""); // AC Status

  const [vehicle_seats, setSeats] = useState(""); // seating Capacity

  const [vehcile_tracker, setTracker] = useState(""); // tracker

  const [vehcile_emergencyExit, setEmergencyExit] = useState(""); //Emergency Exit

  const [vehcile_manf_year, setManfYear] = useState(""); // Manufacturing Year
  const [vehcile_company, setCompany] = useState(""); // Vehcile Company


// Model States
  const [showModal, setShowModal] = useState(false);

  //=========================setting user session 
  const [currentUser,setCurrentUser] = useState("")
  //---------------------------detting data 
  const [psvData,setPsvData] = useState({})

  //==================getting user seesion data 
async function retrieveUserSession() {
  try {   
      const session = await EncryptedStorage.getItem("user_session");
      if (session !== undefined) {
        setCurrentUser(JSON.parse(session))
      }
  } catch (error) {
      // There was an error on the native side
  }
}

  





  function clearAllData(){

    //console.log("ssssssss");
    setType("");
    setRegNo("");
   setYear("");
   setNumber("");
   setChasis("");
   setEngine("");
   setMake("");
   setColor("");
   setAc("");
   setSeats("");
   setTracker("");
   setEmergencyExit("");
   setManfYear("");
   setCompany("");

  }

  //---------------------------------BACK END

  const today = new Date()
  const time = new Date().toLocaleTimeString()


//-----------------------------------------------------------search psv
const getPsv = async()=>{

  await axios.get(`${global.BASE_URL}/psv/getPsv/${Vehicle_letter+Vehicle_year+Vehicle_number}`)
  .then(
    (response) =>{
      const result = response.data[0]
      if(result){
        console.log(result)
    setPsvData(result)  //    Use this to set data in fileds   
      }
      else {
        Alert.alert("PSV vehicle not in Record.")
      }
  })
}


//----------------add form one 
   const psv ={  
      vehicleType: Vehicle_type,
      prefixRegNo:Vehicle_letter,
      vehicleModel:Vehicle_year,
      regNo:Vehicle_number,
      chasisNo:vehicle_chasis,
      engineNo:vehcile_engine,
      vehicleMake:vehcile_make,
      vehicleColor:vehcile_color,
      acStatus:vehcile_ac,
      seatingCap:vehicle_seats,
      trackerStatus:vehcile_tracker,
      exitGate: vehcile_emergencyExit,
      manufactureYear:vehcile_manf_year,
      companyName:vehcile_company,
      formOneStatus:1,
      addedDate: today,
      addedTime: time,
      addedBy:currentUser.userName,
      addedPoint:currentUser.location

   }

    //-----------------------------------save vehicle 
    const addPsvFormOne = async()=>{
      axios.post(`${global.api}/psv/addPsv`, psv )
      .then( (response)=> {
        Alert.alert('Vehicle intial info. saved');
      })
      .catch((error) => {
        console.log(error);
      })
      clearAll()
      }
   //---------------------------------------------------update psv
   
const upedtedPsv ={
  vehicleType: Vehicle_type,
  chasisNo:vehicle_chasis,
  engineNo:vehcile_engine,
  vehicleMake:vehcile_make,
  vehicleColor:vehcile_color,
  acStatus:vehcile_ac,
  seatingCap:vehicle_seats,
  trackerStatus:vehcile_tracker,
  exitGate: vehcile_emergencyExit,
  manufactureYear:vehcile_manf_year,
  companyName:vehcile_company,
  formOneStatus:1,
  editedOn: today,
  editedTime :time,
  editedBy:currentUser.userName,
  editedPoint:currentUser.location

}


const updatePsv =async ()=>{
  axios.patch(`${global.BASE_URL}/psv/updatePsv/${Vehicle_letter+Vehicle_year+Vehicle_number}`, upedtedPsv
  )
    .then(response => Alert.alert("Driver Data Updated"))
    .catch(error => console.error(error));
  }


 //------------------------------returning UI    
  return (
     <ScrollView className=" ">
      <View className=" flex flex-col ">
        <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>

          {/* Vehicle Information Design Tab */}
          <View className="  mt-1 w-full  ">

            <View className=" bg-yellow-400  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold ">Add Vehicle Information</Text>
              <BusFront stroke="black" size={40}></BusFront>
            </View>
          </View>

          {/*  Select vehcile Type */}
          <View className={`${styles.outerview} `} style={{}} >
            <View className={styles.labelstyle}><Text className="text-black  font-bold">Vehicle Type</Text></View>
            <View className=" w-4/6 items-center ">
              <View className=" m-1  z-50">
              <SelectDropdown
                data= {Vehicletype}
                onSelect={(selectedItem, index) => {
                  setType(selectedItem)            
                }}
                defaultButtonText={Vehicle_type}
                buttonStyle={{
                  backgroundColor:'white',
                    
                }}                
                />
              
            </View>
            </View>
          </View>

          {/* Enter Bus Reg Number [ABC] [2019] [1234] */}
          <View className={styles.outerview} >

            {/* REG NO */}
            <View className=" w-4/12 items-center border-r ">
              <TextInput
                style={{ backgroundColor: 'white' }}
                value={Vehicle_letter}
                onChangText={(e) => setLetter(e)}
                placeholderTextColor={'grey'}
                autoCapitalize={'characters'}
                placeholder='CAG'
                maxLength={3}
                
                className='   bg-white border-black  text-lg text-black' />
            </View>

            {/* YEAR */}
            <View className="w-4/12 items-center border-r ">
              <TextInput
                Value={Vehicle_year}
                onChange={(e) => setYear(e.target.value)}
                placeholderTextColor={'grey'}
                placeholder='Year[2019]'
                maxLength={4}
                className='   bg-white border-black text-black    text-lg' />
            </View>

            {/* Number */}
            <View className="w-4/12 items-center ">
              <TextInput
                onBlur={()=>setShowModal(!showModal)}
                placeholderTextColor={'grey'}
                placeholder='[0000]'
                maxLength={4}
                value={Vehicle_number}
                className=' bg-white border-black text-black   text-lg' />
            </View>
          </View>

{/* Modal Code */}
      <View className="flex-1 w-4/6 z-50 bg-slate-600 opacity-10">
      <Modal
          
          animationType={'slide'}
          transparent={false}
          visible={showModal}
           onRequestClose={() => {
             console.log('Modal has been closed.');
           }}
          >
            <View className=" w-50 bg-slate-200 p-4">
         <Text className="text-black text-lg">1. Initial Record of Vehcile Added</Text>
         <Text className="text-black text-lg">2. Documentation Of Vehicle Added</Text>
         <Text className="text-black text-lg">3. Condition information of Vehicle Added</Text>
         <Text className="text-black text-lg">4. otherninformation of Vehcile Added</Text>
         <Button
              title="Close This View"
              onPress={() => {
                setShowModal(!showModal);
              }}
            />
          </View>
          </Modal> 
          </View>
{/* Modal End */}
          {/*  Add Chaisis No */}
          <View className={styles.outerview} >
            <View className={styles.labelstyle}><Text className="text-black  font-bold">Chassis Number</Text></View>
            <View className=" w-4/6  items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Chassis Number'
                maxLength={50}
                value={vehicle_chasis}
                onChangeText={e => setChasis(e)}
                className=' border-black text-black rounded-md  text-lg' />

            </View>
          </View>

          {/* Add Engine Number */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Engine Number</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Engine Number'
                maxLength={70}
                value={vehcile_engine}
                onChangeText={e => setEngine(e)}
                className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

            </View>
          </View>

          {/* Add Vehicle Make */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Vehicle Make</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='HIGER-YUTONG-DAEWOO'
                maxLength={100}
                value={vehcile_make}
                onChangeText={e => setMake(e)}
                className='   w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

            </View>
          </View>

          {/* Add Vehicle Color */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Vehicle Color</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Vehicle Color'
                maxLength={70}
                value={vehcile_color}
                onChangeText={e => setColor(e)}
                className='  w-8/12 bg-white border-black text-black rounded-md  text-lg text-center' />

            </View>
          </View>

          {/* AC or Non- AC */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">AC or Non AC</Text></View>
            <View className="w-4/6 items-center">
            <TouchableOpacity onPress={()=>vehcile_ac==""?setAc("1"):setAc("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${vehcile_ac == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${vehcile_ac == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">{vehcile_ac=="" ?"AC":" AC (Yes)"}</Text></TouchableOpacity>

            </View>
          </View>

          {/* Seating Capapcity */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Seating Capacity</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='Seating Capacity'
                keyboardType='numeric'
                maxLength={2}
                value={vehicle_seats}
                onChangeText={e => setSeats(e)}
                className=' border-black text-black rounded-md  text-lg' />
            </View>
          </View>

          {/* Tracker Installed (Yes / No) */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Tracker Installed</Text></View>
            <View className="w-4/6 items-center">
            <TouchableOpacity onPress={()=>vehcile_tracker==""?setTracker("1"):setTracker()}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${vehcile_tracker == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${vehcile_tracker == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">{vehcile_tracker=="" ?"Installed":" Tracker Installed"}</Text></TouchableOpacity>
            </View>
          </View>

           {/* Emergency Exit Gate */}
           <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Emergency Exit Gate</Text></View>
            <View className="w-4/6 items-center">
              <TouchableOpacity onPress={()=>vehcile_emergencyExit==""?setEmergencyExit('1'):setEmergencyExit("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${vehcile_emergencyExit == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${vehcile_emergencyExit == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">{vehcile_emergencyExit=="" ?"Installed":"Exit Gate Installed"}</Text></TouchableOpacity>
            </View>
          </View>

           {/* Manufacturing Year */}
           <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Manufacturing Year</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='[2021]'
                maxLength={4}
                minLength={2}
                keyboardType='numeric'
                value={vehcile_manf_year}
                onChangeText={e => setManfYear(e)}
                className=' border-black text-black rounded-md  text-lg' />
            </View>
          </View>

          {/* Company Name */}
          <View className={styles.outerview}>
            <View className={styles.labelstyle}><Text className="text-black font-bold">Company Name</Text></View>
            <View className="w-4/6 items-center">
              <TextInput
                placeholderTextColor={'grey'}
                placeholder='[Faisal Mover, Daewoo, Kohistan]'
                maxLength={30}
                value={vehcile_company}
                onChangeText={e => setCompany(e)}
                className=' border-black text-black rounded-md  text-lg' />
            </View>
          </View>

           {/* Buttons Save - Clear -Update */}
           <View className="flex-row items-center justify-center ">
                <View className=" ">
                  <TouchableOpacity  onPress ={()=>addPsvFormOne()} className="bg-[#227935]  px-8 py-2 rounded-md m-2">
                    <Text className="text-white  text-lg">Save</Text>
                  </TouchableOpacity>
                </View>


                <View className="">
                  <TouchableOpacity onPress={()=>updatePsv()}  className="bg-[#29378a] px-7 py-2 rounded-md m-2">
                    <Text className="text-white  text-lg">Update</Text>
                  </TouchableOpacity>
                </View>
                <View className="" >
                  <TouchableOpacity onPress={()=>clearAllData()} 
                  className="bg-[#a54932] px-8 py-2 rounded-md m-2">
                    <Text className="text-white text-lg">Clear</Text>
                  </TouchableOpacity>
                </View>


              </View>


        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default AddVehicle;

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




// onPress ={()=>setShowModal(!showModal)}