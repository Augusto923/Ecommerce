import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../global/theme'

const Header = ({ title, children }) => {
  return (
    <View style={styles.container} accessibilityRole="header">
      <Text style={styles.title}>{title}</Text>
      {children && <View style={styles.rightContent}>{children}</View>}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
    paddingHorizontal: 16,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    color: colors.white,
    fontFamily: 'Convergence-Regular',
    textAlign: 'center',
  },
  rightContent: {
    position: 'absolute',
    right: 16,
    top: 40,
  },
})