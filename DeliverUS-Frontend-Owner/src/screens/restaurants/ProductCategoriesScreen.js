/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import TextRegular from '../../components/TextRegular'
import { StyleSheet, FlatList, Pressable, View } from 'react-native'
import DeleteModal from '../../components/DeleteModal'
import { getCategoryByRestaurant, getProductsByCategory, getCategory, create, remove } from '../../api/CategoriesEndpoints'

export default function ProductCategoriesScreen({ navigation, route }) {
  const [productCategorie, setProductCategory] = useState({})
  const [productCategorieToBeDeleted, setProductCategorieToBeDeleted] = useState(null)

  useEffect(() => {
    fetchProductCategory()
  }, [route])

  const renderHeader = () => {
    return (
      <View>
        <Pressable
          onPress={() => navigation.navigate('CreateProductCategoryScreen', { id: productCategorie.id })
          }
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? GlobalStyles.brandGreenTap
                : GlobalStyles.brandGreen
            },
            styles.button
          ]}>
          <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
            <MaterialCommunityIcons name='plus-circle' color={'white'} size={20} />
            <TextRegular textStyle={styles.text}>
              Create categorie
            </TextRegular>
          </View>
        </Pressable>
      </View>
    )
  }

  const renderEmptyProductsCategoriesList = () => {
    return (
      <TextRegular textStyle={styles.emptyList}>
        This restaurant has no product categories yet.
      </TextRegular>
    )
  }

  const renderProductCategorie = ({ item }) => {
    return (
      <View style={styles.actionButtonsContainer}>
        <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
          <TextRegular textStyle={styles.text}>
            {item.name}
          </TextRegular>
        </View>
        <Pressable
          onPress={() => { setProductCategorieToBeDeleted(item) }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? GlobalStyles.brandPrimaryTap
                : GlobalStyles.brandPrimary
            },
            styles.actionButton
          ]}>
          <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
            <MaterialCommunityIcons name='delete' color={'white'} size={20} />
            <TextRegular textStyle={styles.text}>
              Delete
            </TextRegular>
          </View>
        </Pressable>
      </View>
    )
  }

  const fetchProductCategory = async () => {
    try {
      const fetchedProductCategory = await getCategory(route.params.id)
      setProductCategory(fetchedProductCategory)
    } catch (error) {
      showMessage({
        message: `There was an error while retrieving restaurant details (id ${route.params.id}). ${error}`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyProductsCategoriesList}
        style={styles.container}
        data={restaurant.productCategorie}
        renderItem={renderProductCategorie}
        keyExtractor={item => item.id.toString()}
      />
      {/* <DeleteModal
        isVisible={productCategorieToBeDeleted !== null}
        onCancel={() => setProductCategorieToBeDeleted(null)}
        onConfirm={() => removeProduct(productCategorieToBeDeleted)}>
        <TextRegular>If the product belong to some order, it cannot be deleted.</TextRegular>
      </DeleteModal> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignContent: 'center', padding: 10
  },
  categoryName: {
    textAlign: 'center',
    flex: 1
  },
  categoryRow: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 5,
    paddingHorizontal: 10,

    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 1
  },
  button: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%'
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    flex: 1,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    bottom: 5,
    flex: 1
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 5
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  }
})
