import React, { Component } from 'react';

import './OrderForm.css'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    this.sendOrder();
  }

  sendOrder = () => {
    if (this.state.name.length > 0 && this.state.ingredients.length > 0) {
      fetch('http://localhost:3001/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          name: this.state.name,
          ingredients: this.state.ingredients
        })
        }).then(() => {
          this.props.refetch();
          this.clearInputs();
        })
    } else {
      this.setState({ error: 'Please make sure to have a name and at least one ingredient for your order' })
    }
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ ingredients: [...this.state.ingredients, e.target.name]})
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value })
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: [], error: ''});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)} >
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }
        <p className='order'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        <p className='error-message'>{ this.state.error }</p>
        <button className='submit-btn' onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
