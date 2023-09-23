import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Alert, Modal, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { BusFront, Scroll, User, Square, CheckSquare, Search, Navigation } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Bus } from 'lucide-react-native';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios'
import EncryptedStorage from 'react-native-encrypted-storage';
import retrieveUserSession from '../../config';
import { tabactions } from '@react-navigation/native';




const Vehicletype = [ "BUS" ,"HIACE", "HIROOF", "COASTER", "APV", "OTHER"];  
  



const AddVehicle = ({route}) => {

  //const jumptoaction = tabactions.jumpto("Add Documentation", { params });
  const navigation = useNavigation();
  // Vehicle Add states

  const [Vehicle_type, setType] = useState(""); // BUS / HIACE
  const [Vehicle_letter, setLetter] = useState(""); // LES
  const [Vehicle_year, setVehicleYear] = useState("");  //2019
  const [Vehicle_number, setNumber] = useState(""); //5351
  const [vehicle_chasis , setChasis] = useState(""); // chasis
  const [vehcile_engine, setEngine] = useState(""); // engine
  const [vehcile_make, setMake] = useState(""); // make company
  const [vehcile_color, setColor] = useState(""); // color
  
 
  const [vehcile_ac, setAc] = useState(""); // AC Status

  const [vehicle_seats, setVehicleSeats] = useState(""); // seating Capacity

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

 function setPsvFiels(result) {
 //Alert.alert(result.seatingCap);
  setType(result.vehicleType);
  //  setLetter(result.prefixRegNo);
  //  setVehicleYear(result.vehicleModel.toString());
  //  setNumber(result.regNo);
   setChasis(result.chasisNo);
   setEngine(result.engineNo);
   setMake(result.vehicleMake);
   setColor(result.vehicleColor);
   setAc(result.acStatus);
   setVehicleSeats(result.seatingCap.toString());
   setTracker(result.trackerStatus);
   setEmergencyExit(result.exitGate);
   setManfYear(result.manufactureYear.toString());
   setCompany(result.companyName);

 } 





  function clearAllData(){

    
  setType("");

   setLetter("");
   setVehicleYear("22");
   setNumber("");
   setChasis("");
   setEngine("");
   setMake("");
   setColor("");
   setAc("");
   setVehicleSeats("");
   setTracker("");
   setEmergencyExit("");
   setManfYear("");
   setCompany("");

  }

  //---------------------------------BACK END

  const today = new Date()
  const time = new Date().toLocaleTimeString() 
//============================================retriveing vehicle info
useEffect(()=>{
  retrieveUserSession()
  //console.log(route.params)
 
},[])
  //===========================================================vehicle sesion saving 
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
            // There was an error on the native side
        }
    }



//-----------------------------------------------------------search psv
const getPsv = async()=>{
//Alert.alert(` Please Wait Searching  PSV # ${Vehicle_letter}-${Vehicle_year}-${Vehicle_number}`);

  await axios.get(`${global.BASE_URL}/psv/getPsv/${Vehicle_letter}/${Vehicle_year}/${Vehicle_number}`)
  .then(
    (response) =>{
      const result = response.data[0]
      if(result){
        console.log(result)
    setPsvData(result)  //    Use this to set data in fileds   
    setPsvFiels (result)
      }
      else {
        Alert.alert("PSV vehicle not in Record.")
      }
  })
}


//----------------Insert form 1
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
      axios.post(`${global.BASE_URL}/psv/addPsv`, psv )
      .then( (response)=> {

        Alert.alert('Vehicle intial info. saved');
        storeVehicleSession(Vehicle_letter,Vehicle_year,Vehicle_number)
      })
      .catch((error) => {
        console.log(error);
      })
     clearAllData()
    
       navigation.navigate("Add Documentation", {params:{letter:Vehicle_letter, year:Vehicle_year,no:Vehicle_number}})
      
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
    .then(response =>{ Alert.alert("Driver Data Updated")
    storeVehicleSession(Vehicle_letter,Vehicle_year,Vehicle_number)
}
    )
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

            {/* REG LETTER NO */}
            <View className=" w-3/12 items-center border-r ">
              <TextInput
                style={{ backgroundColor: 'white' }}
                placeholderTextColor={'grey'}
                autoCapitalize={'characters'}
                placeholder='CAG'
                maxLength={3}
                onChangeText={e => setLetter(e)}
                value={Vehicle_letter}
                className='   bg-white border-black  text-lg text-black' />
            </View>

            {/* YEAR */}
            <View className="w-3/12 items-center border-r ">
              <TextInput
                
                placeholderTextColor={'grey'}
                placeholder='Year[2019]'
                maxLength={4}
                keyboardType='phone-pad'
                Value={Vehicle_year}
                onChangeText={e => setVehicleYear(e)}
                className='   bg-white border-black text-black    text-lg' />
            </View>

            {/* Number */}
            <View className="w-3/12 items-center ">
              <TextInput
            
                placeholderTextColor={'grey'}
                placeholder='[0000]'
                maxLength={4}
                value={Vehicle_number}
                onChangeText={e=>setNumber(e)}
                // keyboardType='phone-pad'
                className=' bg-white border-black text-black   text-lg' />
            </View>
{/* //Search Button */}
                
                    <TouchableOpacity onPress = {()=>getPsv()} className="flex flex-row rounded-md  justify-center items-center w-1/4 bg-orange-400">
                      
                      <Text className="text-xl font-bold text-black">Search</Text>
                    </TouchableOpacity>
                
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
            <View className={styles.labelstyle}><Text className="text-black font-bold">Vehicle Make By</Text></View>
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
                onChangeText={e => setVehicleSeats(e)}
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