import SearchBar from "components/searchResults/SearchBar"
import ResultCard from "components/searchResults/ResultCard"
import Filters from "components/searchResults/Filters"
import { useEffect, useState } from "react"
import LoadingSkeleton from "components/searchResults/LoadingSkeleton"

function index({ recipes, total }) {

    const [isRefreshing, setIsRefreshing] = useState(true)

    useEffect(() => {
        setIsRefreshing(false)
    }, [recipes])

    return (
        <div className="flex flex-col items-center">
            {isRefreshing && <p>Refreshing...</p>}
            <SearchBar setIsRefreshing={setIsRefreshing} />
            <p className="mb-12 -mt-12 text-2xl text-font-color-light">Total results: {total}</p>
            <div className="flex items-start w-full">
                <Filters />
                {
                    isRefreshing ?
                        <div className="flex flex-col space-y-10">
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                        </div>
                        :
                        <div className={recipes.length === 0 ? 'w-full' : ''}>
                            <>
                                {recipes.length === 0 && <p className="w-2/3 text-2xl text-center text-font-color-light">No recipes found</p>}
                                {recipes.map((recipe, index) => (
                                    <ResultCard
                                        key={index}
                                        recipe={recipe.recipe} />

                                ))}
                            </>
                        </div>
                }
            </div>
        </div>
    )
}

export default index

export async function getServerSideProps(context) {
    const { q, minCalories, maxCalories, health } = context.query
    const data = await fetch(process.env.APP_URL + '/api/edmamAPI?q=' + q + '&minCalories=' + (minCalories || '') + '&maxCalories=' + (maxCalories || '') + '&health=' + (health || ''))
        .then(res => res.json())

    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            recipes: data.recipes || [],
            total: data.total || 0,
        }
    }
}