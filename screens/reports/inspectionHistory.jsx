import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch, Alert, FlatList } from 'react-native';
import { retrieveDriverSession,retrieveVehicleSession } from '../../config/functions';
const mydata = [
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
]
const InspectionReport = ({route}) => {
    const [rptPsv, setRptPsv] =useState("")
    const [rptDriver, setDriver] =useState("")
    const [historyData,setData]= useState([])

   useEffect(()=>{
    retrieveDriverSession(setDriver)
    retrieveVehicleSession(setRptPsv)
   })

//=====================================================================
const dvrInspectionHistory =()=>{
    axios.get(`${global.BASE_URL}/rpt/dvrInspectionHistory/${rptDriver.dvrCnic}`).then(
        async response =>{
            const result = response.data[0]
            result?setData(result):Alert.alert("No checking history of driver")
        }
    )
}
//=========================================================================
const psvInspectionHistory =()=>{
    axios.get(`${global.BASE_URL}/rpt/dvrInspectionHistory/${rptPsv.psvLetter}-${rptPsv.psvModal}-${rptPsv.psvNumber}`).then(
        async response =>{
            const result = response.data[0]
            result?setData(result):Alert.alert("No checking history of Vehicle")
        }
    )
}


//===========================================================================
   if(rptPsv && rptDriver){
    if(route.params){
        if(route.params["params"] =="Driver"){
          dvrInspectionHistory()
        }else{
            psvInspectionHistory()
        }
      }

    return (
        <FlatList
            data={mydata}
            renderItem={({ item, key }) => (

//====================================================================render
    // Sector : {item.sector} 
    <View className="m-2 bg-gray-200 bottom-2 text-black rounded-md shadow-md border border-red-300">
                    <View className="bg-green-500 p-2">
                        <Text className="text-black font-bold"> Time & Date {item.date + " :" + item.time}</Text>
                    </View>
                    <View className="bg-green-500 p-2">
                        <Text className="text-black font-bold"> {key}</Text>
                    </View>
                    <View>
                        <Text> Beat {item.beat}</Text>
                    </View>
                    <View>
                        <Text>Location {item.point}</Text>
                    </View>
                    <View>
                        <Text> Time & Date {item.date + " :" + item.time}</Text>
                    </View>
                    <View>
                        <Text> Action Taken {item.action}</Text>
                    </View>
                    <View>
                        <Text>Officer Name{item.officer}</Text>
                    </View>
                </View>
//===============================================================================
            )
            }
        />
    )
        }
}

export default InspectionReport