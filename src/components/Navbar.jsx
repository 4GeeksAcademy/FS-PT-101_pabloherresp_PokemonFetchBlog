import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const Navbar = () => {
	const {store,dispatch} = useGlobalReducer()
	const [search,setSearch] = useState("")
	const navigate = useNavigate()

	const handleRemoveFav = (id,e) => {
		dispatch({type: "remove_fav", payload: id})
	}

	return (
		<nav className="navbar navbar-light bg-info-subtle">
			<div className="container">
				<Link to="/1">
					<span className="navbar-brand mb-0 h1">Pokemon Wiki</span>
				</Link>
				<div className="d-flex">
					<div className="dropdown ms-auto me-2 my-1">
						<button className="btn btn-warning dropdown-toggle px-4" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favs: {store.favs.length}
						</button>
						<ul className="dropdown-menu dropdown-menu-end">
								{(store.favs.length > 0 ? store.favs.sort((a,b)=>{return a-b}).map((item,index)=>{
									return(
										<li key={index} className="d-flex align-items-center">
											<span className="text-capitalize ms-2">{store.pokemons[item-1]?.name}</span>
											<button className="btn btn-sm ms-auto" onClick={()=>{handleRemoveFav(item)}}><i className="fa-solid fa-x"></i></button>
										</li>
									)
								}): <p className="text-center">Not found</p>)}
						</ul>
					</div>
					<div className="dropdown  my-1">
						<input type="text" placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} className="form-control dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"/>
						<ul className="dropdown-menu dropdown-menu-end DropdownSearch">
						{
							( store.pokemons.filter((item)=>item.name.includes(search)).length > 0 ? store.pokemons.filter((item)=>item.name.includes(search)).map((item,index)=>{
								let id = item.url.split("/")[6]
								let gen = "vii"
								if(id >= 806)
									gen = "viii"
								return(
									<li key={index}>
										<Link className="dropdown-item text-capitalize d-flex align-items-center" href="#" to={"/pokemon/"+id}>
											<img className="mx-2" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-" + gen +  "/icons/" + id + ".png"}/>
											{item.name}
										</Link></li>
								)
							}) : <p className="text-center">Not found</p>)
						}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};