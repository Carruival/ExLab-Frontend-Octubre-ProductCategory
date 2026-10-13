import { get, post, destroy } from './helpers/ApiRequestsHelper'

function getCategoryByRestaurant (id) {
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

export { getCategoryByRestaurant, getProductsByCategory, getCategory, create, remove }
