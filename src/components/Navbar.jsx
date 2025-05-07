import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";

export const Navbar = () => {
	const {store,dispatch} = useGlobalReducer()
	const [search,setSearch] = useState("")

	return (
		<nav className="navbar navbar-light bg-info-subtle">
			<div className="container">
				<Link to="/1">
					<span className="navbar-brand mb-0 h1">Pokemon Wiki</span>
				</Link>
				<div className="dropdown">
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
		</nav>
	);
};