import { Animated, PanResponder } from 'react-native'

const panThreshold = 150
const hideCardAnimationDuration = 150

export default class WorkerProfilesAnimations {

  constructor(cards, setCards, componentWidth) {
    this._cards = cards
    this._setCards = setCards
    this._panPosition = new Animated.ValueXY()
    this._componentWidth = componentWidth

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.panPosition.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > panThreshold) {
          Animated.timing(this.panPosition, {
            toValue: { x: componentWidth, y: gestureState.dy },
            duration: hideCardAnimationDuration,
            useNativeDriver: true,
          }).start(() => this.updateCards())
        } else if (gestureState.dx < -panThreshold) {
          Animated.timing(this.panPosition, {
            toValue: { x: -componentWidth, y: gestureState.dy },
            duration: hideCardAnimationDuration,
            useNativeDriver: true,
          }).start(() => this.updateCards())
        } else {
          Animated.spring(this.panPosition, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: true
          }).start()
        }
      },
    })
  }

  updateCards = () => {
    let newCards = [...this._cards]
    newCards.shift()
    this._setCards(newCards)
    this.panPosition.setValue({ x: 0, y: 0 })
  }

  get inputRange() {
    return [-this._componentWidth / 2, 0, this._componentWidth / 2]
  }

  get panPosition() {
    return this._panPosition
  }

  get panHandlers() {
    return this._panResponder.panHandlers
  }

  get rotateCard() {
    return this.panPosition.x.interpolate({
      inputRange: this.inputRange,
      outputRange: ['-5deg', '0deg', '5deg'],
      extrapolate: 'clamp'
    })
  }

  get scaleNextCard() {
    return this.panPosition.x.interpolate({
      inputRange: this.inputRange,
      outputRange: [1, 0.9, 1],
      extrapolate: 'clamp',
    })
  }

  get scaleTick() {
    return this.panPosition.x.interpolate({
      inputRange: this.inputRange,
      outputRange: [1, 1, 1.5],
      extrapolate: 'clamp',
    })
  }

  get scaleCross() {
    return this.panPosition.x.interpolate({
      inputRange: this.inputRange,
      outputRange: [1.5, 1, 1],
      extrapolate: 'clamp',
    })
  }
  
}