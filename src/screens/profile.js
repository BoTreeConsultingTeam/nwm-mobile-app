import React from 'react';
import { Ripple, WithContainer } from '../components';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';
import CalenderIcon from '../assets/icons/calendar-new.svg';
import SettingIcon from '../assets/icons/setting.svg';
import LogoutIcon from '../assets/icons/logout.svg';
import { colors, fontFaces, spacing } from '../styles';
import { useDispatch } from 'react-redux';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT', payload: {} });
  };

  return (
    <WithContainer
      pageTitle={'My Account'}
      actions={[]}
      headerStyle={styles.header}>
      <View style={styles.container}>
        <Card
          mode="elevated"
          elevation={3}
          style={styles.card}
          theme={{
            roundness: 3,
          }}>
          <View style={styles.profileOptions}>
            <Ripple
              style={styles.options}
              onPress={() =>
                navigation.navigate('homeStack', { screen: 'markUnavailability' })
              }>
              <View style={styles.optionTitle}>
                <CalenderIcon />
                <Text style={styles.text}>Calender</Text>
              </View>
              <Icon size={24} source={'chevron-right'} />
            </Ripple>
            {/* <Divider /> */}
            <Ripple style={[styles.options, styles.settingOption]}>
              <View style={styles.optionTitle}>
                <SettingIcon />
                <Text style={styles.text}>Setting</Text>
              </View>
              <Icon size={24} source={'chevron-right'} />
            </Ripple>
            {/* <Divider /> */}
            <Ripple style={styles.logoutOptions} onPress={handleLogout}>
              <LogoutIcon />
              <Text style={styles.text}>Logout</Text>
            </Ripple>
          </View>
        </Card>
      </View>
    </WithContainer>
  );
};
const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.md,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileOptions: {
    flexDirection: 'column',
  },
  options: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#F1F1F1',
  },
  optionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutOptions: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  settingOption: {
    // borderTopWidth: 2,
    // borderBottomWidth: 2,
    borderBottomColor: '#F1F1F1',
  },
  card: {
    backgroundColor: '#fff',
    margin: 20,
  },
  text: {
    fontSize: 16,
    marginLeft: 20,
    color: colors.textNormal,
    ...fontFaces.regular.medium,
  },
});
export default Profile;
