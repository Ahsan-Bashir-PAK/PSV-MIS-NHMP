import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {View, Text} from 'react-native';

import AddVehicle from '../screens/forms/addVehicle';
import { getTabBarHeight } from '@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar';
import { UserCircle, User, PlusCircle, FilePlus, BadgeInfo, Wrench, ShieldQuestion  } from 'lucide-react-native';

import AddDocumentation from '../screens/forms/addDocumentation';
import AddCondition from '../screens/forms/addCondition';
import AddOtherInfo from '../screens/forms/addOtherinfo';
import TripReport from '../screens/forms/tripReport';
import AddDrivernew from '../screens/forms/addDrivernew';
import TestPage from '../screens/forms/testPage';


const Tab =  createBottomTabNavigator();

const MyTabs = () => {
  return (
    // <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Add Driver" component={AddDrivernew} options={{
        
        tabBarIcon:()=>(
          <User  stroke="#0332BB" size={35} fill='white'/>
        )
    }}
  
      />
        <Tab.Screen name="Add Vehicle"  component={AddVehicle} 
        options={{
          tabBarIcon:()=>(
            <PlusCircle  stroke="#0332BB" size={35} fill='white' />
          )
      }}
        
        />
        <Tab.Screen name="Add Documentation"  component={AddDocumentation}
        options={{
        
          tabBarIcon:()=>(
            <FilePlus  stroke="#0332BB" size={35} fill='white' />
          )
      }}
        
        />
         <Tab.Screen name="Add Condition"  component={AddCondition}
        options={{
        
          tabBarIcon:()=>(
            <ShieldQuestion stroke="#0332BB" size={35} fill='white' />
          )
      }}
        
        />

<Tab.Screen name="Other Info"  component={AddOtherInfo}
        options={{
        
          tabBarIcon:()=>(
            <BadgeInfo  stroke="#0332BB" size={35} fill='white' />
          )
      }}
        
        />


      </Tab.Navigator>
      // </NavigationContainer>
  );
};

export default MyTabs