"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { PokemonCard } from "./pokemon-card"

interface Pokemon {
    id: number
    name: string
    url: string
}

export function PokemonList() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState(true)
    const [offset, setOffset] = useState(0)
    const limit = 12

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
                const data = await response.json()

                const formattedData = data.results.map((pokemon: { name: string; url: string }, index: number) => ({
                    id: offset + index + 1,
                    name: pokemon.name,
                    url: pokemon.url,
                }))

                setPokemon((prev) => (offset === 0 ? formattedData : [...prev, ...formattedData]))
            } catch (error) {
                console.error("Error fetching Pokémon:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemon()
    }, [offset])

    const loadMore = () => {
        setOffset((prev) => prev + limit)
    }

    if (loading && pokemon.length === 0) {
        return (
            <div className="flex items-center justify-center h-40">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {pokemon.map((poke) => (
                    <PokemonCard key={poke.id} pokemon={poke} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <Button onClick={loadMore} className="text-white bg-red-500 hover:bg-red-600" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        "Load More Pokémon"
                    )}
                </Button>
            </div>
        </div>
    )
}

