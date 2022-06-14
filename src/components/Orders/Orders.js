import React from 'react';
import './Orders.css';

const Orders = ({ orders, deleteOrder }) => {
  console.log('props', orders)
  // console.log('orders', props.orders)

    const orderEls = orders.map(order => {
      return (
        <div className="order">
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map(ingredient => {
              return <li>{ingredient}</li>
            })}
          </ul>
          <button className={'delete-'+order.id} onClick={() => {
            deleteOrder(order.id)
          }}>Delete order</button>
        </div>
      )
    });
  

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;