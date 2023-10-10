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


        <FlatList
            data={mydata}
            renderItem={({ item }) => (

//====================================================================render
                <View className="m-2 bg-gray-400 bottom-2">
                    <View className=" p-2">
                        <Text> Sector {item.sector}</Text>
                    </View>
                    <View>
                        <Text>{item.beat}</Text>
                    </View>
                    <View>
                        <Text>{item.point}</Text>
                    </View>
                    <View>
                        <Text>{item.date + " :" + item.time}</Text>
                    </View>
                    <View>
                        <Text>{item.action}</Text>
                    </View>
                    <View>
                        <Text>{item.officer}</Text>
                    </View>
                </View>

//===============================================================================
            )


            }
        />




    )
}

export default InspectionReport