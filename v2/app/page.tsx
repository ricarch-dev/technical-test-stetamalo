import { PokemonList } from "@/components/pokemon-list"
import { SearchBar } from "@/components/search-bar"
import Image from "next/image"

export default function Home() {
  return (
    <main className="container px-4 py-8 mx-auto">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center">
          <div className="w-64 h-auto mx-auto mb-4">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
              width={640}
              height={235}
              alt="Pokémon Logo"
              priority
              className="w-full h-auto"
            />
          </div>
          <p className="max-w-md mx-auto text-gray-600">Search and discover your favorite Pokémon</p>
        </div>
        <SearchBar />
        <PokemonList />
      </div>
    </main>
  )
}
