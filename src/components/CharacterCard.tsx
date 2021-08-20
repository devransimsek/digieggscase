import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { RB, RM } from '../utilities/fonts';

const CharacterCard: React.FC<{
  character: any;
}> = ({ character }) => {
  return (
    <View style={styles.container} nativeID={'card'}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.infoCont}>
        {/* Id */}
        <Text style={[styles.text, { marginLeft: 'auto' }]}>
          <Text style={styles.title}>#id: </Text>
          {character.id}
        </Text>
        {/* Name */}
        <Text style={styles.text}>
          <Text style={styles.title}>Name: </Text>
          {character.name}
        </Text>
        {/* Location */}
        <Text style={styles.text}>
          <Text style={styles.title}>Location: </Text>
          {character.location.name}
        </Text>
      </View>
    </View>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
  },
  image: {
    height: 170,
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoCont: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 16,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: RM,
    color: 'gray',
  },
  title: {
    color: 'black',
  },
});
