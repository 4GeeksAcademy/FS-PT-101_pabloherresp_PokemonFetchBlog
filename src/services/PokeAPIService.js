export const PokeAPIService = {}

// Uso del localStorage para evitar llamar a la API para cargar todos los pokemon cada vez
PokeAPIService.getAllPokemon = async () => {
	if(localStorage.getItem("pokemons")){
		const data = localStorage.getItem("pokemons")
		return JSON.parse(data)
	}
	try {
		const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
		if(!resp.ok)
			throw new Error("Error fetching pokemon list")
		
		const data = await resp.json()
		
		localStorage.setItem("pokemons", JSON.stringify(data))
		return data
	} catch (error) {
		console.log(error)
	}
}

// se hacen 2 fetch, uno para datos del pokemon y otro para los datos de la especie
PokeAPIService.getSpecificPokemon = async (id) => {
	try {
		const resp = await fetch("https://pokeapi.co/api/v2/pokemon/" + id)
		if(!resp.ok) throw new Error("Couldn't fetch data for pokemon in " + id)
		const data = await resp.json()

		const resp2 = await fetch(data.species.url)
		if(!resp2.ok) throw new Error("Could fettch data species for pokemon in " + id)
		const data2 = await resp2.json()

		return {...data, species: data2}

		} catch (error) {
			console.log(error)
	}
}