import { StyleSheet, TextInput, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../global/theme'

const Search = ({ keyword, setKeyword }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={24} color={colors.black} />
      <TextInput
        placeholder="Buscar productos..."
        placeholderTextColor={colors.silver}
        onChangeText={setKeyword}
        style={styles.searchInput}
        value={keyword}
        autoCorrect={false}
        accessibilityLabel="Barra de búsqueda"
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.silver,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 12,
    backgroundColor: '#fff',
    shadowColor: colors.black,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
    fontFamily: 'Convergence-Regular',
  },
})