import { useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { PokeAPIService } from "../services/PokeAPIService"
import { useEffect, useState } from "react"

export const PokemonView = () => {
	const {store,dispatch} = useGlobalReducer()
	const {id} = useParams()
	const [pokemon, setPokemon] = useState({})
	const [isFav, setFav] = useState(false)

	//state usado para solo mostrar las descripciones en inglés
	const [pokeData,setPokeData] = useState({
		"desc": "",
		"short":"",
		"gen":""
	})

	useEffect(()=>{
		if(id)
			getThisPokemon()
		if(store.count == 0)
			getPokemon()
		if(localStorage.getItem("favs"))
			dispatch({type: "load_favs"})
	},[id])

	useEffect(()=>{
		if(store.favs.includes(parseInt(pokemon.id)))
			setFav(true)

		let foundDesc = pokemon.species?.flavor_text_entries.find((item)=>item.language.name == "en")
		let foundShort = pokemon.species?.genera.find((item)=>item.language.name == "en")
		let gen = pokemon.species?.generation.name.slice(11)

		setPokeData({...pokeData, desc: foundDesc?.flavor_text, short: foundShort?.genus, gen: gen})
	},[pokemon])

	const getPokemon = async () => {
		const data = await PokeAPIService.getAllPokemon()
		dispatch({type: "loadAllPokemon", payload: data})
	}

	const getThisPokemon = async () => {
		const data = await PokeAPIService.getSpecificPokemon(id)
		setPokemon(data)
	}

	const handleClickFav = () => {
		if(!isFav)
			dispatch({type: "add_fav", payload: pokemon.id})
		else
			dispatch({type: "remove_fav", payload: pokemon.id})
		setFav(!isFav)
	} 

	return (
		<div className="container">
			<div className="card mt-3">
				<div className="card-body row p-3">
					<div className="col-12 col-md-4" >
						<img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+ pokemon.id +".png"} className="w-100 PokeViewImage"/>
					</div>
					<div className="col-12 col-md-8">
						<div className="d-flex align-items-center">
							<h1 className="fs-2 me-auto text-capitalize">{"#" + pokemon.id + " - " + pokemon.name}</h1>
							{(isFav ?
							<button type="button" className="btn btn-warning btn-sm mx-0 z-3" onClick={handleClickFav}><i className="fa-solid fa-heart text-white"></i></button> :
							<button type="button" className="btn btn-outline-warning btn-sm mx-0 z-3" onClick={handleClickFav}><i className="fa-regular fa-heart"></i></button> 
							)}
						</div>
						<div className="d-flex align-items-center">
							<p className="fs-5 me-5">{pokeData.short}</p>
							{
								pokemon.types?.map((item,index)=>{
									let typeID = item.type.url.split("/")[6]
									return(
										<img key={index} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-vi/x-y/" + typeID + ".png"} className="ms-2" />
									)
								})
							}
						</div>
						<p>{pokeData.desc}</p>
						<p className="text-capitalize">Introduced in generation: <span className="text-uppercase fw-bold">{pokeData.gen}</span></p>
						<div className="d-flex">
							<p className="me-5">Height: {pokemon.height/10}m</p>
							<p>Weight: {pokemon.weight/10}kg</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}