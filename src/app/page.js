"use client";
import usePokemonApi from "@/hooks/usePokemonApi";
import { useEffect } from "react";
import homeStyles from "./page.module.css";
import PokemonCard from "@/components/Pokemon/PokemonCard";

export default function Home() {
  const pokeData = usePokemonApi();

  // Function to refresh the Pokémon data
  const refreshPokemonData = () => {
    if (pokeData.totalPokemonCount === 0) {
      pokeData.getNumberOfPokemon();
    }
    pokeData.getRandomPokemon(3); // Fetch new random Pokémon (or adjust this number)
  };

  useEffect(() => {
    if (pokeData.totalPokemonCount === 0) {
      pokeData.getNumberOfPokemon();
    }
    if (!pokeData.randomPokemon.length) {
      pokeData.getRandomPokemon(3);
    }
  }, [pokeData]);

  const randomPokemonListJsx = pokeData.randomPokemon.map(function (pokemon) {
    const quickInfo = pokeData.getPokemonQuickInfo(pokemon);
    return (
      <PokemonCard
        key={`poke-card-${quickInfo.id}`}
        id={quickInfo.id}
        name={quickInfo.name}
        img={quickInfo.img}
        types={quickInfo.types}
        isFavorite={pokeData.isFavorite(quickInfo.id)}
        onFavoriteClick={() => pokeData.toggleFavorite(pokemon)}
      />
    );
  });

  return (
    <div className={homeStyles.wrapper}>

    <main className={homeStyles.mainContent}>
      <h1 className={homeStyles.title}>✨ Welcome to my Pokémon Showcase! ✨</h1>
      <p className={homeStyles.description}>
        Here you can find a list of Pokémon, their types, and their images. You can also favorite them by clicking the heart icon on the card.
        <br /> <br />
        There are currently {pokeData.totalPokemonCount} Pokémon in the database.
      </p>

      <section className={homeStyles.pokemonCardContainer}>
        {randomPokemonListJsx}
      </section>
      <button onClick={refreshPokemonData} className={homeStyles.refreshButton}>
        Refresh Pokémon List
      </button>
      
    </main>
    </div>
  );
}