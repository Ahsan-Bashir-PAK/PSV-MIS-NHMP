import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Calendar, CheckSquare, Disc2, Square, Info } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';


const AddOtherInfo = () => {


  // Tyre Manufacturing Date
  const [numberplate, setnumberPlate] = useState(false)
  const [sidemirror, setsideMirror] = useState(false)
  const [frontwipers, setfrontWipers] = useState(false)
  const [fireext, setfireExt] = useState(false)
  const [firstaid, setfirstAid] = useState(false)
  const [zeroseat, setzeroSeat] = useState(false)
  const [cones, setCones] = useState(false)

  
  //---------------------------------

   // Fire Ext Date
   const [fireextdate, setDate] = useState(new Date())
   const [fireextopen, setOpen] = useState(false)
  
  function clearall() {

    setReg('')
    setYear('')

  }



  return (
    <ScrollView className=" border">
      <View className="bg-slate-100  flex flex-col  justify-center border  ">
        <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
          {/* Other Information Tab */}
          <View className=" w-full h-screen mt-5 P-3 ">

            <View className=" bg-[#facc15]  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold "> Other Information</Text>
              {/* <Navigation stroke="black" size={40}></Navigation> */}
              <Info   stroke="#29378a" size={30} fill="#facc15" />
            </View>


            


            

            <View className=" mt-1 w-full  ">

             

              {/*  */}
              <View className=" flex  justify-around  p-1">
              
              <View className={styles.outerview}>
                <TouchableOpacity onPress={()=>numberplate==""?setnumberPlate('Numberplate'):setnumberPlate("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${numberplate == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${numberplate == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Registeration Number Plate as per pattern</Text></TouchableOpacity>

                </View>
              
              <View className={styles.outerview}>
                <TouchableOpacity onPress={()=>sidemirror==""?setsideMirror('HeadLights'):setsideMirror("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${sidemirror == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${sidemirror == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Side View Mirros</Text></TouchableOpacity>

                </View>

              <View className={styles.outerview}>
              <TouchableOpacity onPress={()=>frontwipers==""?setfrontWipers('BackLights'):setfrontWipers("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${frontwipers == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${frontwipers == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Front Side Wipers</Text></TouchableOpacity>

              </View>

              <View className={styles.outerview}>
              <TouchableOpacity onPress={()=>fireext==""?setfireExt('FogLights'):setfireExt("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${fireext == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${fireext == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Fire Extinguisher</Text></TouchableOpacity>

              </View>
              </View>

            {/*Date Of Expiry Fire Extinguisher*/}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}><Text className="text-black font-bold"> Expiry Date</Text></View>
              <View className="w-4/6 items-center">
              <View className="flex flex-row gap-1">
            
            <DatePicker
              modal
              mode="date"
              open={fireextopen}
              date={fireextdate}
              onConfirm={value => {
                setOpen(false);
                setDate(value);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />

            <Text className="rounded-md  w-4/6   text-black text-center font-bold p-2">
              {fireextdate.toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => settyreOpen(true)}>
              <Calendar stroke="black" fill="white" size={30}></Calendar>
            </TouchableOpacity>
          </View>
              

              </View>
            </View>



              {/* First Aid Box*/}
              <View className={styles.outerview}>
             
              <TouchableOpacity onPress={()=>firstaid==""?setfirstAid('FirstAid'):setfirstAid("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${firstaid == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${firstaid == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">First Aid Box</Text></TouchableOpacity>

              

            
              </View>
              
                 {/* Zero Seat */}
              <View className={styles.outerview}>
              
              <TouchableOpacity onPress={()=>zeroseat==""?setzeroSeat('zeroseat'):setzeroSeat("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${zeroseat == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${zeroseat == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Zero Seat</Text></TouchableOpacity>

              </View>

               {/* Safety Cones */}
               <View className={styles.outerview}>
              
              <TouchableOpacity onPress={()=>cones==""?setCones('cones'):setCones("")}
                 className={`p-2 flex-row gap-1 text-center items-center`}>
                <Square stroke="black" className={`${cones == ""? "block":"hidden"}`} />
                <CheckSquare stroke="black" className={`${cones == ""? "hidden":"block"}`}></CheckSquare>
                <Text className="text-black font-bold">Cones</Text></TouchableOpacity>

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

export default AddOtherInfo;

const styles = {
  inputViolet:
    'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
  inputVioletSmall:
    'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
  labelstyle:
    'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
  outerview:
    'flex flex-row border border-gray-300  rounded-md bg-white shadow-md  shadow-blue-900 p-2 '
};