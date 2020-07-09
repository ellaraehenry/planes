import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import propTypes from 'prop-types';
import Colors from '../constants/Colors'

const Card = ({ name, img }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.img} source={img} />
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

Card.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.number.isRequired
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5,
  },
  img: {
    flex: 1,
    width: '100%',
    height: undefined,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  name: {
    fontSize: 25,
    color: Colors.mainText,
    padding: 20
  },
})


export default Card