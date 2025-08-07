import { StyleSheet, View, Platform, Pressable } from 'react-native'
import { colors } from '../global/theme'

const FlatCard = ({ children, style, onPress }) => {

  const Component = onPress ? Pressable : View

  const containerStyle = onPress
    ? ({ pressed }) => [
        styles.container,
        style,
        pressed && styles.pressed
      ]
    : [styles.container, style]

  return (
    <Component style={containerStyle} onPress={onPress}>
      {children}
    </Component>
  )
}

export default FlatCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.silver,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    margin: 12,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4
      },
      android: {
        elevation: 4
      }
    })
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }]
  }
})