"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface SearchResult {
    id: number
    name: string
}

export function SearchBar() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const searchPokemon = async () => {
            if (query.trim().length < 2) {
                setResults([])
                return
            }

            setLoading(true)
            try {
                // First get a batch of pokemon (limited for performance)
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000")
                const data = await response.json()

                // Filter pokemon by name containing the query
                const filteredResults = data.results
                    .filter((pokemon: any) => pokemon.name.includes(query.toLowerCase()))
                    .slice(0, 5) // Limit to first 5 results for dropdown
                    .map((pokemon: any) => {
                        const id = pokemon.url.split("/").filter(Boolean).pop()
                        return {
                            id: Number.parseInt(id),
                            name: pokemon.name,
                        }
                    })

                setResults(filteredResults)
            } catch (error) {
                console.error("Error searching Pokémon:", error)
            } finally {
                setLoading(false)
            }
        }

        const debounceTimer = setTimeout(() => {
            searchPokemon()
        }, 300)

        return () => clearTimeout(debounceTimer)
    }, [query])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.toLowerCase())}`)
            setResults([]) // Clear results after search
        }
    }

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <div className="relative flex items-center">
                <Input
                    type="text"
                    placeholder="Search Pokémon by name..."
                    className="pr-10 border-2 border-red-200 rounded-full focus-visible:ring-red-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" size="icon" variant="ghost" className="absolute right-0 text-gray-500 hover:text-red-500">
                    <Search className="w-5 h-5" />
                    <span className="sr-only">Search</span>
                </Button>
            </div>

            {results.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                    <ul className="py-1">
                        {results.map((result) => (
                            <li key={result.id} className="px-4 py-2 hover:bg-gray-100">
                                <Link
                                    href={`/pokemon/${result.id}`}
                                    className="block text-sm capitalize"
                                    onClick={() => {
                                        setQuery("")
                                        setResults([])
                                    }}
                                >
                                    #{result.id.toString().padStart(3, "0")} {result.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    )
}

