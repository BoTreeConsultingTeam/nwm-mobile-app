import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import { FullScreenLoader, NoInternetAlert } from '../index';
import { colors, spacing } from '../../styles';

const WithContainer = ({
  onBackPress,
  pageTitle,
  searchBar,
  onSearchValueChange,
  searchValue,
  searchPlaceHolder,
  actions,
  searchStyle,
  children,
  loading,
  headerStyle,
  scrollView,
  scrollViewStyle,
  onSearchBarClose,
}) => {
  const Header = (
    <Appbar.Header style={[styles.header, headerStyle]}>
      {onBackPress ? <Appbar.BackAction onPress={onBackPress} /> : null}
      {searchBar ? (
        <Searchbar
          value={searchValue}
          onChangeText={onSearchValueChange}
          placeholder={searchPlaceHolder}
          style={[styles.searchBar]}
          icon={'magnify'}
          mode="bar"
          clearIcon={'close'}
          onClearIconPress={onSearchBarClose}
          elevation={3}
          inputStyle={searchStyle}
          loading={false}
          cursorColor={colors.primary}
        />
      ) : null}
      {pageTitle ? <Appbar.Content title={pageTitle} /> : null}
      {actions.length
        ? actions.map((item, index) => {
          return (
            <Appbar.Action
              key={index}
              icon={item.icon}
              iconColor={item.iconColor}
              onPress={item.onPress}
              disabled={item.disabled}
              size={item.size}
              color={item.color}
              style={item.style}
            />
          );
        })
        : null}
    </Appbar.Header>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      {Header}
      {loading && <FullScreenLoader />}
      {scrollView ? (
        <SafeAreaView>
          <ScrollView style={scrollViewStyle}>{children}</ScrollView>
        </SafeAreaView>
      ) : (
        children
      )}
      <SafeAreaView>
        <NoInternetAlert />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    backgroundColor: 'white',
    marginTop: 20,
    marginLeft: 10,
    textAlign: 'center',
    width: '80%',
    height: 50,
    borderRadius: spacing.sm,
  },
});
export default WithContainer;
