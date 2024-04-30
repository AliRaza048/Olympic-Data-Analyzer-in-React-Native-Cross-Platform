import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BrowserRouter, Route, Routes, Link, NavLink } from 'react-router-dom';
import MedalTallyTable from './MedalTallyTable';
import OverallAnalysis from './OverallAnalysis';
import jsonData from './dataset.json';
import { Image } from 'react-native';
import OlympicImage from './images/OlympicImage.png';
import MedalTallyIconAndroid from 'react-native-vector-icons/FontAwesome5';
import Module2IconAndroid from 'react-native-vector-icons/MaterialCommunityIcons';
import MedalTallyIconWeb from './images/medaltallyicon.svg';
import Module2IconWeb from './images/module2.svg'
import { DrawerItemList } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

const CustomDrawerContent = (props) => {
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => props.navigation.navigate('Login'));
  };

  return (
    <ScrollView>
      <DrawerItemList {...props} />
      <TouchableOpacity onPress={handleLogout} >
        <Text>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



const Drawer = createDrawerNavigator();
const MyDrawer = () => {
  
  return Platform.OS === 'web' ? (
    <BrowserRouter>
      <Sidebar>
        <Text style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:20, fontWeight:'bold', fontSize:20}}>Olympics Data Analyser</Text>
        <Image source={OlympicImage} style={{ width: '100%', height: '16vw', marginBottom:10, borderBottom: '1px solid #8888',}} />
        <LinkStyle to="/"><MedalTallyIconWeb width={30} height={30} />Medal Tally</LinkStyle>
        <LinkStyle to="/overallanalysis" ><Module2IconWeb  width={40} height={40} />Overall Analysis</LinkStyle>
      </Sidebar>
      <Content>
        <Routes>
          <Route exact path='/' element={<MedalTallyTable />} />
          <Route path='/overallanalysis' Component={OverallAnalysis} />
        </Routes>
      </Content>
    </BrowserRouter>
  ) : (
    
    // <NavigationContainer>
      // <Drawer.Navigator initialRouteName="Menu">
        <Drawer.Navigator initialRouteName="Menu" drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Medal Tally" children={() => <MedalTallyTable data={jsonData} />} options={{
            drawerIcon: ({size, color}) => (
            <MedalTallyIconAndroid name="medal" size={25} color={color} />
            )
        }}
        />
        <Drawer.Screen 
          name="Overall Analysis" 
          component={OverallAnalysis} 
          options={{
            drawerIcon: ({size, color}) => (
            <Module2IconAndroid name="view-module-outline" size={22} color={'black'} />
            )
        }}
        />
      </Drawer.Navigator>
      
    // </NavigationContainer>
    
  );
};

const styled = Platform.OS === 'web' ? require('styled-components').default : undefined;
const Sidebar = styled && styled.div`
  width: 17%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: white;
  padding: 20px;
  border-right: 1px solid #BEBEBE;
  box-shadow: 1px 0px 8px 1px #BEBEBE;
  border-radius: 10px;
`;
const Content = styled && styled.div`
  margin-left: 22vw;
  padding: 1vw;
`;
const LinkStyle = styled && styled(NavLink)`
  color: black;
  display: block;
  margin-bottom:12px;
  text-decoration: none;
  height:40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;

  &:hover {
    color: white;
    text-decoration: underline;
    background-color:black;
    height:40px;
    display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  }

  &.active {
    color: white;
    font-weight: bold;
    background-color:black;
    height:40px;
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 1px 0px 3px 1px black;
    text-decoration: none;
  }
`;

export default MyDrawer;




// import React from 'react';
// import { ScrollView, View, Text, StyleSheet } from 'react-native';
// import { Platform } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import { BrowserRouter, Route, Routes, Link, NavLink } from 'react-router-dom';
// import MedalTallyTable from './MedalTallyTable';
// import Feed from './Feed';
// import jsonData from './dataset.json';
// import { Image } from 'react-native';
// import OlympicImage from './images/OlympicImage.png';
// import MedalTallyIconAndroid from 'react-native-vector-icons/FontAwesome5';
// import Module2IconAndroid from 'react-native-vector-icons/MaterialCommunityIcons';
// import MedalTallyIconWeb from './images/medaltallyicon.svg';
// import Module2IconWeb from './images/module2.svg'

// // Custom Drawer Content for Mobile
// const CustomDrawerContent = (props) => {
//   return (
//     <DrawerContentScrollView {...props}>
//       <Image source={OlympicImage} style={{ width: '100%', height: 120, marginBottom: 10 }} resizeMode="contain" />
//       {/* Drawer Items */}
//       <DrawerItem 
//         label="Medal Tally"
//         onPress={() => props.navigation.navigate('Medal Tally')}
//       />
//       <DrawerItem 
//         label="Module 2"
//         onPress={() => props.navigation.navigate('Module 2')}
//       />
//       {/* Add more drawer items as needed */}
//     </DrawerContentScrollView>
//   );
// };

// const Drawer = createDrawerNavigator();

// const MyDrawer = (props) => {
  
//   return Platform.OS === 'web' ? (
//     <BrowserRouter>
    
//       <Sidebar>
//         <Text style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize:20, fontWeight:'bold', fontSize:20}}>Olympics Data Analyser</Text>
//         <Image source={OlympicImage} style={{ width: '100%', height: '16vw', marginBottom:10, borderBottom: '1px solid #8888',}} />
//         <LinkStyle to="/"><MedalTallyIconWeb width={30} height={30} />Medal Tally</LinkStyle>
//         <LinkStyle to="/module2" ><Module2IconWeb  width={40} height={40} /> Module 2</LinkStyle>
//       </Sidebar>
//       <Content>
//         <Routes>
//           <Route exact path='/' element={<MedalTallyTable />} />
//           <Route path='/module2' Component={Feed} />
//         </Routes>
//       </Content>
//     </BrowserRouter>
//   ) : (
    
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Menu" drawerContent={(props) => <CustomDrawerContent {...props} />}>
//         <Drawer.Screen name="Medal Tally" children={() => <MedalTallyTable data={jsonData} />} options={{
//             drawerIcon: ({size, color}) => (
//             <MedalTallyIconAndroid name="medal" size={25} color={color} />
//             )
//         }}
//         />
//         <Drawer.Screen 
//           name="Module 2" 
//           component={Feed} 
//           options={{
//             drawerIcon: ({size, color}) => (
//             <Module2IconAndroid name="view-module-outline" size={22} color={'black'} />
//             )
//         }}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// const styled = Platform.OS === 'web' ? require('styled-components').default : undefined;
// const Sidebar = styled && styled.div`
//   width: 17%;
//   position: fixed;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   background-color: white;
//   padding: 20px;
//   border-right: 1px solid #BEBEBE;
//   box-shadow: 1px 0px 8px 1px #BEBEBE;
//   border-radius: 10px;
// `;
// const Content = styled && styled.div`
//   margin-left: 22vw;
//   padding: 1vw;
// `;
// const LinkStyle = styled && styled(NavLink)`
//   color: black;
//   display: block;
//   margin-bottom:12px;
//   text-decoration: none;
//   height:40px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-weight: bold;
//   font-size: 20px;

//   &:hover {
//     color: white;
//     text-decoration: underline;
//     background-color:black;
//     height:40px;
//     display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 10px;
//   }

//   &.active {
//     color: white;
//     font-weight: bold;
//     background-color:black;
//     height:40px;
//     display:flex;
//     justify-content: center;
//     align-items: center;
//     border-radius: 10px;
//     box-shadow: 1px 0px 3px 1px black;
//     text-decoration: none;
//   }
// `;


// export default MyDrawer;






// import React from 'react';
// import { Platform } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
// import MedalTallyTable from './MedalTallyTable';
// import Feed from './Feed';
// import jsonData from './dataset.json';

// // Create mobile-specific drawer navigator
// const Drawer = createDrawerNavigator();
// const MobileDrawer = () => (
//   <Drawer.Navigator initialRouteName="Menu">
//     <Drawer.Screen name="Medal Tally" children={() => <MedalTallyTable data={jsonData} />} />
//     <Drawer.Screen name="Module 2" component={Feed} />
//   </Drawer.Navigator>
// );

// // Create web-specific routes
// const WebRoutes = () => (
//         <Routes>
//           <Route path='/' element={<MedalTallyTable />} />
//     <Route path='/feed' element={<Feed />} />
//         </Routes>
// );

// const MyDrawer = () => {
//   return Platform.OS === 'web' ? (
//     <BrowserRouter>
//     <Link to="/">MedalTallyTable</Link>
//     <Link to="/feed">Feed</Link>
//       <WebRoutes />
//       </BrowserRouter>
//   ) : (
//     <NavigationContainer>
//       <MobileDrawer />
//     </NavigationContainer>
//   );
// };


// export default MyDrawer;












// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import MedalTallyTable from './MedalTallyTable';
// import Feed from './Feed';
// import jsonData from './dataset.json';

// const Drawer = createDrawerNavigator();

// export default function MyDrawer() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName='Menu'>
//         <Drawer.Screen name="Medal Tally" children={() => <MedalTallyTable data={jsonData} />} />
//         <Drawer.Screen name="Module 2" component={Feed} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }