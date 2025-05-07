import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import { Layout } from "./pages/Layout"
import { Home } from "./pages/Home"
import { PokemonView } from "./pages/PokemonView"

export const router = createBrowserRouter(
    createRoutesFromElements(
      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path= "/" element={<Home />} />
        <Route path= "/:page" element={<Home/> }/>
        <Route path= "/pokemon/:id" element={<PokemonView />} />
      </Route>
    )
)