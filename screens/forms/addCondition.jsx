import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Calendar, CheckSquare, Disc2, Square, SunDim  } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';







const Vehicletype = [
  { label: 'Select Vehicle Type', value: '-' },
  { label: 'BUS', value: 'NHMP' },
  { label: 'VAN', value: 'VAN' },
  { label: 'HIACE', value: 'HIACE' },
  { label: 'HIROOF', value: 'HIROOF' },
  { label: 'COASTER', value: 'COASTER' },
  { label: 'APV', value: 'APV' },
  { label: 'OTHER', value: 'OTHER' },
];

const company_name = [
  { label: 'HTV', value: 'HTV' },
  { label: 'LTV', value: 'LTV' },
  { label: 'PSV', value: 'PSV' },
  { label: 'HTV / PSV', value: 'HTV /PSV' },
  { label: 'LTV / PSV', value: 'LTV /PSV' },
  { label: 'Other', value: 'Others' },

];


const AddCondition = () => {


  // Tyre Manufacturing Date
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  // Tyre expiry Date
  const [tyredate, settyreDate] = useState(new Date())
  const [tyreopen, settyreOpen] = useState(false)
''

  const [tyrecondition, SettyreCondition] = useState("");
  const [conditionstate, setConditionState] = useState("");


  //----------------LIGHTS----------------------
  const [headlight, SetheadLight] =useState("");
  const [backlight, SetbackLight] =useState("");
  const [hazardlight, SethazardLight] =useState("");
  const [foglight, SetfogLight] =useState("");
  const [emergencylight, SetemergencyLight] =useState("");

  //---------------------------------
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //------------------------------------select vehicle type 
//-------------------------------------------dob



  //-------------------------------------------------------
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [currentLiceince, setCurrentLiceince,] = useState(null);
  //----------------------------------------
  const [searchreg, setReg] = useState(null);
  const [setyear, setYear] = useState(null);

  const [acstate, setState] = useState(true);



  function clearall() {

    setReg('')
    setYear('')

  }



  return (
    <ScrollView className=" ">
      <View className="bg-slate-100  flex flex-col   p-2 ">
        <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
          {/* Vehicle Tyre Condition Tab */}
          <View className=" mt-1 w-full  ">

            <View className=" bg-[#facc15]  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold "> Tyre Condition </Text>
              {/* <Navigation stroke="black" size={40}></Navigation> */}
              <Disc2   stroke="#facc15" size={32} fill="black"></Disc2>
            </View>




            {/*  Tyre Manufacture */}
            <View className={styles.outerview} >
              <View className={styles.labelstyle}><Text className="text-black  font-bold">Tyre Manufacture</Text></View>
              <View className=" w-4/6  items-center">
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder='Enter Company'
                  maxLength={50}

                  className=' border-black text-black rounded-md  text-lg' />

              </View>
            </View>
 
            {/* Date of Manufacturing*/}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Date Of Manufacturing</Text></View>
               <View className="w-4/6 items-center ">
               <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={value => {
                setOpen(false);
                setDate(value);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {date.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>
              </View> 

            </View>

            {/*Date Of Expiry */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Expiry Date</Text></View>
              <View className="w-4/6 items-center">
              <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={tyreopen}
              date={tyredate}
              onConfirm={value => {
                settyreOpen(false);
                settyreDate(value);
              }}
              onCancel={() => {
                settyreOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {tyredate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => settyreOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>
              

              </View>
            </View>

            

            {/* Tread Size */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Tread Size</Text></View>
              <View className="w-4/6 items-center">
              <TextInput
                  placeholderTextColor={'grey'}
                  placeholder='3.5 - 2.0'
                  maxLength={20}
                  className=' border-black text-black rounded-md  text-lg' />
              </View>
            </View>

           

 {/* Excellent */}
 <View className={` justify-around flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md  shadow-md  shadow-blue-900 ${tyrecondition=="Excellent"?"bg-green-700":tyrecondition=="Good"?"bg-blue-500":tyrecondition=='Average'?"bg-yellow-500":tyrecondition=="Poor"?"bg-red-400":"bg-white"}`}> 
             <View className=" " >
             <Text className={`text-black `}>{tyrecondition ===""?"Select Tyre Condition":tyrecondition}</Text>
                    
            </View>
            </View>

            {/* Tyre condition Excellent - Good-Poor-Average */}
            <View className=' justify-around flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900'> 
             <TouchableOpacity onPressOut={()=>SettyreCondition('Excellent')}  className="bg-[#3bac44]   rounded-md p-2 justify-around m-1 w-[75]" ><Text className="text-white text-sm text-center  ">Excellent</Text></TouchableOpacity>
             <TouchableOpacity onPressOut={()=>SettyreCondition('Good')}  className="bg-[#3975b1]  rounded-md p-2 justify-around m-1 w-[75]" ><Text className="text-white text-sm text-center  ">Good</Text></TouchableOpacity>
             <TouchableOpacity onPressOut={()=>SettyreCondition('Average')}  className="bg-[#8c6cd6]  rounded-md p-2 justify-around m-1 w-[75]" ><Text className="text-white text-sm text-center  ">Average</Text></TouchableOpacity>
             <TouchableOpacity onPressOut={()=>SettyreCondition('Poor')}  className="bg-[#cf3e3e] rounded-md p-2 justify-around m-1 w-[75]" ><Text className="text-white text-sm text-center  ">Poor</Text></TouchableOpacity>
             
            </View>
           
            {/* Remarks */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold">Remarks</Text></View>
              <View className="w-4/6 items-center">
                <TextInput
                  placeholderTextColor={'grey'}
                  placeholder='Remarks if any'
                  maxLength={30}
                  className=' border-black text-black rounded-md  text-lg' />
              </View>
            </View>
            

            {/* *******************Vehicle Lights************************* */}

            <View className=" mt-1 w-full  ">

              <View className=" bg-yellow-400   m-1 w-fit items-center justify-center flex-row-reverse ">
                <Text className="text-black text-lg rounded-md font-bold ">Lights Info</Text>
                <SunDim   stroke="black" size={30}></SunDim  >
              </View>

              {/* Head - Back- Fog Lights*/}
              <View className=" flex flex-row justify-around  p-1">
              <View className=' flex flex-row border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900'>
                <TouchableOpacity onPress={()=>headlight==""?SetheadLight('HeadLights'):SetheadLight("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${headlight == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${headlight == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Head Lights</Text></TouchableOpacity>

                </View>

              <View className='justify-around flex flex-row  border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900'>
              <TouchableOpacity onPress={()=>backlight==""?SetbackLight('BackLights'):SetbackLight("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${backlight == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${backlight == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Back Lights</Text></TouchableOpacity>

              </View>

              <View className='justify-around flex flex-row  border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900'>
              <TouchableOpacity onPress={()=>foglight==""?SetfogLight('FogLights'):SetfogLight("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${foglight == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${foglight == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Fog Lights</Text></TouchableOpacity>

              </View>
              </View>



              {/* Hazard & Emergency Lights */}
              <View className=" flex flex-row justify-around">
              <View className=' flex flex-row w-[170] border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900'>
              <TouchableOpacity onPress={()=>hazardlight==""?SethazardLight('HazardLights'):SethazardLight("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${hazardlight == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${hazardlight == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Hazard Lights</Text></TouchableOpacity>

              </View>

              <View className='justify-around flex flex-row w-[170] border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900'>
              <TouchableOpacity onPress={()=>emergencylight==""?SetemergencyLight('EmergencyLights'):SetemergencyLight("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${emergencylight == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${emergencylight == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Emergency Lights</Text></TouchableOpacity>

              </View>
              </View>
              
                
              
              

              {/* Buttons Save - Clear -Update */}
              <View className="flex-row items-center justify-center ">
                <View className=" ">
                  <TouchableOpacity className="bg-[#227935]  px-8 py-2 rounded-md m-2">
                    <Text className="text-white  text-lg">Save</Text>
                  </TouchableOpacity>
                </View>

                <View className="">
                  <TouchableOpacity className="bg-[#60a532] px-8 py-2 rounded-md m-2">
                    <Text className="text-white text-lg">Clear</Text>
                  </TouchableOpacity>
                </View>

                <View className="">
                  <TouchableOpacity className="bg-[#29378a] px-7 py-2 rounded-md m-2">
                    <Text className="text-white  text-lg">Update</Text>
                  </TouchableOpacity>
                </View>


              </View>
            </View>

</View>

        </KeyboardAvoidingView>
      </View>
    </ScrollView>
  );
};

export default AddCondition;

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