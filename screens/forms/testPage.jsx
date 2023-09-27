import React, { useState,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView,  } from 'react-native';
import { Linking } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { FileSymlink} from 'lucide-react-native';




const TestPage = () => {
 
      // const selectDocument = async ()=> {
      //       try {
      //       const doc = await DocumentPicker.pick({
      //             type:[DocumentPicker.types.images, DocumentPicker.types.pdf],
      //             allowMultiSelection:false
                  
      //       });
      //       console.log(doc);

      //       } catch (err) {
                  
      //       }      
      // }

      




  return (
  <ScrollView >
    <View className="bg-slate-100  flex flex-col  border p-2 justify-start">
      <KeyboardAvoidingView style={{ backgroundColor: 'white' }}>
        {/* Vehicle Information Design Tab */}
        <View className=" mt-1 w-full  ">
          
         <View className=" border bg-yellow-400  rounded-md p-5  w-fit items-center justify-center flex flex-row">
            <FileSymlink  stroke="black" size={35} />
            <Text className="text-black text-lg rounded-md font-bold ">Important Documents Verifications links all over Pakistan</Text>
        </View>

{/* National Repository */}
<View className="border  bg-slate-100 p-2">
                        <Text className="text-black text-lg font-bold"> National Driving Licnese Repoistory (NDLR)</Text>
                        {/* <Text></Text> */}
                        <TouchableOpacity onPress={() => Linking.openURL('https://dlims.punjab.gov.pk/verify/')}>
                        <Text style={{color: 'blue'}}>
                          NDLR, Click here 
                        </Text>
                      </TouchableOpacity>
            </View>


{/* Punjab */}
            <View className="border  bg-slate-100 p-2">
                        <Text className="text-black text-lg font-bold"> Punjab - DL Verification</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('https://dlims.punjab.gov.pk/verify/')}>
                        <Text style={{color: 'blue'}}>
                          DLMIS-Punjab, Click here 
                        </Text>
                      </TouchableOpacity>
            </View>



{/* Punjab  Fitness*/}
<View className="border  bg-slate-200 p-2">
                        <Text className="text-black text-lg font-bold">Punjab Transport Department</Text>
                        <Text className="text-black text-lg">Vehicle Inspection & Verification System (VICS)
                        </Text>
                       <Text> user Name: tcc</Text>
                       <Text> password: tm4862</Text>
                        
                        <TouchableOpacity  onPress={() => Linking.openURL('http://52.29.248.107/VidCentral/AdminApp/Inspection/SearchVIR.aspx')}>
                        <Text className="font-bold text-blue-700">
                          VICS-Punjab, Click here 
                        </Text>
                      </TouchableOpacity>

                      {/* =================== */}

                      <Text className="text-black text-lg font-bold mt-2"> Vehicle Verification System</Text>
                        <Text>user Name: NHMPCR</Text>
                        <Text>password: NHMPCR#93g8*KB</Text>
                        
                        <TouchableOpacity onPress={() => Linking.openURL('https://mvrs.punjab.gov.pk/mvrsapp/')}>
                        <Text style={{color: 'blue'}}>
                          Vehicle Verification, Click here
                          </Text>
                      </TouchableOpacity>
            </View>

{/* KPK */}

<View className="border bg-slate-100 p-2">
                        
                        <Text className="text-black text-lg font-bold"> Vehicle's & Driver's Verification System- KPK</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('http://www.transport.kpdata.gov.pk/Default.aspx')}>
                        <Text style={{color: 'blue'}}>
                          KPK Transport Department (Driving License Verification),Click here
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => Linking.openURL('https://ptpkp.gov.pk/license-authentication-2/')}>
                        <Text style={{color: 'blue'}}>
                          CITY Traffic Police, Peshawar-KPK (Driving License Verification),Click here
                        </Text>
                      </TouchableOpacity>
            </View>
{/* Sindh*/}
<View className="border bg-slate-200 p-2">
                        
                        <Text className="text-black text-lg font-bold"> Driver License Verification System SINDH</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('https://dls.gos.pk/online-verification.html')}>
                        <Text style={{color: 'blue'}}>
                          SINDH (Driving License Verification), Click here
                        </Text>
                      </TouchableOpacity>
                     
            </View>

{/* Balouchistan */}
<View className="border bg-slate-100 p-2 ">
                        
                        <Text className="text-black text-lg font-bold">Driver License Verification System Balochistan</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('https://qtp.gob.pk/main/license-verification/')}>
                        <Text style={{color: 'blue'}}>
                          Quetta (Driving License Verification), Click here
                        </Text>
                      </TouchableOpacity>
                     
            </View>
{/* Gilgit Baltistan*/}
<View className="border bg-slate-200 p-2">
                        
                        <Text className="text-black text-lg font-bold">Driver License Verification System Gilgit Baltistan</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('https://dlmis.gbp.gov.pk/verify/')}>
                        <Text style={{color: 'blue'}}>
                          Gilgit Baltistan (Driving License Verification), Click here
                        </Text>
                      </TouchableOpacity>
                     
            </View>
            
        </View>
       
          

      </KeyboardAvoidingView>
    </View>
  </ScrollView>
);
};

export default TestPage;

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