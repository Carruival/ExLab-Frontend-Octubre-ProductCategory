import { get, post, destroy } from './helpers/ApiRequestsHelper'

function getCategoriesByRestaurant (id) {
  return get(`/productCategories/restaurants/${id}`)
}

function getProductsByCategory (id) {
  return get(`/productCategories/${id}/products`)
}

function getCategory (id) {
  return get(`/productCategories/${id}`)
}

function create (data) {
  return post('/productCategories/restaurants/', data)
}

function remove (restaurantId, id) {
  return destroy(`/productCategories/${restaurantId}/categories/${id}`)
}

export { getCategoriesByRestaurant, getProductsByCategory, getCategory, create, remove }
