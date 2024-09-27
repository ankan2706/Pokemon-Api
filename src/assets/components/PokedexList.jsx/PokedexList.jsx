import { useEffect, useState  } from "react";
import axios from "axios";

import './pokemon-list-wrapper.css'
import Pokemon from "../Pokemon/Pokemon";
function PokedexList(){

        const [pokemonList, setPokemonList ] = useState([]);

        const [isLoading, setIsLoading ] = useState(true);
        async function DownloadPokemons(){
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
            const pokemonResults = response.data.results;           
            const pokemonResultsPormise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
            // console.log(pokemonResultsPormise);
            const pokemonData = await axios.all(pokemonResultsPormise);
            // console.log(pokemonData);
            const res = pokemonData.map((pokeData) => {
                const pokemon = pokeData.data;
                // const 
                return {
                    id:pokemon.id,
                    name:pokemon.name,
                    image: pokemon.sprites.other.dream_world.front_default,
                    type:pokemon.types
                }
            });
            console.log(res);
            setPokemonList(res);
            setIsLoading(false);
        }
       useEffect(() => {
            DownloadPokemons();
       },[]);
        return(
            <div className="pokemon-list-wrapper">
                <div>pokemon list</div>
                {(isLoading)?'Loading......':
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
                }
            </div>
        )

}
export default PokedexList;