import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="container flex flex-col items-center justify-center px-4 py-16 mx-auto text-center">
            <h1 className="mb-4 text-6xl font-bold text-red-500">404</h1>
            <h2 className="mb-6 text-2xl font-semibold">Pokémon Not Found</h2>
            <p className="max-w-md mb-8 text-gray-600">
                The Pokémon you're looking for might be hiding in tall grass or doesn't exist.
            </p>
            <Link href="/">
                <Button className="bg-red-500 hover:bg-red-600">Return to Home</Button>
            </Link>
        </div>
    )
}

