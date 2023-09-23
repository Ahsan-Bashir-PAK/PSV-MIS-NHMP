import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {BusFront, Scroll, User} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import {Bus} from 'lucide-react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const TripReport = () => {
  const [currentUser, setCurrentUser] = useState({});

  //=========================states
const [v_psvNo, setpsvNo] =useState()
const [v_routeStatus, setrouteStatus] =useState()
const [v_companyName, setcompanyName] =useState()
const [v_routePath, setroutePath] =useState()
const [v_fitnessStatus, setfitnessStatus] =useState()
const [v_tyreStatus, settyreStatus] =useState()
const [v_trackerStaus, settrackerStaus] =useState()
const [v_exitGate, setexitGate] =useState()
const [v_fireExt, setfireExt] =useState()
const [v_regPlate, setregPlate] =useState()
const [v_tripCount, settripCount] =useState()
const [v_seats, setseats] =useState()
const [v_onBoardpassenger, setonBoardpassenger] =useState()
const [d_dvrLicenseNo, setdvrLicenseNo] =useState()
const [d_licenseType, setlicenseType] =useState()
const [d_licenseStatus, setlicenseStatus] =useState()
const [actionTaken, setactionTaken] =useState()
const [remarks, setremarks] =useState() 
const [roadworthy, setroadworthy] = useState()
const [warning, setwarning] = useState()
const [returned, setreturned] = useState()
const [enforced, setenforced] = useState()

  useEffect(() => {
    retrieveUserSession();
    retrieveReportSession()
  }, []);


  //getting user seesion data
  async function retrieveUserSession() {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      if (session !== undefined) {
        setCurrentUser(JSON.parse(session));
      }
    } catch (error) {
      console.log(error);
    }
  }
  //===============getting report data

async function retrieveReportSession() {
  try {   
      const session = await EncryptedStorage.getItem('Report');
  
      if (session !== undefined) {
      
        console.log("trip report data===========",JSON.parse(session).tripReport)  // data for report
        console.log("vehicledata===========",JSON.parse(session).psvData)          //data of vehicle
        console.log(" driver data===========",JSON.parse(session).dvrData)         // driver data
        
      }
  } catch (error) {
      // There was an error on the native side
  }
}

  //===============================save report

  const today = new Date()
const time = new Date().toLocaleTimeString()

  const reportData = {
    psvNo:v_psvNo,
    companyName:v_companyName,
    routeStatus:v_routeStatus,
    routePath:v_routePath,
    fitnessStatus:v_fitnessStatus,
    tyreStatus:v_tyreStatus,
    trackerStaus:v_trackerStaus,
    exitGate:v_exitGate ,
    fireExt:v_fireExt ,
    regPlate:v_regPlate ,
    tripCount:v_tripCount ,
    seats:v_seats,
    onBoardpassenger:v_onBoardpassenger ,
    dvrLicenseNo:d_dvrLicenseNo,
    licenseType: d_licenseType,
    licenseStatus:d_licenseStatus,
    actionTaken:actionTaken,
    remarks: remarks,
    addedBy: currentUser.userName,
    addedDate: today,
    chkPoint:currentUser.location,
  };

  const saveReport = async () => {
    await axios
      .post(`${global.BASE_URL}/rpt/addinspection`, reportData)
      .then(response => {
        Alert.alert('Data inserted successfully');
      })
      .catch(error => {
        console.log(error);
      });

    clearAll();
  };

  //const [] = useState("");

  return (
    <ScrollView className=" border">
      <View className="bg-slate-100  flex flex-col h-screen border p-2 justify-center">
        <KeyboardAvoidingView style={{backgroundColor: 'white'}}>
          {/* Vehicle Information Design Tab */}
          <View className=" mt-1 w-full  ">
            <View className=" bg-yellow-400  rounded-md p-1  w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold ">
                Vehicle Trip Report
              </Text>
              <BusFront stroke="black" size={40}></BusFront>
            </View>
            {/* Vehicle Number */}
            <View className=" bg-yellow-600  rounded-md m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold ">
                Report of BUS No: {v_psvNo}
              </Text>
            </View>

            {/*  Company Name */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold">Company Name</Text>
              </View>
              <View className=" w-4/6  items-center">
                <Text 
                  className=" border-black text-black rounded-md  text-lg text-center dis"
                >{v_companyName}</Text>
              </View>
            </View>

            {/*  Route Permit Date */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold">Route Permit</Text>
              </View>
              <View className=" w-4/6  items-center">
                <TouchableOpacity>
                    <Text>{v_routeStatus}</Text>
                </TouchableOpacity>
              </View>
            </View>

          {/*  Route Path */}
          <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold">Route From -To</Text>
              </View>
              <View className=" w-4/6  items-center">
                <TouchableOpacity>
                    <Text>{v_routeStatus}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/*  Fitness */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold">Fitness </Text>
              </View>
              <View className=" w-4/6  items-center">
                <TouchableOpacity>
                  <Text>{v_fitnessStatus}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Tyre Condition */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Tyre Condition</Text>
              </View>
              <View className="w-4/6 items-center">
                <TouchableOpacity>
                  <Text>{v_tyreStatus}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Tracker Installed */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Tracker Installed</Text>
              </View>
              <View className="w-4/6 items-center">
                <TouchableOpacity>
                  <Text>{v_trackerStaus}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Emergecny Exit */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Emergency Exit</Text>
              </View>
              <View className="w-4/6 items-center">
                <TouchableOpacity>
                  <Text>{v_exitGate}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Fire Extinguisher*/}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Fire Extinguihser</Text>
              </View>
              <View className="w-4/6 items-center">
              <TouchableOpacity>
                  <Text>{v_fireExt}</Text>
                </TouchableOpacity>
                              </View>
            </View>

            {/* Number Plate Status */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">
                  Number Plate Status
                </Text>
              </View>
              <View className="w-4/6 items-center">
              <TouchableOpacity>
                <Text>{v_regPlate}</Text>  
                </TouchableOpacity>
              </View>
            </View>

            {/* Vehicle Trip Count */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">
                  Vehicle Trip Count(24 Hrs)
                </Text>
              </View>
              <View className="w-4/6 items-center">
                <Text>{v_tripCount}</Text> 
               </View>
            </View>

            {/* Seating Capacity */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Seating Capacity</Text>
              </View>
              <View className="w-4/6 items-center">
               <Text> {v_seats} </Text> 
              </View>
            </View>

            {/* Remarks */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Remarks</Text>
              </View>
              <View className="w-4/6 items-left">
              <TextInput
                  editable
                  multiline
                  numberOfLines={5}
                  maxLength={200}
                  
                  onChangeText={text => setremarks(text)}
                 value={remarks}
                  style={{padding: 10}}
               />
              </View>
            </View>

            {/* Road Worthy */}
            <View className="  p-2 flex flex-row  bg-slate-100">
              <TouchableOpacity className=" bg-[#44cf56] border border-gray-300 p-3 w-2/4 rounded-md shadow-md  shadow-blue-900">
                <Text className="text-black font-bold">Road Worthy</Text>
              </TouchableOpacity>

              {/* warning */}
              <TouchableOpacity className=" bg-[#e2d741] border border-gray-300 w-2/4 p-3 rounded-md shadow-md  shadow-blue-900">
                <Text className="text-black font-bold">Warning</Text>
              </TouchableOpacity>
            </View>
            <View className="  p-2 flex flex-row bg-slate-100">
              
              {/* Returned*/}
              <TouchableOpacity className="border bg-[#eca240] border-gray-300 p-3 w-2/4 rounded-md shadow-md  shadow-blue-900">
                <Text className="text-black font-bold">Returned</Text>
              </TouchableOpacity>
              
              {/* Enforced */}
              <TouchableOpacity className="border bg-[#db5151] border-gray-300 p-3 w-2/4 rounded-md  shadow-md  shadow-blue-900">
                <Text className="text-black font-bold">Enforced</Text>
              </TouchableOpacity>
            </View>

            {/* Action Taken by officer */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Action Taken</Text>
              </View>
              <View className="w-4/6 items-center">
                <Text>{roadworthy} {warning} {returned} {enforced} </Text>
              </View>
            </View>

            {/* Buttons Save - Clear -Update */}
            <View className="flex-row items-center justify-center  w-fit">
              <View className="  justify center items-center w-full  ">
                <TouchableOpacity
                  onPress={() => saveReport()}
                  className="bg-[#227935] items-center  w-full rounded-md m-2 p-1">
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
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900',
};



