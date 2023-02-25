import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";

function recipeDetails({ recipe }) {

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes };
    }

    const { hours, minutes } = toHoursAndMinutes(recipe.totalTime);

    const fullStar = (
        <svg aria-hidden="true" class="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    );

    const emptyStar = (
        <svg aria-hidden="true" class="w-8 h-8 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    );

    const roundedRating = Math.round(5 * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= roundedRating) {
            stars.push(fullStar);
        } else {
            stars.push(emptyStar);
        }
    }


    console.log(recipe)
    return (
        <div className='grid grid-cols-12 my-12 mx-36'>
            <div className='col-span-8'>
                <div className='flex flex-col'>
                    <div className='flex flex-row items-center'>
                        <h1 className="text-4xl font-bold text-primary">{recipe.label}</h1>
                        <h3 className='ml-3 text-2xl text-font-color-light'>({recipe.yield} Servings)</h3>
                    </div>
                    <div className='flex flex-row my-3 space-x-12'>
                        <div className='flex flex-col items-center mt-3 ml-4 space-x-2'>
                            <p className="text-xl text-font-color-light">Cuisine type</p>
                            <p className="text-xl text-font-color-light"><span className={!hours ? 'hidden' : ''}>{hours} hour</span> <span className={!minutes ? 'hidden' : ''}>{minutes} minutes</span></p>
                        </div>
                        <div className="flex flex-col items-center mt-3 ml-4 space-x-2">
                            <p className="text-xl text-font-color-light">Cuisine type</p>
                            <p className="text-xl text-font-color-light first-letter:uppercase">{recipe.cuisineType}</p>
                        </div>
                        <div className="flex flex-col items-center mt-3 ml-4 space-x-2">
                            <p className="text-xl text-font-color-light">Meal type</p>
                            <p className="text-xl text-font-color-light first-letter:uppercase">{recipe.mealType}</p>
                        </div>
                        <div className="flex flex-col items-center mt-3 ml-4 space-x-2">
                            <p className="text-xl text-font-color-light">Dish type</p>
                            <p className="text-xl text-font-color-light first-letter:uppercase">{recipe.dishType}</p>
                        </div>
                        <div className="flex flex-col items-center mt-3 ml-4 space-x-2">
                            <p className="text-xl text-font-color-light">99 Reviews</p>
                            <div className="flex mb-4">{stars}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4" >
                        {
                            recipe.ingredients.map((ingredient, index) => (
                                <div key={index} className="flex flex-col items-center p-1 my-2 bg-ingredient-background w-fit h-fit">
                                    {
                                        ingredient.image ?
                                            <LazyLoadImage src={ingredient.image} alt={ingredient.text} width={192} height={192} />
                                            :
                                            <img className="w-48" src="/logo.png" alt="ingredient image not found" />
                                    }
                                    <p className="w-48 mt-4 text-xl text-center truncate text-font-color-light first-letter:uppercase">{ingredient.food}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='flex flex-col mt-12'>
                        <h1 className="text-2xl font-bold text-font-color-light">Health Labels</h1>
                        <div className="flex flex-row flex-wrap">
                            {recipe.healthLabels.map((label, index) => (
                                <div key={index} className="mx-1 my-2 text-xl rounded-full text-font-color-light bg-primary">
                                    <p className="w-full px-4 py-2 text-secondary">{label}</p>
                                </div>
                            ))}
                        </div>
                        <h1 className="mt-12 text-2xl font-bold text-font-color-light">Nutrients (per serving)</h1>
                        {
                            recipe.digest.map((item, index) => (
                                <div key={index} className="flex flex-row w-full p-2 px-6 my-2 bg-ingredient-background">
                                    <p className="flex justify-start w-1/3 text-xl text-font-color-light">{item.label}</p>
                                    <p className="flex justify-center w-1/3 text-xl text-font-color-light">{(item.total / recipe.yield).toFixed(2)} {item.unit}</p>
                                    <p className="flex justify-end w-1/3 text-xl text-font-color-light">{(item.daily / recipe.yield).toFixed(2)} %</p>
                                </div>
                            ))

                        }
                    </div>
                </div>
            </div>
            <div className='col-span-4'>
                <div className='flex flex-col items-center'>
                    <img
                        className='object-cover mb-12 rounded-md shadow-xl w-80 h-80'
                        src={recipe.image} alt={recipe.label} />
                    <div className='flex flex-col px-3 py-6 bg-ingredient-background'>
                        <h1 className='text-3xl font-black'>Ingredients</h1>
                        {/* good design for a list of ingredients tailwind css */}
                        <ul className='flex flex-col mt-6 space-y-2'>
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className='flex flex-row items-center space-x-2'>
                                    <div className='flex flex-col items-center justify-center w-8 h-8 text-xl text-white rounded-full bg-primary'>
                                        <p>{index + 1}</p>
                                    </div>
                                    <p className='text-xl w-96 text-font-color-light'>{ingredient.text}.</p>
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default recipeDetails

export async function getServerSideProps(context) {
    const { recipeId } = context.params;
    const data = await fetch(process.env.APP_URL + '/api/edmamAPI?recipeId=' + recipeId)
        .then(res => res.json())

    return {
        props: {
            recipe: data?.recipes || {}
        }
    }
}