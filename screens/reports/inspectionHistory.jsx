import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Switch, Alert, FlatList } from 'react-native';

const mydata = [
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
    { sector: "North3", beat: "Beat-11", point: "78Nb", date: "2023-09-08", time: "16:24", action: "Returned", officer: "PO Ahsan " },
]
const InspectionReport = () => {

    return (

        <View>
                <View className=" bg-yellow-400  rounded-md p-2 m-1 w-fit items-center justify-center flex-row-reverse ">
                    <Text className="text-black font-bold text-lg">Inspection History</Text>
                </View>
        
        <FlatList
            data={mydata}
            renderItem={({ item, key }) => (

//====================================================================render
    // Sector : {item.sector} 
    <View className="m-2 bg-gray-200 p-2 text-black rounded-md shadow-md border border-gray-400  shadow-black">
                    <View className="bg-grey-800 p-1 flex flex-row rounded-md">
                        <Text className={styles.container}>Date & Time</Text>
                        <Text className="text-black font-bold">{item.date + " :" + item.time}</Text>
                    </View>
                   
                    <View className="bg-gray-100 p-1 flex flex-row rounded-t-md " >
                        <Text className={styles.container}> Beat </Text>
                        <Text>{item.beat}</Text>
                    </View>
                    <View className="bg-gray-100 p-1 flex flex-row">
                        <Text className={styles.container}> Location </Text>
                        <Text>{item.point}</Text>
                    </View>
                    
                    <View className="bg-gray-100 p-1 flex flex-row ">
                        <Text className={styles.container}> Action Taken </Text>
                        <Text>{item.action}</Text>
                    </View>
                    <View className="bg-gray-100 p-1 flex flex-row rounded-b-md ">
                        <Text className={styles.container}> Inspected By </Text>
                        <Text>{item.officer}</Text>
                    </View>
                </View>
  
                
//===============================================================================
            )


            }
        />

</View>


    )
}
const styles ={
    container: 
        "text-black font-bold font-serif  w-[100]  border-r-2  border-r-gray-400 border-dotted  mr-5",
}

export default InspectionReport

