import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Building2} from 'lucide-react-native';
import { retrieveUserSession } from '../../config/functions';
import axios from 'axios';
import '../../config';

const Addcompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [subCompany, setSubCompany] = useState('');
  const [terminal, setTerminal] = useState('');
  const [managerName, setManagerName] = useState('');
  const [managerCellNumber, setManagerCellNumber] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerCellNumber, setOwnerCellNumber] = useState('');
  const [currentUser,setCurrentUser] =useState("")
  const [compAdress, setCompanyAddres] =useState("")

  const today = new Date()
  const time = new Date().toLocaleTimeString() 

useEffect (()=>{
    retrieveUserSession(setCurrentUser)
})


const company ={
        companyName:companyName,
        subOffice:subCompany,
        address:compAdress,
        managerName:managerName,
        managerCell:managerCellNumber,
        ownerName:ownerName,
        ownerCell : ownerCellNumber,
        addedDate: today,
        addedTime: time,
        addedBy:currentUser.userName,
        addedPoint:currentUser.location
}





 async function AddCompanyData(){
    if(companyName == "") {Alert.alert("Enter Company name")}
        else if (managerName=="") {Alert.alert("Enter Manager name")}
        else if (managerCellNumber=="" || managerCellNumber.length !=11 )
           {Alert.alert("Enter Manager Cell Number or complete digit")}
        else if (ownerName=="") {Alert.alert("Enter Owner name")}
        else if (ownerCellNumber=="" || ownerCellNumber.length !=11) 
        {Alert.alert("Enter Owner Cell Number or complete digit")}
        else if (compAdress=="") {Alert.alert("Enter company address.")}
      else {
    axios.post(`${global.BASE_URL}/cmp/addCompany`, company )
    .then( (response)=> {

      Alert.alert('New Company Saved');
      
    })
    .catch((error) => {
      console.log(error);
    })

    clearAllData()
   // navigation.navigate("Home")
       
 } 
 }
  const clearAllData = () => {
    // Reset the form fields
    setCompanyName('');
    setSubCompany('');
    setTerminal('');
    setManagerName('');
    setManagerCellNumber('');
    setOwnerCellNumber('');
    setOwnerName('');
    setCompanyAddres('');
  }

  return (
    
    <KeyboardAvoidingView
    behavior={Platform.OS === 'android' ? 'height' : null}
     enabled>
 
      <ScrollView keyboardShouldPersistTaps='handled'>
   

    <View style={styles.container}>
        
        {/* Vehicle Information Design Tab */}
        <View className="  mt-1 w-full  ">

        <View className=" bg-yellow-400  rounded-md p-1 m-1 w-fit items-center justify-center flex-row-reverse ">
        <Text className="text-black text-lg rounded-md font-bold ">Companies</Text>
        <Building2 stroke="black" size={35} / >
        </View>
        </View>

      <Text style={styles.label}>Company Name:</Text>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={text => setCompanyName(text)}
        placeholder="Enter company name"
        placeholderTextColor={'grey'}
        className="text-black"
      />

      <Text style={styles.label}>Terminal:</Text>
      <TextInput
        style={styles.input}
        value={subCompany}
        onChangeText={text => setSubCompany(text)}
        placeholder="Enter sub company"
        placeholderTextColor={'grey'}
        className="text-black"
      />



      <Text style={styles.label}>Manager Name:</Text>
      <TextInput
        style={styles.input}
        value={managerName}
        onChangeText={text => setManagerName(text)}
        placeholder="Enter manager name"
        placeholderTextColor={'grey'}
        className="text-black"
      />

      <Text style={styles.label}>Manager Cell Number:</Text>
      <TextInput
        style={styles.input}
        value={managerCellNumber}
        onChangeText={text => setManagerCellNumber(text)}
        placeholder="Enter manager cell number"
        maxLength={11}
        keyboardType='number-pad'
        placeholderTextColor={'grey'}
        className="text-black"
      />

    <Text style={styles.label}>Owner Name:</Text>
      <TextInput
        style={styles.input}
        value={ownerName}
        onChangeText={text => setOwnerName(text)}
        placeholder="Enter manager name"
        placeholderTextColor={'grey'}
        className="text-black"
      />

      <Text style={styles.label}>Owner Cell Number:</Text>
      <TextInput
        style={styles.input}
        value={ownerCellNumber}
        onChangeText={text => setOwnerCellNumber(text)}
        placeholder="Enter owner cell number"
        maxLength={11}
        keyboardType='number-pad'
        placeholderTextColor={'grey'}
        className="text-black"
      />

        
      <Text style={styles.label}>Address:</Text>
      <TextInput
        style={styles.input}
        value={compAdress}
        onChangeText={text => setCompanyAddres(text)}
        placeholder="Enter Address"
        maxLength={100}
        placeholderTextColor={'grey'}
        className="text-black"
        
      />

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={()=>AddCompanyData()} style={[styles.button, { marginRight: 10 }]}>
          <Text style={{ color: 'white' }}>Save Company</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={clearAllData} style={[styles.button, { backgroundColor: 'gray' }]}>
          <Text style={{ color: 'white' }}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
      
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color:'black'
  
  },
  input: {
    borderWidth: 1,
    borderColor: '#123456',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#227935',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Addcompany