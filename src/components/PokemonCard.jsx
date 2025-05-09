import { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom"

export const PokemonCard = (props) => {
	const {store,dispatch} = useGlobalReducer()
	const [isFav,setFav] = useState(false)
	const navigate = useNavigate()

	useEffect(()=>{
		if(store.favs.includes(parseInt(props.pid)))
			setFav(true)
		else
			setFav(false)
	},[store.favs])

	const handleClickFav = (e) => {
		if(!isFav)
			dispatch({type: "add_fav", payload: props.pid})
		else
			dispatch({type: "remove_fav", payload: props.pid})
		setFav(!isFav)
		e.stopPropagation()
	}

	const handleClickCard = () => {
		navigate("/pokemon/" + props.pid)
	}

	return (
		<div className="col-12 col-md-6 col-lg-3 px-5 py-2 p-md-2">
			<div className={"card h-100 pt-3 px-3" + (isFav ? " border-warning": "")} onClick={handleClickCard}>
					<img src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + props.pid + ".png"} className="card-img-top PokeCardImage" alt="..."/>
				<div className="card-body d-flex align-items-center">
					<h1 className="mx-auto text-capitalize fs-5"><span>#{props.pid} </span><span>{props.name}</span></h1>
					{(isFav ?
					<button type="button" className="btn btn-warning btn-sm ms-2" onClick={(e)=>handleClickFav(e)}><i className="fa-solid fa-heart text-white"></i></button> :
					<button type="button" className="btn btn-outline-warning btn-sm ms-2" onClick={(e)=>handleClickFav(e)}><i className="fa-regular fa-heart"></i></button> 
					 )}
				</div>
			</div>
		</div>
	)
}