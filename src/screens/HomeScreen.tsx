import { useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CharacterCard from '../components/CharacterCard';
import FilterModal from '../components/FilterModal';
import { FETCH_CHARACTERS } from '../queries/queries';
import { RB } from '../utilities/fonts';

const HomeScreen = () => {
  const list = useRef<FlatList>(null);

  const [selectedFilterName, setSelectedFilterName] = useState('Rick');
  const [onEndReachedCalledDuringMomentum, setERCDM] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const { loading, data, fetchMore } = useQuery(FETCH_CHARACTERS, {
    variables: {
      page: 1,
      filter: 'Rick',
    },
  });

  const _fetchMoreCharacters = () => {
    if (data.characters.info.next) {
      fetchMore({
        variables: {
          page: data.characters.info.next,
          filter: selectedFilterName,
        },
        updateQuery: (previousResult: any, { fetchMoreResult }) => {
          const oldResults = previousResult.characters.results;
          const newPageInfo = fetchMoreResult.characters.info;
          const newResults = fetchMoreResult.characters.results;
          return {
            characters: {
              info: newPageInfo,
              results: [...oldResults, ...newResults],
              __typename: fetchMoreResult.characters.__typename,
            },
          };
        },
      });
    }
  };

  const _fetchFilterData = (filterName: string) => {
    list?.current?.scrollToOffset({ animated: true, offset: 0 });

    setShowFilterModal(false);
    setSelectedFilterName(filterName);
    fetchMore({
      variables: {
        page: 1,
        filter: filterName,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {showFilterModal && (
        <FilterModal
          onChange={_fetchFilterData}
          selectedFilter={selectedFilterName}
        />
      )}
      <View style={{ flex: 1 }}>
        <SafeAreaView />
        {/* Header */}
        <View style={styles.titleCont}>
          <Text style={styles.title}>Rick and Morty</Text>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowFilterModal(true)}
          >
            <Icon name={'filter-alt'} color={'#C4C4C4'} size={30} />
          </TouchableOpacity>
        </View>
        {/* List */}
        <FlatList
          ref={list}
          style={{ flex: 1, padding: 24, paddingTop: 12 }}
          data={data.characters.results}
          renderItem={({ item, index }) => <CharacterCard character={item} />}
          onMomentumScrollBegin={() => {
            setERCDM(false);
          }}
          keyExtractor={(item) => `${item.id}`}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
            if (!onEndReachedCalledDuringMomentum) {
              setERCDM(true);
              _fetchMoreCharacters();
            }
          }}
        />
        <SafeAreaView />
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: RB,
    fontSize: 24,
  },
  titleCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  icon: { position: 'absolute', right: 24, top: 10 },
});
