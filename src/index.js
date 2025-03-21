import React from "react";
import { createRoot } from "react-dom/client";
import PokemonList from "./pokemon-list-page";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<PokemonList />);
