import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PokemonCard } from "@/components/pokemon-card"
import { SearchBar } from "@/components/search-bar"

interface SearchPageProps {
    searchParams: {
        q: string
    }
}

export const metadata: Metadata = {
    title: "Search Results | Pokémon App",
    description: "Search results for Pokémon",
}

async function searchPokemon(query: string) {
    try {
        // First get all pokemon (limited to first 1000 for performance)
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
        const data = await response.json()

        // Filter pokemon by name containing the query
        const filteredResults = data.results.filter((pokemon: any) => pokemon.name.includes(query.toLowerCase()))

        // Format the results with IDs
        return filteredResults.map((pokemon: any) => {
            const id = pokemon.url.split("/").filter(Boolean).pop()
            return {
                id: Number.parseInt(id),
                name: pokemon.name,
                url: pokemon.url,
            }
        })
    } catch (error) {
        console.error("Error searching Pokémon:", error)
        return []
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q || ""
    const results = await searchPokemon(query)

    return (
        <main className="container px-4 py-8 mx-auto">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="ghost" className="flex items-center pl-0 text-red-500 hover:text-red-600">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Back to home
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center space-y-8">
                <div className="text-center">
                    <div className="w-40 h-auto mx-auto mb-4">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png"
                            width={640}
                            height={235}
                            alt="Pokémon Logo"
                            priority
                            className="w-full h-auto"
                        />
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-red-500">Search Results</h1>
                    <p className="text-gray-600">
                        {results.length > 0
                            ? `Found ${results.length} Pokémon matching "${query}"`
                            : `No Pokémon found matching "${query}"`}
                    </p>
                </div>

                <SearchBar />

                {results.length > 0 ? (
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {results.map((pokemon: any) => (
                            <PokemonCard key={pokemon.id} pokemon={pokemon} />
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <p className="mb-4 text-lg text-gray-500">No Pokémon found</p>
                        <p className="text-gray-400">Try searching for a different name</p>
                    </div>
                )}
            </div>
        </main>
    )
}

