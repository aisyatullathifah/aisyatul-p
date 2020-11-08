import React, { Component } from "react";
import { Route, NavLink, HashRouter } from "react-router-dom";
import PokemonList from "./PokemonList";
import MyPokemon from "./MyPokemon";
import PokeCard from "./components/PokeCard";
import PokemonDetailPage from "./PokemonDetailPage";
 
class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons : [],
      pokemonDetails : [],
      offset: 0,
      loadNumber: 19      
    }
    this.handleMoreClick = this.handleMoreClick.bind(this);
  }

  getNextOffset() {
    return this.state.offset+this.state.loadNumber;
  }

  handleMoreClick(event) {
    const newOffset = this.getNextOffset();
    this.setState({offset: newOffset}, () => {
      console.log("Offset: " + this.state.offset)
      this.getMorePokemon();
    });
    
  }
  
  componentDidMount() {
    this.getMorePokemon();
  }

  getMorePokemon() {
    let url = "https://pokeapi.co/api/v2/pokemon?offset=" + this.state.offset + "&limit=" + this.state.loadNumber;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data) {
        this.setState({pokemons : data.results})

        this.state.pokemons.map(pokemon => {
          fetch(pokemon.url)
          .then(response => response.json())
          .then(data => {
            if (data) {
              var temp = this.state.pokemonDetails
              temp.push(data)
              this.setState({pokemonDetails: temp})
            }            
          })
          .catch(console.log)
        })
      }
    })
    .catch(console.log)
  }

  render() {
    const {pokemonDetails} = this.state;

    const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
      return (<PokeCard pokemon={pokemon} />);
    });

    return (
      <HashRouter>
        <div>
          <h1 className="title"></h1>
          <ul className="header">
            <li><NavLink to="/">Pokemon List</NavLink></li>
            <li><NavLink to="/myPokemon">My Pokemon</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={PokemonList}/>
            <Route path="/myPokemon" component={MyPokemon}/>
            <Route path="/pokemon/:pokemonId" exact component={PokemonDetailPage} />
          </div>
        </div>
      </HashRouter>
      
    );
  }
}
 
export default App;