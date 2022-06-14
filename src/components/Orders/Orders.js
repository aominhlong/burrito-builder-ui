import React from 'react';
import './Orders.css';

const Orders = ({ orders, deleteOrder }) => {
    const orderEls = orders.map(order => {
      return (
        <div className="order" key={order.id}>
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map(ingredient => {
              return (
              <li key={order.ingredients.indexOf(ingredient)}>{ingredient}</li>
              )
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