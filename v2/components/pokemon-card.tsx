"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface PokemonProps {
    pokemon: {
        id: number
        name: string
        url: string
    }
}

interface PokemonDetails {
    id: number
    name: string
    sprites: {
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    }
    types: {
        type: {
            name: string
        }
    }[]
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

export function PokemonCard({ pokemon }: PokemonProps) {
    const [details, setDetails] = useState<PokemonDetails | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
                const data = await response.json()
                setDetails(data)
            } catch (error) {
                console.error(`Error fetching details for ${pokemon.name}:`, error)
            } finally {
                setLoading(false)
            }
        }

        fetchDetails()
    }, [pokemon.id, pokemon.name])

    return (
        <Link href={`/pokemon/${pokemon.id}`}>
            <Card className="h-full overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-105">
                <CardContent className="flex flex-col items-center p-4">
                    {loading || !details ? (
                        <>
                            <Skeleton className="w-32 h-32 mb-4 rounded-full" />
                            <Skeleton className="w-32 h-6 mb-2" />
                            <Skeleton className="w-20 h-4" />
                        </>
                    ) : (
                        <>
                            <div className="relative w-32 h-32 mb-4">
                                <Image
                                    src={
                                        details.sprites.other["official-artwork"].front_default || "/placeholder.svg?height=128&width=128"
                                    }
                                    alt={details.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold capitalize">{details.name}</h3>
                            <div className="flex gap-2">
                                {details.types.map((type) => (
                                    <Badge key={type.type.name} className={`${typeColors[type.type.name] || "bg-gray-500"} text-white`}>
                                        {type.type.name}
                                    </Badge>
                                ))}
                            </div>
                            <div className="mt-2 text-sm text-gray-500">#{details.id.toString().padStart(3, "0")}</div>
                        </>
                    )}
                </CardContent>
            </Card>
        </Link>
    )
}

