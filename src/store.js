export const initialStore=()=>{
		return{
			pageSize: 48,
			pages: [],
			count: 0,
			pokemons: [],
			favs: []
		}
}

export default function storeReducer(store, action = {}) {
	let aux_favs = []
	switch(action.type){
		case 'loadAllPokemon':
			return {
				...store,
				count: action.payload.count,
				pokemons: action.payload.results,
				pages: [...Array(Math.ceil(action.payload.count/store.pageSize)).keys()]
			}
		case 'load_favs':
			return {
				...store, favs: JSON.parse(localStorage.getItem("favs"))
			}
		case 'add_fav':
			aux_favs = [...store.favs, parseInt(action.payload) ]
			localStorage.setItem("favs", JSON.stringify(aux_favs))
			return {
				...store, favs: aux_favs
			}
		case 'remove_fav':
			aux_favs = [...store.favs]
			let index = aux_favs.indexOf(parseInt(action.payload))
			if (index !== -1) {
				aux_favs.splice(index, 1)
			}
			localStorage.setItem("favs", JSON.stringify(aux_favs))
			return {
				...store, favs: aux_favs
			}
		default:
			throw Error('Unknown action.');
	}    
}
