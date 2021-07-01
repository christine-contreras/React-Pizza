import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {
  state = {
    pizzas: [],
    chosenPizza: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(response => response.json())
    .then(json => {
      this.setState({
        pizzas: json
      })
    })
  }

  handleEdit = (selectedPizza) => {
    this.setState({
      chosenPizza: selectedPizza
    })
  }

  handleFormChange = (event) => {
    this.setState({
      chosenPizza: {
        ...this.state.chosenPizza,
        [event.target.name] : event.target.value
      }
    })
  }

  handleRadioChange = (event) => {
    this.setState({
      chosenPizza: {
        ...this.state.chosenPizza,
        vegetarian : !this.state.chosenPizza.vegetarian
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const formData = this.state.chosenPizza

    const objectConfig = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch(`http://localhost:3000/pizzas/${formData.id}`, objectConfig)

    const newPizzas = this.state.pizzas.map(pizza => pizza.id === formData.id ? formData : {...pizza})

    this.setState({
      pizzas: newPizzas
    })


  }

  render() {
    return (
      <Fragment>
        <Header/>
        { this.state.chosenPizza.length !== 0
        ? 
        <PizzaForm
        chosenPizza={this.state.chosenPizza}
        handleFormChange={this.handleFormChange}
        handleRadioChange={this.handleRadioChange}
        handleSubmit={this.handleSubmit}
        /> 
        : null}
        <PizzaList pizzas={this.state.pizzas} handleEdit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
