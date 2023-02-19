import React from 'react'
import RecipeCard from './RecipeCard'
import Fade from 'react-reveal/Fade'

function PopularRecipes() {
    return (
        <>
            <h1 className="text-3xl lg:text-6xl font-bold text-font-color-light mb-6 3xl:mb-12 text-center">Popular Recipes </h1>
            <div className='flex flex-wrap items-center justify-center space-x-12 xl:justify-between 3xl:justify-center xl:space-y-6 lg:space-y-0 lg:w-9/12 lg:min-h-[50vh] lg:mx-auto'>
                <Fade down>
                    <RecipeCard
                        imageSrc="/recipe.png"
                        name="Delicious Recipe"
                        prepTime="30 minutes"
                        cookTime="1 hour"
                        rating={5}
                    />
                    <RecipeCard
                        imageSrc="/recipe.png"
                        name="Delicious Recipe"
                        prepTime="30 minutes"
                        cookTime="1 hour"
                        rating={4}
                    />
                    <RecipeCard
                        imageSrc="/recipe.png"
                        name="Delicious Recipe"
                        prepTime="30 minutes"
                        cookTime="1 hour"
                        rating={5}
                    />
                </Fade>
            </div>
        </>

    )
}
export default PopularRecipes