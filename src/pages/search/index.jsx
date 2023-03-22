import SearchBar from "components/searchResults/SearchBar"
import ResultCard from "components/searchResults/ResultCard"
import Filters from "components/searchResults/Filters"
import { useEffect, useState } from "react"
import LoadingSkeleton from "components/searchResults/LoadingSkeleton"
import InfiniteScroll from "react-infinite-scroll-component";

function index({ recipes, total, next }) {
    console.log(recipes)

    const [isRefreshing, setIsRefreshing] = useState(true)
    const [derivedRecipes, setDerivedRecipes] = useState()
    const [derivedNext, setDerivedNext] = useState(next)
    const [showScrollToTop, setShowScrollToTop] = useState(false)

    useEffect(() => {
        setIsRefreshing(false)
        setDerivedRecipes(recipes)
    }, [recipes])

    const fetchMoreData = async () => {
        await fetch(next)
            .then(res => res.json())
            .then(data => {
                setDerivedRecipes([...derivedRecipes, ...data.hits])
                setDerivedNext(data.next)
            })
    }

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                setShowScrollToTop(true)
            }
            else {
                setShowScrollToTop(false)
            }
        })
        return () => window.removeEventListener('scroll', () => {
            if (window.scrollY > 600) {
                setShowScrollToTop(true)
            }
            else {
                setShowScrollToTop(false)
            }
        })
    }, [])


    return (
        <div className="flex flex-col items-center">
            <SearchBar setIsRefreshing={setIsRefreshing} />
            <p className="mb-12 -mt-12 text-2xl text-font-color-light">Total results: {total}</p>
            <div className="flex items-start w-full">
                <div className="flex flex-col items-center justify-center w-3/12 h-full ml-16">
                    <Filters />
                </div>
                {
                    isRefreshing ?
                        <div className="flex flex-col space-y-10">
                            <LoadingSkeleton />
                            <LoadingSkeleton />
                        </div>
                        :
                        <div className={recipes.length === 0 ? 'w-full' : ''}>
                            <>
                                {recipes.length === 0 && <p className="w-2/3 text-2xl text-center text-font-color-light">No recipes found or max requests reached</p>}
                                <InfiniteScroll
                                    dataLength={derivedRecipes.length}
                                    next={() => {
                                        fetchMoreData()
                                    }}
                                    hasMore={derivedNext !== undefined}
                                    loader={derivedNext !== undefined && <LoadingSkeleton />}
                                >
                                    {derivedRecipes.map((recipe, index) => (
                                        <ResultCard
                                            key={index}
                                            recipe={recipe.recipe} />

                                    ))}
                                </InfiniteScroll>
                            </>
                            {
                                showScrollToTop &&
                                <div className="fixed bottom-0 right-0 mb-10 mr-10">
                                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                    </button>
                                </div>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default index

import prisma from "../../lib/prismadb"
export async function getServerSideProps(context) {
    const { q, minCalories, maxCalories, health } = context.query
    let data = await fetch(process.env.APP_URL + '/api/edmamAPI?q=' + q + '&minCalories=' + (minCalories || '') + '&maxCalories=' + (maxCalories || '') + '&health=' + (health || ''))
        .then(res => res.json())


    const prismafulltextsearch = await prisma.recipe.findMany({
        where: {
            // AND: [
            //     {
            label: {
                search: q
            },
            //     },
            // ]
        },
    })
    let recipe = []

    if (prismafulltextsearch.length) {
        prismafulltextsearch?.forEach((item, index) => {
            recipe.push({
                recipe: item
            }
            )
        })
    }
    console.log(recipe)

    if (data?.length) {
        //add to the beginning of data.recipes
        data = data.recipes.push(
            ...recipe)
    } else {
        data.recipes = recipe

    }



    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            recipes: data.recipes || [],
            total: data.total || 0,
            next: data.next || 0
        }
    }
}