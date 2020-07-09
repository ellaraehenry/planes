import React, { useState, useMemo } from 'react'
import { View, Text, StyleSheet, Image, Animated } from 'react-native'
import Card from './Card'
import { tick, cross, logo } from '../constants/Images'
import Colors from '../constants/Colors'
import WorkerProfilesAnimations from './WorkerProfilesAnimations'


const WorkerProfiles = ({workers}) => {

  const [cards, setCards] = useState(workers)
  const [componentWidth, setComponentWidth] = useState(0)
  const animations = useMemo(() => new WorkerProfilesAnimations(cards, setCards, componentWidth), [cards, componentWidth]);

  return (
    <View style={styles.container} onLayout={(e) => setComponentWidth(e.nativeEvent.layout.width)}>
      <View style={styles.header}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.jobTitle}>Position: Stunt double</Text>
      </View>
      <View style={styles.main}>
        {renderCards(animations, cards)}
        <View>
          <Text>No more profiles!</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Animated.Image style={{ transform: [{ scale: animations.scaleCross }] }} source={cross} />
        <Animated.Image style={{ transform: [{ scale: animations.scaleTick }] }} source={tick} />
      </View>
    </View>
  )
}

const renderCards = (animations, cards) => {

  const swipeStyles = {
    transform: [...animations.panPosition.getTranslateTransform(), {
      rotate: animations.rotateCard
    }],
    zIndex: cards.length
  }

  const nextCardStyles = {
    transform: [{ scale: animations.scaleNextCard }]
  }

  return cards.map((worker, i) => {
    if (i === 0) {
      return (
        <Animated.View
          {...animations.panHandlers}
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