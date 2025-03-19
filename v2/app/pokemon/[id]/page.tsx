import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PokemonPageProps {
    params: {
        id: string
    }
}

async function getPokemon(id: string) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

        if (!res.ok) {
            return null
        }

        return res.json()
    } catch (error) {
        console.error("Error fetching Pokémon:", error)
        return null
    }
}

async function getPokemonSpecies(id: string) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

        if (!res.ok) {
            return null
        }

        return res.json()
    } catch (error) {
        console.error("Error fetching Pokémon species:", error)
        return null
    }
}

async function getEvolutionChain(url: string) {
    try {
        const res = await fetch(url)

        if (!res.ok) {
            return null
        }

        return res.json()
    } catch (error) {
        console.error("Error fetching evolution chain:", error)
        return null
    }
}

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
    const pokemon = await getPokemon(params.id)

    if (!pokemon) {
        return {
            title: "Pokémon Not Found",
        }
    }

    return {
        title: `${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} | Pokémon App`,
        description: `View details about ${pokemon.name}, a ${pokemon.types.map((t: any) => t.type.name).join("/")} type Pokémon.`,
    }
}

const typeColors: Record<string, string> = {
    normal: "bg-gray-400",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-300",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-300",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-600",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-300",
}

// Helper function to extract ID from URL
function getIdFromUrl(url: string) {
    return url.split("/").filter(Boolean).pop()
}

// Process evolution chain data
function processEvolutionChain(chain: any, evolutions: any[] = []) {
    if (!chain) return []

    const pokemonId = getIdFromUrl(chain.species.url)

    evolutions.push({
        id: pokemonId,
        name: chain.species.name,
    })

    if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evolution: any) => {
            processEvolutionChain(evolution, evolutions)
        })
    }

    return evolutions
}

export default async function PokemonPage({ params }: PokemonPageProps) {
    const pokemon = await getPokemon(params.id)

    if (!pokemon) {
        notFound()
    }

    const pokemonId = pokemon.id.toString().padStart(3, "0")
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    const pokemonTypes = pokemon.types.map((type: any) => type.type.name)
    const pokemonImage = pokemon.sprites.other["official-artwork"].front_default

    // Get previous and next Pokémon IDs
    const prevId = pokemon.id > 1 ? pokemon.id - 1 : null
    const nextId = pokemon.id < 1010 ? pokemon.id + 1 : null

    // Get species and evolution chain
    const species = await getPokemonSpecies(params.id)
    let evolutionChain = null
    let evolutions: any[] = []

    if (species && species.evolution_chain) {
        evolutionChain = await getEvolutionChain(species.evolution_chain.url)
        if (evolutionChain) {
            evolutions = processEvolutionChain(evolutionChain.chain)
        }
    }

    return (
        <main className="container px-4 py-8 mx-auto">
            <div className="mb-6">
                <Link href="/">
                    <Button variant="ghost" className="flex items-center pl-0 text-red-500 hover:text-red-600">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Back to list
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <Card className="overflow-hidden">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="relative w-64 h-64 mb-4">
                            <Image
                                src={pokemonImage || "/placeholder.svg?height=256&width=256"}
                                alt={pokemon.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                        </div>
                        <h1 className="mb-2 text-3xl font-bold capitalize">{pokemonName}</h1>
                        <p className="mb-4 text-gray-500">#{pokemonId}</p>
                        <div className="flex gap-2 mb-4">
                            {pokemonTypes.map((type: string) => (
                                <Badge key={type} className={`${typeColors[type] || "bg-gray-500"} text-white px-3 py-1 text-sm`}>
                                    {type}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex gap-4 mt-4">
                            {prevId && (
                                <Link href={`/pokemon/${prevId}`}>
                                    <Button variant="outline">Previous</Button>
                                </Link>
                            )}
                            {nextId && (
                                <Link href={`/pokemon/${nextId}`}>
                                    <Button variant="outline">Next</Button>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-xl font-semibold">Base Stats</h2>
                            <div className="space-y-4">
                                {pokemon.stats.map((stat: any) => {
                                    const statName = stat.stat.name
                                        .replace(/-/g, " ")
                                        .split(" ")
                                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(" ")

                                    // Calculate color based on stat value
                                    let color = "bg-red-500"
                                    if (stat.base_stat > 49) color = "bg-orange-500"
                                    if (stat.base_stat > 79) color = "bg-yellow-500"
                                    if (stat.base_stat > 99) color = "bg-green-500"

                                    return (
                                        <div key={stat.stat.name} className="grid items-center grid-cols-8 gap-4">
                                            <div className="col-span-2 text-sm font-medium">{statName}</div>
                                            <div className="col-span-1 text-sm text-right">{stat.base_stat}</div>
                                            <div className="col-span-5">
                                                <Progress
                                                    value={Math.min(stat.base_stat, 150)}
                                                    max={150}
                                                    className="h-2"
                                                    indicatorClassName={color}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-xl font-semibold">Details</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Height</p>
                                    <p className="font-medium">{pokemon.height / 10} m</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Weight</p>
                                    <p className="font-medium">{pokemon.weight / 10} kg</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Base Experience</p>
                                    <p className="font-medium">{pokemon.base_experience}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Abilities</p>
                                    <p className="font-medium capitalize">
                                        {pokemon.abilities.map((ability: any) => ability.ability.name.replace(/-/g, " ")).join(", ")}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {evolutions.length > 1 && (
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="mb-4 text-xl font-semibold">Evolution Chain</h2>
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    {evolutions.map((evolution, index) => (
                                        <div key={evolution.id} className="flex items-center">
                                            <Link href={`/pokemon/${evolution.id}`} className="flex flex-col items-center">
                                                <div className="relative w-16 h-16 mb-1">
                                                    <Image
                                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.id}.png`}
                                                        alt={evolution.name}
                                                        fill
                                                        className="object-contain"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <span className="text-xs capitalize">{evolution.name}</span>
                                            </Link>
                                            {index < evolutions.length - 1 && <ChevronRight className="w-5 h-5 mx-2 text-gray-400" />}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </main>
    )
}

