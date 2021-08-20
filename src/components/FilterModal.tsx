import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { RB, RM } from '../utilities/fonts';

const FilterModal: React.FC<{
  onChange: Function;
  selectedFilter: string;
}> = ({ onChange, selectedFilter }) => {
  return (
    <Modal transparent animationType={'slide'}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Filter</Text>
          <View style={styles.seperator} />
          <FilterItem
            selectedFilter={selectedFilter}
            onChange={(title: string) => onChange(title)}
            title={'Rick'}
          />
          <FilterItem
            selectedFilter={selectedFilter}
            onChange={(title: string) => onChange(title)}
            title={'Morty'}
          />
        </View>
      </View>
    </Modal>
  );
};

const FilterItem: React.FC<{
  title: string;
  onChange: Function;
  selectedFilter: string;
}> = ({ selectedFilter, onChange, title }) => {
  return (
    <TouchableOpacity style={styles.filterItem} onPress={() => onChange(title)}>
      <Text style={styles.filterText}>{title}</Text>
      <View style={styles.pasive}>
        {selectedFilter === title ? <View style={styles.active} /> : <></>}
      </View>
    </TouchableOpacity>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000006b',
    justifyContent: 'center',
    padding: 22,
  },
  content: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: RB,
    fontSize: 24,
  },
  filterText: {
    fontFamily: RM,
    fontSize: 24,
  },
  seperator: {
    height: 1,
    backgroundColor: '#808080',
    marginHorizontal: -16,
    marginTop: 8,
  },
  filterItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  pasive: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {
    width: 16,
    height: 16,
    borderRadius: 12,
    backgroundColor: '#0057FF',
  },
});
