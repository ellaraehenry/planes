import React, { useState, useRef, useMemo } from 'react'
import { View, Text, StyleSheet, Image, PanResponder, Animated } from 'react-native'
import Card from './Card'
import { WORKERS } from '../data/workers'
import { tick, cross, logo } from '../constants/Images'
import Colors from '../constants/Colors'

const panThreshold = 150
const hideCardAnimationDuration = 150

const WorkerProfiles = () => {

  const [cards, setCards] = useState(WORKERS)
  const [componentWidth, setComponentWidth] = useState(0)
  const panPosition = useRef(new Animated.ValueXY()).current;
  const inputRange = [-componentWidth / 2, 0, componentWidth / 2]

  const panResponder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      panPosition.setValue({ x: gestureState.dx, y: gestureState.dy })
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > panThreshold) {
        Animated.timing(panPosition, {
          toValue: { x: componentWidth, y: gestureState.dy },
          duration: hideCardAnimationDuration,
          useNativeDriver: true,
        }).start(() => updateCards())
      } else if (gestureState.dx < -panThreshold) {
        Animated.timing(panPosition, {
          toValue: { x: -componentWidth, y: gestureState.dy },
          duration: hideCardAnimationDuration,
          useNativeDriver: true,
        }).start(() => updateCards())
      } else {
        Animated.spring(panPosition, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: true
        }).start()
      }
    },
  }), [cards, componentWidth]);


  const rotateCard = panPosition.x.interpolate({
    inputRange: inputRange,
    outputRange: ['-5deg', '0deg', '5deg'],
    extrapolate: 'clamp'
  })

  const scaleNextCard = panPosition.x.interpolate({
    inputRange: inputRange,
    outputRange: [1, 0.9, 1],
    extrapolate: 'clamp',
  })

  const scaleTick = panPosition.x.interpolate({
    inputRange: inputRange,
    outputRange: [1, 1, 1.5],
    extrapolate: 'clamp',
  })

  const scaleCross = panPosition.x.interpolate({
    inputRange: inputRange,
    outputRange: [1.5, 1, 1],
    extrapolate: 'clamp',
  })

  const updateCards = () => {
    let newCards = [...cards]
    newCards.shift()
    setCards(newCards)
    panPosition.setValue({ x: 0, y: 0 })
  }

  const swipeStyles = {
    transform: [...panPosition.getTranslateTransform(), {
      rotate: rotateCard
    }],
    zIndex: cards.length
  }

  const nextCardStyles = {
    transform: [{ scale: scaleNextCard }]
  }


  const renderCards = () => {
    return cards.map((worker, i) => {
      if (i === 0) {
        return (
          <Animated.View
            {...panResponder.panHandlers}
            key={worker.id}
            style={[styles.profiles, swipeStyles]}>
            <Card img={worker.img} name={worker.name} />
          </Animated.View>
        )
      } else {
        let zIndexStyle = { zIndex: cards.length - i }
        return (
          <Animated.View
            key={worker.id}
            style={[styles.profiles, nextCardStyles, zIndexStyle]}>
            <Card img={worker.img} name={worker.name} />
          </Animated.View>
        )
      }
    })
  }

  return (
    <View style={styles.container} onLayout={(e) => setComponentWidth(e.nativeEvent.layout.width)}>
      <View style={styles.header}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.jobTitle}>Position: Stunt double</Text>
      </View>
      <View style={styles.main}>
        {renderCards()}
        <View>
          <Text>No more profiles!</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Animated.Image style={{ transform: [{ scale: scaleCross }] }} source={cross} />
        <Animated.Image style={{ transform: [{ scale: scaleTick }] }} source={tick} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  header: {
    flex: 1,
    paddingHorizontal: 8,
  },
  logo: {
    flex: 1,
    width: '100%',
    height: undefined,
    resizeMode: 'contain'
  },
  jobTitle: {
    fontSize: 25,
    color: Colors.mainText,
    textAlign: 'center',
    marginBottom: 10
  },
  main: {
    flex: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profiles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  footer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default WorkerProfiles