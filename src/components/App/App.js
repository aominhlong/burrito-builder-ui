import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state={
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
    .then(data => this.setState({ orders: data.orders }))
      .catch(err => console.error('Error fetching:', err));
  }

  refetch = () => {
    fetch('http://localhost:3001/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        ingredients: this.state.ingredients
      })
      })
      .then(() => {
        getOrders()
        .then(data => this.setState({ orders: data.orders }))
      })
  }

  deleteOrder = (id) => {
    fetch(`http://localhost:3001/api/v1/orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    
    getOrders()
    .then(data => this.setState({ orders: data.orders }))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm refetch={this.refetch}/>
        </header>

        <Orders orders={this.state.orders} deleteOrder={this.deleteOrder}/>
      </main>
    );
  }
}


export default App;
