import { Text } from 'react-native'

const TextConvergence = ({ children, style }) => {
  return (
    <Text style={[{ fontFamily: 'Convergence-Regular' }, style]}>
      {children}
    </Text>
  )
}

export default TextConvergence