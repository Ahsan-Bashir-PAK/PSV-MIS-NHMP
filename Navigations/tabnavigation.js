import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View, Text} from 'react-native';

import AddVehicle from '../screens/forms/addVehicle';
import { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
import {  User, PlusCircle, FilePlus, BadgeInfo, Wrench, ShieldQuestion, PlusSquare  } from 'lucide-react-native';

import AddDocumentation from '../screens/forms/addDocumentation';
import AddCondition from '../screens/forms/addCondition';
import AddOtherInfo from '../screens/forms/addOtherinfo';
import TripReport from '../screens/forms/tripReport';
import AddDrivernew from '../screens/forms/addDrivernew';
import AddCompany from '../screens/forms/addCompany';


const Tab =  createBottomTabNavigator();

const MyTabs = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="AddDrivernew" component={AddDrivernew} 
      options={{  
        unmountOnBlur:true,
        tabBarIcon:()=>(
          <User  stroke="#0332BB" size={25} fill='white'/>
        )
    }}
  
      />
        <Tab.Screen name="Add Vehicle"  component={AddVehicle} 
        options={{
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <PlusCircle  stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        />
        <Tab.Screen name="Add Documentation"  component={AddDocumentation}
        options={{
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <FilePlus  stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        />
         <Tab.Screen name="Add Condition"  component={AddCondition}
        options={{
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <ShieldQuestion stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        />

<Tab.Screen name="Other Info"  component={AddOtherInfo}
        options={{
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <BadgeInfo  stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        />
<Tab.Screen name="AddCompany"  component={AddCompany}
        options={{
          unmountOnBlur:true,
          tabBarIcon:()=>(
            <PlusSquare  stroke="#0332BB" size={25} fill='white' />
          )
      }}
        
        />

      </Tab.Navigator>
      // </NavigationContainer>
  );
};

export default MyTabs