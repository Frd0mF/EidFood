import React from 'react'
import RecipeCard from './RecipeCard'
import Fade from 'react-reveal/Fade'

function PopularRecipes({ topRecipes }) {
    return (
        <div
            id="popular-recipes"
        >
            <h1 className="mb-6 text-3xl font-bold text-center lg:text-6xl text-font-color-light 3xl:mb-12">Popular Recipes </h1>
            <div className='flex flex-wrap items-center justify-center space-x-12 xl:justify-between 3xl:justify-center  lg:space-y-0 lg:w-9/12 lg:min-h-[50vh] lg:mx-auto'>
                <Fade down>
                    {
                        topRecipes.map((recipe, index) => {
                            return (
                                <RecipeCard
                                    key={index}
                                    recipeId={recipe.id}
                                    imageSrc={recipe.image}
                                    name={recipe.label}
                                    prepTime={recipe.totalTime}
                                    cuisineType={recipe.cuisineType}
                                    rating={recipe.AvgRating}
                                    numberOfRatings={recipe.numberOfRatings}
                                />
                            )
                        })
                    }
                </Fade>
            </div>
        </div>

    )
}
export default PopularRecipes