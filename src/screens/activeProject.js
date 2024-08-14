import React, { useState } from 'react';
import { WithContainer } from '../components';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import ProjectCard from '../components/Project/projectCard';
import ProjectFilter from '../components/Project/projectFilter';
import { useActiveProject } from '../hooks/useActiveProject';
import { ActivityIndicator, IconButton, Searchbar } from 'react-native-paper';
import { colors, fontFaces, fontSizes, spacing } from '../styles';

const ActiveProject = ({ navigation }) => {
  const [
    {
      activeProjectList,
      currentPage,
      endReached,
      refreshing,
      isPaginationLoading,
      isLoading,
      searchValue,
      isSearchBarVisible,
      filterValue,
      modalOpen,
    },
    {
      fetchNextPage,
      handleRefresh,
      handleSearchBar,
      handleSearchTextChange,
      filterValueChange,
      handleFilterApply,
      closeModal,
      handleModal,
      clearFilter,
    },
  ] = useActiveProject();

  return (
    <WithContainer
      onBackPress={() => navigation.goBack()}
      pageTitle="Active Projects"
      headerStyle={styles.header}
      actions={[
        {
          icon: 'magnify',
          onPress: () => {
            handleSearchBar();
          },
        },
        {
          icon: 'tune',
          onPress: handleModal,
        },
        {
          icon: 'bell-badge-outline',
          onPress: () => navigation.navigate('notification'),
        },
      ]}>
      <View styles={styles.container}>
        {isSearchBarVisible && (
          <Searchbar
            elevation={3}
            value={searchValue}
            placeholder="Search"
            style={styles.searchBar}
            onChangeText={handleSearchTextChange}
            right={() => (
              <IconButton
                icon={'close'}
                onPress={() => {
                  handleSearchBar();
                  searchValue && handleSearchTextChange('');
                }}
              />
            )}
          />
        )}
        {activeProjectList.length ? (
          <FlatList
            style={styles.subContainer}
            contentContainerStyle={{ paddingBottom: 20 }}
            data={activeProjectList}
            renderItem={({ item }) => {
              return <ProjectCard item={item} navigation={navigation} />;
            }}
            bounces
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                enabled={true}
                tintColor={colors.backgroundPrimary}
                progressBackgroundColor={colors.white}
              />
            }
            keyExtractor={(_, index) => index}
            onEndReachedThreshold={0.01}
            onEndReached={fetchNextPage}
            ListFooterComponent={
              isPaginationLoading && !endReached ? (
                <ActivityIndicator animating color={colors.backgroundPrimary} />
              ) : null
            }
          />
        ) : isLoading ? (
          <View style={styles.noContent}>
            <ActivityIndicator animating color={colors.primary} />
          </View>
        ) : (
          <View style={styles.noContent}>
            <Text style={styles.text}>No Results Found</Text>
          </View>
        )}
      </View>
      <ProjectFilter
        modalOpen={modalOpen}
        closeModal={closeModal}
        filterValue={filterValue}
        filterValueChange={filterValueChange}
        handleFilterApply={handleFilterApply}
        clearFilter={clearFilter}
      />
    </WithContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    // marginBottom: 20,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
  },
  subContainer: {
    paddingHorizontal: 10,
    marginBottom: 70,
    backgroundColor: '#fff',
  },
  noContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  text: {
    ...fontFaces.regular.bold,
    fontSize: fontSizes.size18,
    lineHeight: 23,
    color: colors.text1,
  },
  searchBar: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    textAlign: 'center',
    height: 50,
    borderRadius: spacing.sm,
    marginBottom: 10,
  },
});
export default ActiveProject;
