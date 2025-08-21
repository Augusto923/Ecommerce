import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import TextConvergence from '../../components/TextConvergence';
import { useSelector, useDispatch } from 'react-redux';
import { setCategorySelected } from '../../features/shop/shopSlice';
import { useGetCategoriesQuery } from '../../services/shop/shopApi';

const CategoryCard = ({ category, onPress }) => (
  <View style={styles.cardWrapper}>
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.cardContainer, pressed && styles.cardPressed]}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
      accessibilityRole="button"
      accessibilityLabel={`Ver productos de la categoría ${category.title}`}
    >
      <ImageBackground
        source={{ uri: category.image }}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <TextConvergence style={styles.title}>{category.title}</TextConvergence>
        </View>
      </ImageBackground>
    </Pressable>
  </View>
);

const CategoriesScreen = ({ navigation }) => {
  // const categories = useSelector((state) => state.shop.categories);

  const {data:categories,isLoading,error} = useGetCategoriesQuery()
  // console.log(isLoading,error)
  // console.log(categories)

  const dispatch = useDispatch();

  const renderCategoryItem = ({ item }) => (
    <CategoryCard
      category={item}
      onPress={() => {
        
        dispatch(setCategorySelected(item.title));

        navigation.navigate('Products');
      }}
    />
  );

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenTitle}>Nuestras Categorías</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 10,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginVertical: 20,
    marginLeft: 12,
  },
  listContainer: {
    paddingBottom: 24,
  },
  cardWrapper: {
    flex: 1,
    padding: 10,
  },
  cardContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    aspectRatio: 1,
    backgroundColor: '#333',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  cardPressed: {
    opacity: 0.7,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    width: '100%',
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
