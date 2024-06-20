import React, {useEffect} from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {Text, StyleSheet, Platform} from 'react-native';
import {colors, fontFaces, fontSizes} from '../styles/index';
import Welcome from '../screens/welcome';
import Login from '../screens/login';
import Home from '../screens/home';
import ActiveProject from '../screens/activeProject';
import ProjectDetails from '../screens/projectDetails';
import Profile from '../screens/profile';
import Recent from '../screens/recent';
import PhotoEditor from '../screens/photoEditor';
import {tabBarIconMapper, tabBarVisibilityMapper} from '../utility/mapper';
import ProjectRequest from '../screens/request';
import UploadPhoto from '../screens/uploadPhoto';
import Note from '../screens/notes';
import MarkUnavailability from '../screens/markUnavailability';
import Notification from '../screens/notification';
import CameraPage from '../screens/camera';
import MediaPage from '../screens/mediaPage';
const Tab = createBottomTabNavigator();

const WelcomeNav = createStackNavigator();
const AuthNav = createStackNavigator();
const HomeNav = createStackNavigator();
const RequestNav = createStackNavigator();
const RecentNav = createStackNavigator();
const ProfileNav = createStackNavigator();

const WelcomeStack = () => (
  <WelcomeNav.Navigator
    initialRouteName="welcome"
    screenOptions={{
      headerShown: false,
    }}
    defaultScreenOptions={{headerShown: false}}>
    <WelcomeNav.Screen name="welcome" component={Welcome} />
  </WelcomeNav.Navigator>
);

const AuthStack = () => (
  <AuthNav.Navigator
    initialRouteName="login"
    screenOptions={{
      headerShown: false,
    }}
    defaultScreenOptions={{headerShown: false}}>
    <AuthNav.Screen name="login" component={Login} />
    <AuthNav.Screen name="home" component={Home} />
    {/* <AuthNav.Screen name="forgotPassword" component={ForgotPassword} /> */}
  </AuthNav.Navigator>
);

const getCommon = Stack => {
  return [<Stack.Screen name="notification" component={Notification} />];
};

const HomeStack = () => {
  const common = getCommon(HomeNav);
  return (
    <HomeNav.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
      defaultScreenOptions={{headerShown: false}}>
      <HomeNav.Screen name="home" component={Home} />
      <HomeNav.Screen name="activeProject" component={ActiveProject} />
      <HomeNav.Screen name="projectDetails" component={ProjectDetails} />
      <HomeNav.Screen name="uploadPhoto" component={UploadPhoto} />
      <HomeNav.Screen name="note" component={Note} />
      <HomeNav.Screen name="camera" component={CameraPage} />
      <HomeNav.Screen
        name="markUnavailability"
        component={MarkUnavailability}
      />
      <HomeNav.Screen name="mediaPage" component={MediaPage} />
      {common}
    </HomeNav.Navigator>
  );
};

const RequestStack = () => {
  const common = getCommon(RequestNav);
  return (
    <RequestNav.Navigator
      initialRouteName="request"
      screenOptions={{
        headerShown: false,
      }}
      defaultScreenOptions={{headerShown: false}}>
      <RequestNav.Screen name="request" component={ProjectRequest} />
      {common}
    </RequestNav.Navigator>
  );
};

const RecentStack = () => (
  <RecentNav.Navigator
    initialRouteName="recent"
    screenOptions={{
      headerShown: false,
    }}
    defaultScreenOptions={{headerShown: false}}>
    <RecentNav.Screen name="recent" component={Recent} />
    <RecentNav.Screen name="photo-editor" component={PhotoEditor} />
  </RecentNav.Navigator>
);

const ProfileStack = () => (
  <ProfileNav.Navigator
    initialRouteName="me"
    screenOptions={{
      headerShown: false,
    }}
    defaultScreenOptions={{headerShown: false}}>
    <ProfileNav.Screen name="me" component={Profile} />
  </ProfileNav.Navigator>
);

const TabNavigator = () => {
  const tabBarTitleMapper = {
    homeStack: {
      title: 'Home',
    },
    requestStack: {
      title: 'Request',
    },
    recentStack: {
      title: 'Recent',
    },
    profileStack: {
      title: 'Profile',
    },
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          const Icon =
            tabBarIconMapper[route.name][focused ? 'active' : 'inactive'];
          return (
            <Icon
              style={styles.navIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
            />
          );
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={[
              styles.navText,
              {
                color: focused ? colors.primary : colors.text,
              },
            ]}>
            {tabBarTitleMapper[route.name]?.title}
          </Text>
        ),
        tabBarStyle: [
          styles.tabBar,
          {
            display:
              tabBarVisibilityMapper[
                getFocusedRouteNameFromRoute(route) || route?.name
              ] || 'flex',
          },
        ],
        tabBarItemStyle:
          Platform.OS === 'android' ? styles.tabBarItemAndroid : {},
        headerShown: false,
      })}
      initialRouteName="homeStack">
      <Tab.Screen name="homeStack" component={HomeStack} />
      <Tab.Screen name="requestStack" component={RequestStack} />
      <Tab.Screen name="recentStack" component={RecentStack} />
      <Tab.Screen name="profileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const Navigator = props => {
  const token = useSelector(state => state.login.token);
  const displayWelcomeScreen = useSelector(
    state => state.welcomeScreen.display,
  );

  return token ? (
    <TabNavigator {...props} />
  ) : displayWelcomeScreen ? (
    <WelcomeStack />
  ) : (
    <AuthStack {...props} />
  );
};

const styles = StyleSheet.create({
  navText: {
    ...fontFaces.regular.medium,
    fontSize: fontSizes.size11,
    lineHeight: 12.6,
    letterSpacing: 0.1,
    marginTop: -5,
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  tabBar: {
    height: Platform.OS === 'ios' ? 83 : 70,
    borderTopColor: '#0000004d',
    backgroundColor: '#ffffff',
  },
  tabBarItemAndroid: {height: 70},
  navIcon: {marginBottom: 0},
});

export default Navigator;
