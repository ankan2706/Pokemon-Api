import { useEffect, useState  } from "react";
import axios from "axios";

import './pokemon-list-wrapper.css'
import Pokemon from "../Pokemon/Pokemon";
function PokedexList(){
        const [pokedexurl,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
        const [pokemonList, setPokemonList ] = useState([]);

        const [isLoading, setIsLoading ] = useState(true);
        const [nextUrl, setNextUrl ] = useState('');
        const [prevUrl, setPrevUrl ] = useState('');
        async function DownloadPokemons(){
            setIsLoading(true);
            const response = await axios.get(pokedexurl);
            const pokemonResults = response.data.results;           
            console.log(response);
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);

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
            // console.log(res);
            setPokemonList(res);
            setIsLoading(false);
        }
       useEffect(() => {
            DownloadPokemons();
       },[pokedexurl]);
        return(
            <div className="pokemon-list-wrapper">
                <div className="pokemon-wrapper">
                    {(isLoading)?'Loading......':
                        pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
                    }
                </div>
                <div className="controls">
                    <button disabled={prevUrl == null } onClick={()=> setPokedexUrl(prevUrl)}>Prev</button>
                    <button disabled={nextUrl == null} onClick={()=> setPokedexUrl(nextUrl)}>Nest</button>
                </div>
            </div>
        )

}
export default PokedexList;