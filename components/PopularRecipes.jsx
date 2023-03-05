import React from 'react'
import RecipeCard from './RecipeCard'
import Fade from 'react-reveal/Fade'

function PopularRecipes({ topRecipes }) {
    return (
        <>
            <h1 className="text-3xl lg:text-6xl font-bold text-font-color-light mb-6 3xl:mb-12 text-center">Popular Recipes </h1>
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
        </>

    )
}
export default PopularRecipes