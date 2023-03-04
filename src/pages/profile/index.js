import { getSession } from "next-auth/react";
import Link from "next/link";

const Profile = ({ savedRecipes }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
                <h1 className="text-6xl font-base text-primary">
                    Profile
                </h1>
                <div className="flex flex-wrap items-start justify-around mt-6 sm:w-full">
                    {
                        savedRecipes?.map((recipe) => {
                            return (
                                <div
                                    key={recipe.id}
                                    className="max-w-sm overflow-hidden rounded shadow-lg">
                                    <img className="w-96 h-96" src={recipe.image} alt={recipe.label} />
                                    <div className="px-6 py-4">
                                        <div className="mb-2 text-xl font-bold truncate">{recipe.label}</div>

                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">{recipe.cuisineType}</span>
                                        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">{recipe.mealType}</span>
                                        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">{recipe.dishType}</span>
                                    </div>
                                    <Link href={`/recipe/${recipe.id}`} className="block w-full px-4 py-2 font-semibold text-center text-white bg-primary hover:bg-primary-dark">
                                        View Recipe
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </main >
        </div >

    )
}

export default Profile

export async function getServerSideProps(context) {
    const userSession = await getSession(context)
    //get all recipes
    const user = await prisma.user.findUnique({
        where: {
            email: userSession?.user?.email
        },
        include: {
            recipes: true
        }
    })

    return {
        props: {
            savedRecipes: user?.recipes || []
        }
    }
}
