import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';
import {FullScreenLoader, NoInternetAlert} from '../index';

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
}) => {
  const Header = (
    <Appbar.Header style={[styles.header, headerStyle]}>
      {onBackPress ? <Appbar.BackAction onPress={onBackPress} /> : null}
      {pageTitle ? <Appbar.Content title={pageTitle} /> : null}
      {searchBar ? (
        <Searchbar
          value={searchValue}
          onChangeText={onSearchValueChange}
          placeholder={searchPlaceHolder}
          style={[styles.searchBar, searchStyle]}
          icon={'magnify'}
          mode="bar"
          onClearIconPress={onSearchValueChange}
          elevation={3}
        />
      ) : null}
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
      {Header}
      {loading && <FullScreenLoader />}
      {children}
      <SafeAreaView>
        <NoInternetAlert />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: 'white',
    margin: 0,
  },
});
export default WithContainer;
