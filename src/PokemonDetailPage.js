import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PokemonDetail from './PokemonDetail';

const PokemonDetailPage = ({ match }) => {
  const {
    params: { pokemonId },
  } = match;
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const API_BASE_URL = `https://pokeapi.co/api/v2/pokemon`;
    const fetchPokemon = async () => {
      setLoading(true);
      setError(false);
      try {
        const result = await axios.get(`${API_BASE_URL}/${pokemonId}`);
        setPokemon(result.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    // Call the API
    fetchPokemon();
  }, [pokemonId]);

  return (
    <>
    <div><h3>Pokemon Details</h3>
    <div className="card text-center mx-auto" style={{"maxWidth" : "18rem"}}>
        <div className="card-header"><b>Pokemon Name</b></div>
        <div className="card-body"> 
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} />
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemonId}.png`} />          
        </div>
      </div>
      <Link to={`/`}>Go back to pokemon list</Link>
      </div>
    </>
  );
};

export default PokemonDetailPage;