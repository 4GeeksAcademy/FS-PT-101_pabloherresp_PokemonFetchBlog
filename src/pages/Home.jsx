import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"
import { PokeAPIService } from "../services/PokeAPIService.js";
import { PokemonCard } from "../components/PokemonCard.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Home = () => {
	const {store, dispatch} = useGlobalReducer()
	const {page} = useParams()
	const navigate = useNavigate()

	useEffect(()=>{
		if(!page)
			navigate("/1")
		if(store.count == 0)
			getPokemon()
		if(localStorage.getItem("favs"))
			dispatch({type: "load_favs"})
	},[])

 	const getPokemon = async () => {
		const data = await PokeAPIService.getAllPokemon()
		dispatch({type: "loadAllPokemon", payload: data})
	}
 
	const getOffset = () => {
		return (page-1)*store.pageSize
	}

	return (
		<>
			<ul className="d-flex mt-3 flex-wrap justify-content-center">
				{
					store.pages.map((item) => {
						return <li className="list-group-item mx-2" key={item}><Link to={"/" + (item+1)}>{item+1}</Link></li>
					})
				}
			</ul>
			<div className="container text-center">
				<div className="row">
				{
					store.pokemons.slice(getOffset(), getOffset() + store.pageSize).map((item)=>{
						let id = item.url.split("/")[6]
						return <PokemonCard key={id} pid={id} name={item.name}/>
					})
				}
				</div>
			</div>
		</>
	);
}; 