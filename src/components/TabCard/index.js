import {useState} from 'react'
import './index.css'

const TabCard = props => {
  const {tabList, updatedCartCount} = props
  const [count, setCount] = useState({})

  const onIncrement = dishId => {
    setCount(prevState => {
      const newQuantity = {...prevState}
      newQuantity[dishId] = (newQuantity[dishId] || 0) + 1

      return newQuantity
    })
    updatedCartCount(1)
  }

  const onDecrement = dishId => {
    setCount(prevState => {
      const newQuantity = {...prevState}
      if (newQuantity[dishId] > 0) {
        newQuantity[dishId] -= 1
      }
      return newQuantity
    })
    updatedCartCount(-1)
  }

  return (
    <div className="category-container">
      {tabList.length > 0 ? (
        tabList.map(tab => (
          <div key={tab.menuCategoryId}>
            <ul className="unordered-list">
              {tab.categoryList.map(dish => (
                <li className="list" key={dish.dishId}>
                  <div>
                    <img alt="symbol" src={dish.addOnImage.image} />
                  </div>
                  <div className="second-container">
                    <h1>{dish.dishName}</h1>
                    <div className="d-flex">
                      <p>{dish.currency}</p>
                      <p>{dish.dishPrice}</p>
                    </div>
                    <p>{dish.dishDescription}</p>
                    {dish.dishAvailability ? (
                      <>
                        <div className="button-container">
                          <button
                            type="button"
                            onClick={() => onDecrement(dish.dishId)}
                            className="button"
                          >
                            -
                          </button>
                          <button type="button" className="button">
                            {count[dish.dishId] || 0}
                          </button>
                          <button
                            type="button"
                            onClick={() => onIncrement(dish.dishId)}
                            className="button"
                          >
                            +
                          </button>
                        </div>
                        <div>
                          {dish.addOnCart && (
                            <p className="custom-text">
                              Customizations available
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="text-danger">Not available</p>
                    )}
                  </div>
                  <div className="calories-container">
                    <p>{dish.dishCalories} calories</p>
                  </div>
                  <div>
                    <img
                      alt={dish.dishName}
                      className="image"
                      src={dish.dishImage}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div>None</div>
      )}
    </div>
  )
}

export default TabCard
