import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {BusFront, Navigation, Scroll, User} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import {Bus} from 'lucide-react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { retrieveDriverSession, retrieveVehicleSession,retrieveUserSession } from '../../config/functions';
const TripReport = ({route}) => {
const navigation = useNavigation();
const [currentUser,setCurrentUser] = useState("")
  //=========================states
const [v_psvNo, setpsvNo] =useState('')
const [v_routeStatus, setrouteStatus] =useState('')
const [v_routedate, setroutedate] =useState('')
const [v_companyName, setcompanyName] =useState('')
const [v_subCompanyName, setSubCompanyName] =useState('')
const [v_routePath, setroutePath] =useState('')
const [v_fitnessStatus, setfitnessStatus] =useState('')
const [v_fitnessdate, setfitnessdate] =useState('')
const [v_tyreStatus, settyreStatus] =useState('')
const [v_tyredate, settyredate] =useState('')
const [v_tyrecondition, settyrecondition] =useState('')
const [v_trackerStaus, settrackerStaus] =useState('')
const [v_exitGate, setexitGate] =useState('')
const [v_fireExt, setfireExt] =useState('')
const [v_fireExtdate, setfireExtdate] =useState('')
const [v_regPlate, setregPlate] =useState('')
const [d_tripCount, settripCount] =useState('')
const [v_seats, setseats] =useState('')
const [v_onBoardpassenger, setonBoardpassenger] =useState('')
const [d_dvrLicenseNo, setdvrLicenseNo] =useState('')
const [d_licenseType, setlicenseType] =useState('')
const [d_licenseStatus, setlicenseStatus] =useState('')
const [d_L_expiry, setDLexpiry] =useState('')
const [d_name, setDname] = useState('');
const [actionTaken, setActionTaken] =useState('')
const [roadworthy, setRoadWorthy] =useState('')
const [warning, setWarning] =useState('')
const [returned, setReturned] =useState('')
const [Enforcement, setEnforced] =useState('')
const [remarks, setremarks] =useState('') 
const [rptPsv, setRptPsv] =useState("")
const [rptDriver, setDriver] =useState("")

const [dvrCompany, setdvrCompany] =useState("")
const [dvrSubCompany, setdvrSubCompany] =useState("")
//================================================text box states
const [lastInspection, setLastInspection] =useState("") 
const [dvrlastInspection, setdvrLastInspection] =useState("") 
//===============================================================inspection report states
const [dvrlastinsp,setDvrinsp]= useState("")
const [psvlastinsp,setPsvinsp]= useState("")
useEffect(()=>{
retrieveUserSession(setCurrentUser)
retrieveDriverSession(setDriver)
retrieveVehicleSession(setRptPsv)
},[ ])
// useFocusEffect(()=>{
//   Alert.alert("Record Updated")
// })
////////////////
function setActionTakenWorthy () {
  setRoadWorthy("Road Worthy");
  setWarning("");
  setReturned("");
  setEnforced("");
  setActionTaken("Road Worthy")
}
function setActionTakenWarning () {
  setRoadWorthy("");
  
  setWarning("Warned");

  setEnforced("");
  if(returned!=undefined){
  setActionTaken("Warned" + " " + returned)
} else {
  setActionTaken("Warned" )
}

}
function setActionTakenEnforced () {
  setRoadWorthy("");
  
  setWarning("");

  setEnforced("Enforced");

  setActionTaken("Enforced" + " "+ returned )
}

function setActionTakenReturned () {
  setRoadWorthy("");


  setActionTaken("Returned" + " "+ warning + Enforcement )
  if(warning!=undefined && Enforcement != undefined) {
   setActionTaken("Returned" + " "+ warning + Enforcement )
} else {
  setActionTaken("Returned")
} 
}

function clearAllActionTaken () {
  setRoadWorthy("");
  
  setWarning("");
  
  setEnforced("");
  setActionTaken("")
  setReturned("")
}
  //================================================report generaation



 async function previousInspection (){


    await axios.get(`${global.BASE_URL}/rpt/dvrlastcheck/${rptDriver.dvrCnic}`).then(
      async response =>{
        const result = response.data[0]
        if (result){
          setDvrinsp(result)
        }
        else{
          setDvrinsp("N/A")
        }
      }
    )
    //=============================================psv last inspection 
    await axios.get(`${global.BASE_URL}/rpt/psvlastcheck/${rptPsv.psvLetter}-${rptPsv.psvModal}-${rptPsv.psvNumber}`).then(
      async response =>{
        const result = response.data[0]
        if(result){
          setPsvinsp(result)
        }
        else{
          setPsvinsp("N/A")
        }
      }
    )
 

  }
  async function getInspectionreport() {
      if(rptPsv && rptDriver){
     
        try {
      
          await axios
            .get(
              `${global.BASE_URL}/psv/getPsv/${rptPsv.psvLetter}/${rptPsv.psvModal}/${rptPsv.psvNumber}`
            )
            .then(async response => {
              const psvDetail = response.data[0];
              if (psvDetail) {
                
                //------------------------getting driver data
                await axios
                  .get(`${global.BASE_URL}/dvr/getDriver/${rptDriver.dvrCnic}`)
                  .then(async response => {
                    const driverDetail = response.data[0];
                    if (driverDetail) {
                     
                      //-------------------------geeting inspection report rpt/inspectPsv/
                      await axios
                        .get(`${global.BASE_URL}/rpt/inspectPsv/${rptPsv.psvLetter}/${rptPsv.psvModal}/${rptPsv.psvNumber}/${rptDriver.dvrCnic}/${currentUser.location}`)
                        .then(async response => {
                          const inspection = response.data[0];
                          if (inspection) {                            
                                  setTripData(inspection)
                            await EncryptedStorage.setItem(
                              'Report',
                              JSON.stringify({
                                psvData: psvDetail,
                                dvrData: driverDetail,
                              }),
                            );
                       
                          } else {
                            Alert.alert('Please Provide all Values');
                          }
                        });
                    } else {
                      navigation.navigate('Home');
                      Alert.alert('Driver not in record');
                    }
                  });
              } else {
                navigation.navigate('Home');
                Alert.alert('PSV not in record');
               
              }
            });
        } catch (error) {
          console.log(error);
        }
 

  }}
//=============================================================//calling use effect
// settripdata
function setTripData(tripdata){
  
    setLastInspection(psvlastinsp.addedDate?psvlastinsp.addedDate.split("T")[0].split("-").reverse().join("-") +" " + " at "+ psvlastinsp.addedTime.split("T")[1].slice(0,5) + " " + "-" + psvlastinsp.chkPoint : " "+" " + "-"+ psvlastinsp.addedTime?psvlastinsp.addedTime:"" + " " + ":" + psvlastinsp.chkPoint?psvlastinsp.chkPoint:"")
    setpsvNo(tripdata.psvNo)
    setcompanyName(tripdata.psvCompany);
    setSubCompanyName(tripdata.psvSubCompany);
    setexitGate(tripdata.exitGate);
   
    setfireExt(tripdata.fireValidity);
    setfireExtdate(tripdata.fireExpiry);
    setfitnessStatus(tripdata.fitnessValidity);
    setfitnessdate(tripdata.fitnessExpiryDate);
    setroutePath(tripdata.routeFrom + " " + " to " + " " +tripdata.routeTo);
    setrouteStatus(tripdata.routeValidity);
    setroutedate(tripdata.routeExpiryDate);
    settyredate(tripdata.tyreExpiry);
    settyreStatus(tripdata.tyreStatus);
    settyrecondition(tripdata.tyreCondition);
    settrackerStaus(tripdata.trackerStatus);
    setregPlate(tripdata.numPlate);
    setseats(tripdata.seatingCap);
    
    settripCount(tripdata.dvrTripcount)
    setlicenseType(tripdata.licenseType);
    setlicenseStatus(tripdata.licenseValidity)
    setdvrLicenseNo(tripdata.licenseNo)
    setDname(tripdata.driverName)
    setDLexpiry(tripdata.licenseExpiry)
    setdvrCompany(tripdata.dvrCompany);
    setdvrSubCompany(tripdata.dvrSubCompany);
    setdvrLastInspection(dvrlastinsp.addedDate?dvrlastinsp.addedDate.split("T")[0].split("-").reverse().join("-") +" " + "at"+" "+ dvrlastinsp.addedTime.split("T")[1].slice(0,5) + " " + "-" + dvrlastinsp.chkPoint : " "+" " + "-"+ dvrlastinsp.addedTime?dvrlastinsp.addedTime:"" + " " + "-" + dvrlastinsp.chkPoint?dvrlastinsp.chkPoint:"N/A")

}
  //===============================save report
  const today = new Date();
  const time = new Date().toLocaleTimeString();
  const reportData = {

    psvNo: v_psvNo,
    psvCompany: v_companyName,
    psvSubCompany:v_subCompanyName,
    routeStatus: v_routeStatus,
    routePath: v_routePath,
    fitnessStatus: v_fitnessStatus,
    tyreStatus: v_tyreStatus,
    trackerStaus: v_trackerStaus,
    exitGate: v_exitGate,
    fireExt: v_fireExt,
    regPlate: v_regPlate,
    // dvrTripCount: d_tripCount,
    seats: v_seats,
    onBoardpassenger: v_onBoardpassenger,
    dvrCnic:rptDriver.dvrCnic,
    dvrLicenseNo: d_dvrLicenseNo,
    licenseType: d_licenseType,
    licenseStatus: d_licenseStatus,
    dvrCompany:dvrCompany,
    dvrSubCompany:dvrSubCompany,
    actionTaken: actionTaken,
    remarks: remarks,
    addedBy: currentUser.userName,
    addedDate: today,
    addedTime:time,
    chkPoint: currentUser.location,
  };
   const saveReport = async () => {
  //async function saveReport (){
    
    if(v_onBoardpassenger == "" || v_onBoardpassenger == undefined ) {
      Alert.alert("Please enter onboarded passengers")
    } else if (actionTaken == "" || actionTaken == undefined) {
      Alert.alert("Please Take action against PSV")
    } else {
    await axios
      .post(`${global.BASE_URL}/rpt/addinspection`, reportData)
      .then(response => {
        Alert.alert('Trip Report Saved', ' ', [
             
          {text: 'Home', onPress: () =>  navigation.navigate("Home")},
        ]);
          
      })
      .catch(error => {
        console.log(error);
      });
        
    } 
   // clearAll();
  }
  
  if(!rptPsv && !rptDriver){
    
    return (
      <View className="flex justify-center,items-center">
        <Text className ='text-2xl font-bold'>Loading ......</Text>
        </View>
    )
  }
//==========================Note : data will be fetched if and only if sates are apulated and alse added page  focus for data sate changes 
  else{
    
    navigation.addListener('focus',
    ()=>{
      getInspectionreport()
      // previousInspection ()


    })
    getInspectionreport()
    // previousInspection ()
 return (
    <ScrollView >
      <View className="bg-slate-100  flex flex-col  p-2 justify-start">
        
          {/* Vehicle Information Design Tab */}
          <View className=" mt-1 w-full  ">
            <View className=" bg-yellow-400  rounded-md p-1  w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold ">
                VEHICLE INSPECTION REPORT
              </Text>
              <BusFront stroke="black" size={40}></BusFront>
            </View>
            
            {/* Show Vehicle Number */}
            <View className=" bg-[#5ec44a] p-1 rounded-md m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold ">
                Report of BUS No: {v_psvNo}
              </Text>
            </View>
           
           {/*  Last inspection date */}
           <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">
                  Inspection History
                </Text>
              </View>
              <TouchableOpacity className="w-4/6 items-center" onPress={()=>navigation.navigate("Inspection History",{params:"Vehicle"})}>
              <View className="w-4/6 items-center">
                <Text className="text-black font-bold">Click to View</Text> 
               </View>
            </TouchableOpacity>
            </View>

            {/*  Company Name */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold">Name of Company</Text>
              </View>
              <TouchableOpacity className="w-full px-1 rounded-md" onPress={()=>navigation.navigate("Add Vehicle",{params:"report"})} >
              <View className=" w-4/6  items-center">
                    <Text className="text-black font-bold">{v_companyName}</Text>
              </View>
                </TouchableOpacity>
            </View>
            {/* Sub Company */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">
                  Sub Company
                </Text>
              </View>
              <TouchableOpacity className="w-full px-1 rounded-md" onPress={()=>navigation.navigate("Add Vehicle",{params:"report"})} >
              <View className=" w-4/6  items-center">
                    <Text className="text-black font-bold">{v_subCompanyName}</Text>
              </View>
              </TouchableOpacity>
            </View>

            {/*  Route Permit Date */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold ">  Route Permit</Text>
              </View>
              <TouchableOpacity className="w-full px-1 rounded-md" onPress={()=>navigation.navigate("Add Documentation",{params:"report"})}>
              <View className={`${v_routeStatus == "Expired" ? "bg-red-600 text-white": "bg-green-500 text-black "} w-4/6 items-center rounded-md `}>
              
                    <Text className={`${v_routeStatus == "Expired" ? "bg-red-600 text-white": "bg-green-500 text-black "} font-bold `}>{v_routeStatus} :{v_routedate?v_routedate.split('T')[0].split("-").reverse().join("-"):""}
                    
                     </Text>
              </View>
                </TouchableOpacity>
            </View>
            {/*  Route Path */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold">Route From -To</Text>
              </View>
                <TouchableOpacity className="w-full px-1 rounded-md" >
              <View className=" w-4/6  items-center">
                    <Text className="text-black font-bold">{v_routePath}</Text>
              </View>
                </TouchableOpacity>
            </View>
            {/*  Fitness */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black  font-bold">Fitness </Text>
              </View>
              <TouchableOpacity className="w-full px-1 rounded-md" onPress={()=>navigation.navigate("Add Documentation",{params:"report"})}>
              <View className={`${v_fitnessStatus == "Expired" ? "bg-red-600": "bg-green-500 "} w-4/6 items-center rounded-md`}>
                  <Text className={`${v_fitnessStatus == "Expired" ? "text-white font-bold": "text-black font-bold"}`}>{v_fitnessStatus}:{v_fitnessdate?v_fitnessdate.split('T')[0].split("-").reverse().join("-"):""}</Text>
              </View>
                </TouchableOpacity>
            </View>
            {/* Tyre Condition */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Tyre Condition</Text>
              </View>
                <TouchableOpacity className="w-full px-1 rounded-md" onPress={()=>navigation.navigate("Add Condition",{params:"report"})}>
              <View className={`${v_tyrecondition == "Poor" ? "bg-red-600": "bg-green-500 "} w-4/6 items-center rounded-md`}>
                  {/* Tyre Expiry yet to be decided */}
                  <Text className={`${v_tyrecondition == "Poor" ? "text-white font-bold": "text-black font-bold"}`} > {v_tyrecondition}</Text>
              </View>
                </TouchableOpacity>
            </View>
            {/* Tracker Installed */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Tracker Installed</Text>
              </View>
              <TouchableOpacity className="w-full px-1 rounded-md" onPress={()=>navigation.navigate("Add Vehicle",{params:"report"})}>
              <View className={`${v_trackerStaus == "Not Installed" ? "bg-red-600": "bg-green-500 "} w-4/6 items-center rounded-md`}>
                  <Text className={`${v_trackerStaus == "Not Installed" ? "text-white  font-bold": "text-black font-bold"}`} >{v_trackerStaus}</Text>
              </View>
                </TouchableOpacity>
            </View>
            {/* Emergency Exit */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Emergency Exit</Text>
              </View>
                 <TouchableOpacity className="w-full px-1 rounded-md" onPress={()=>navigation.navigate("Add Vehicle",{params:"report"})}>
              <View className={`${v_exitGate == "Not Installed" ? "bg-red-600": "bg-green-500 "} w-4/6 items-center rounded-md`}>
                  <Text className={`${v_exitGate == "Not Installed" ? "text-white font-bold": "text-black font-bold"}`}>{v_exitGate}</Text>
              </View>
                </TouchableOpacity>
            </View>
            {/* Fire Extinguisher*/}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Fire Extinguisher</Text>
              </View>
               <TouchableOpacity className="w-full px-1 rounded-md" onPress={()=>navigation.navigate("Other Info",{params:"report"})}>
              <View className={`${v_fireExt == "Expired" ? "bg-red-600": "bg-green-500 "} w-4/6 items-center rounded-md`}>
                  <Text className={`${v_fireExt == "Expired" ? "text-white font-bold": "text-black font-bold"}`}>{v_fireExt} : {v_fireExtdate?v_fireExtdate.split("T")[0].split("-").reverse().join("-"):""}</Text>
              </View>
                </TouchableOpacity>
            </View>
            {/* Number Plate Status */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">
                  Number Plate Status
                </Text>
              </View>
          <TouchableOpacity className="w-full px-1 rounded-md" onPress={()=>navigation.navigate("Other Info",{params:"report"})}>
              <View className={`${v_regPlate == "Out of pattern" ? "bg-red-600": "bg-green-500 "} w-4/6 items-center rounded-md`}>
                <Text className={`${v_regPlate == "Out of pattern" ? "text-white font-bold": "text-black font-bold rounded-md"}`}>{v_regPlate}</Text>  
              </View>
                </TouchableOpacity>
            </View>
          
            {/* Seating Capacity */}
            <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Seating Capacity</Text>
              </View>
              <View className="w-4/6 items-center">
               <Text className="text-black font-bold"> {v_seats} </Text> 
              </View>
            </View>
                {/* on Boarded Passenger */}
                <View className={styles.outerview}>
              <View className={`${styles.labelstyle} text-center items-center`}>
                <Text className="text-black font-bold ">on Boarded Passenger *</Text>
              </View>
            <View className={`${styles.outerview}  text-center justify-center items-center  w-3/5`}>
              <View className="text-center items-center flex">
              <TextInput
                  placeholderTextColor={'grey'}
                  placeholder=" Enter Boarded Passenger"
                  maxLength={3} 
                  keyboardType="phone-pad"
                  onChangeText={e => setonBoardpassenger(e)}
                  value={v_onBoardpassenger}
                  className="text-black justify-center text-center pl-4"
                  />
              </View>
           </View>
            </View>

                {/* Driver Complete information TAB */}
            <View className=" bg-[#5ec44a] p-1  rounded-md m-1 w-fit items-center justify-center flex-row-reverse ">
              <Text className="text-black text-lg rounded-md font-bold ">
                Details of Driver: {d_name}
              </Text>
            </View>
            {/* Driver Name - License Type - License Number */}
                 <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">License Details</Text>
              </View>
                <TouchableOpacity className="w-full px-1 rounded-md" onPress={()=>navigation.navigate("AddDrivernew",{params:"report"})}>
              <View className=  {`${d_licenseStatus == "Expired" ? "bg-red-600 font-bold rounded-md text-white": "bg-green-500 font-bold text-black rounded-md"} w-4/6 items-center `}>
                <Text className={`${d_licenseStatus == "Expired" ? "bg-red-600 font-bold rounded-md text-white": "bg-green-500 font-bold text-black rounded-md"} w-4/6 items-center `}>{d_licenseStatus} :{d_licenseType} : {d_dvrLicenseNo}  
                </Text>
              </View>
                </TouchableOpacity>
            </View>
          {/* Driver License Expiry */}
          <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">License Expiry </Text>
              </View>
              <TouchableOpacity className=" w-4/6 items-center" onPress={()=>navigation.navigate("AddDrivernew",{params:"report"})}>
              <View className=" w-4/6 items-center">
                <Text className="text-black font-bold">{d_L_expiry?d_L_expiry.split('T')[0].split("-").reverse().join("-"):""}</Text>
              </View>
              </TouchableOpacity>
            </View>

              {/* Driver Trip Count */}
              <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">
                  Inspection History
                </Text>
              </View>
              <TouchableOpacity className="w-4/6 items-center" onPress={()=>navigation.navigate("Inspection History",{params:"Driver"})}>
              <View className="w-4/6 items-center">
                <Text className="text-black font-bold">Click to View</Text> 
               </View>
            </TouchableOpacity>
            </View>

               {/* Driver company */}
               <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">
                  Driver Company
                </Text>
              </View>
              <TouchableOpacity className="w-4/6 items-center" onPress={()=>navigation.navigate("AddDrivernew",{params:"report"})}>
              <View className="w-4/6 items-center">
                <Text className="text-black font-bold">{dvrCompany}</Text> 
               </View>
            </TouchableOpacity>
            </View>

             {/* Driver sub- company */}
             <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">
                  Driver Sub-Company
                </Text>
              </View>
              <TouchableOpacity className="w-4/6 items-center" onPress={()=>navigation.navigate("AddDrivernew",{params:"report"})}>
              <View className="w-4/6 items-center">
                <Text className="text-black font-bold">{dvrSubCompany}</Text> 
               </View>
               </TouchableOpacity>
            </View>

             {/* Action Taken by officer */}
             <View className={styles.outerview}>
              <View className={styles.labelstyle}>
                <Text className="text-black font-bold">Action Taken *</Text>
              </View>
              <View className="w-3/6 items-center">
                <Text className="text-black font-bold ">{actionTaken}</Text>
                
              </View>
              <TouchableOpacity onPress={()=>clearAllActionTaken()} className="bg-red-500 rounded-md px-2">
                    <Text className="font-bold text-white p-1 ">Clear All</Text>
                </TouchableOpacity>
            </View>
            {/* Road Worthy */}
            <View className="  p-2 justify-around flex flex-row  bg-slate-100 items-center text-center">
              <TouchableOpacity  onPress ={()=>setActionTakenWorthy()} className=" bg-[#44cf56] border border-gray-300 w-1/5 p-1 py-3 items-center rounded-md shadow-md  shadow-blue-900">
                <Text className="text-black font-bold">Road Worthy</Text>
              </TouchableOpacity>
              {/* warning */}
              <TouchableOpacity onPress ={()=>setActionTakenWarning()} className=" bg-[#e2d741] border border-gray-300 w-1/5 p-3 items-center rounded-md shadow-md  shadow-blue-900 ">
                <Text className="text-black font-bold">Warning</Text>
              </TouchableOpacity>
               
              {/* Enforced */}
              <TouchableOpacity onPress ={()=>setActionTakenEnforced()} className="border bg-[#eca240] border-gray-300 p-3 w-1/5 rounded-md  shadow-md  shadow-blue-900 items-center ">
                <Text className="text-black font-bold">Enforced</Text>
              </TouchableOpacity>
              {/* Returned*/}
              <TouchableOpacity onPress ={()=>setActionTakenReturned()}  className="border bg-[#db5151] border-gray-300 p-3 w-1/5 rounded-md shadow-md items-center   shadow-blue-900">
                <Text className="text-black font-bold">Returned</Text>
              </TouchableOpacity>
            
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
                  numberOfLines={3}
                  maxLength={200}
                  
                  onChangeText={text => setremarks(text)}
                 value={remarks}
                  style={{padding: 10}}
                  className="text-black font-bold"
               />
              </View>
            </View>
                       
            {/* Buttons Save - Clear -Update */}
            <View className="flex-row items-center justify-center  w-fit">
              <View className="  justify center items-center w-full  ">
                <TouchableOpacity
                  onPress={() => saveReport()}
                  className="bg-[#227935] items-center  w-full rounded-md m-2 p-1">
                  <Text className="text-white  text-lg">Save Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        
      </View>
    </ScrollView>
  );
};
}
 
export default TripReport;
const styles = {
  inputViolet:
    'w-full  border border-1 border-violet-400 rounded-md m-1 font-bold px-3 py-1 text-black',
  inputVioletSmall:
    'w-6/12  border border-1 border-violet-400 rounded-md mx-1 font-bold px-3 py-1 text-black',
  labelstyle:
    'text-center items-center justify-center w-2/6  border-r  border-slate-400  ',
  outerview:
    'flex flex-row mb-1 mx-2 border border-gray-300 p-1 rounded-md bg-white shadow-md  shadow-blue-900 ',
};