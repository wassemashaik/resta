import {Component} from 'react'
import Header from '../Header'
import Tablets from '../Tablets'
import './index.css'

class Home extends Component {
  state = {
    tabList: [],
    restaurantname: '',
    cartCount: 0,
  }

  updatedCartCount = number => {
    this.setState(prevCount => ({
      cartCount: prevCount.cartCount + number,
    }))
  }

  componentDidMount = () => {
    this.getRecipes()
  }

  getRecipes = async () => {
    const dishesApiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const options = {
      method: 'GET',
    }
    const response = await fetch(dishesApiUrl, options)
    try {
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        if (Array.isArray(data) && data.length > 0) {
          const restaurant = data[0]

          const restaurantName = restaurant.restaurant_name
          const tabsList = restaurant.table_menu_list.map(tab => ({
            menuCategory: tab.menu_category,
            menuCategoryId: tab.menu_category_id,
            categoryList: tab.category_dishes.map(dish => ({
              addOnCart:
                Array.isArray(dish.addonCat) && dish.addonCat.length > 0,
              addOnImage: dish.addonCat.map(add => ({
                image: add.addons.dish_image,
              })),
              dishAvailability: dish.dish_Availability,
              dishId: dish.dish_id,
              dishName: dish.dish_name,
              currency: dish.dish_currency,
              dishPrice: dish.dish_price,
              dishDescription: dish.dish_description,
              dishImage: dish.dish_image,
              dishCalories: dish.dish_calories,
              nextUrl: dish.nexturl,
            })),
          }))

          this.setState({
            tabList: tabsList,
            restaurantname: restaurantName,
          })
        }
      } else {
        console.error('Failed to fetch data')
      }
    } catch (error) {
      console.error('Error fetching data', error)
    }
  }

  renderSuccessView = () => {
    const {tabList} = this.state

    return (
      <div className="success-view-container">
        <Tablets tabList={tabList} updatedCartCount={this.updatedCartCount} />
      </div>
    )
  }

  render() {
    const {restaurantname, cartCount} = this.state
    return (
      <>
        <Header restaurantname={restaurantname} cartCount={cartCount} />
        {this.renderSuccessView()}
      </>
    )
  }
}

export default Home
