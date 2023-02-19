import React from 'react'
import { BsClockHistory, BsArrowRight } from 'react-icons/bs'
import { RxDash } from 'react-icons/rx'
import { RiAlarmWarningLine } from 'react-icons/ri'
import Link from 'next/link'

function ResultCard({ recipe }) {
    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes };
    }

    const { hours, minutes } = toHoursAndMinutes(recipe.totalTime);

    return (
        <>
            <div className="flex items-start justify-between h-full max-w-5xl duration-500 ease-in-out hover:drop-shadow-2xl">
                <div className="flex flex-col items-start justify-center w-[900px] h-full">
                    <h1 className="w-11/12 text-4xl font-bold text-primary">{recipe.label}<span className='ml-3 text-2xl text-font-color-light'>({recipe.yield} Servings)</span></h1>
                    <div className="flex items-center mt-3 space-x-2">
                        {(hours || minutes) ?
                            <>
                                <BsClockHistory className="text-2xl text-font-color-light" />
                                <p className="text-xl text-font-color-light">Ready in <span className={!hours && 'hidden'}>{hours} hour</span> <span className={!minutes && 'hidden'}>{minutes} minutes</span></p>
                            </>
                            : null}
                        {recipe.cautions.length ?
                            <>
                                <RiAlarmWarningLine className="text-2xl text-font-color-light" />
                                {recipe.cautions.map((caution, index) => {
                                    return (
                                        <p className='text-xl underline text-font-color-light' key={index}>{caution}</p>
                                    )
                                })
                                }
                            </>
                            : null
                        }
                    </div>

                    <div className="flex items-center mt-3 ml-4 space-x-2">
                        <RxDash className="text-2xl text-font-color-light" />
                        <p className="text-xl text-font-color-light">Cuisine type: {recipe.cuisineType}</p>
                    </div>
                    <div className="flex items-center ml-4 space-x-2">
                        <RxDash className="text-2xl text-font-color-light" />
                        <p className="text-xl text-font-color-light">Meal type: {recipe.mealType}</p>
                    </div>
                    <div className="flex items-center ml-4 space-x-2">
                        <RxDash className="text-2xl text-font-color-light" />
                        <p className="text-xl text-font-color-light">Dish type: {recipe.dishType}</p>
                    </div>

                    <div className="flex items-center justify-between w-9/12 mx-auto mt-6">
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-font-color-light">Calories</h3>
                            <h3 className="text-xl text-font-color-light">{(recipe.calories / recipe.yield).toFixed(0)}Kj</h3>
                            <span className="flex items-center justify-center w-full h-0.5 bg-primary"></span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-font-color-light">Protein</h3>
                            <h3 className="text-xl text-font-color-light">{(recipe.totalNutrients.PROCNT.quantity / recipe.yield).toFixed(0)}g</h3>
                            <span className="flex items-center justify-center w-full h-0.5 bg-primary"></span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-font-color-light">Fat</h3>
                            <h3 className="text-xl text-font-color-light">{(recipe.totalNutrients.FAT.quantity / recipe.yield).toFixed(0)}g</h3>
                            <span className="flex items-center justify-center w-full h-0.5 bg-primary"></span>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h3 className="text-2xl text-font-color-light">Carbs</h3>
                            <h3 className="text-xl text-font-color-light">{(recipe.totalNutrients.CHOCDF.quantity / recipe.yield).toFixed(0)}g</h3>
                            <span className="flex items-center justify-center w-full h-0.5 bg-primary"></span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-end w-4/12 h-full my-auto">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            className='rounded-md shadow-xl w-[256px]'
                            src={recipe.image} alt={recipe.label} />
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                            {recipe.dietLabels[0] && <button className="text-[0.8vi] px-4 py-2 font-semibold text-white rounded-full focus:outline-none hover:bg-font-color-light active:shadow-none bg-font-color">{recipe.dietLabels[0]}</button>}
                            {recipe.dietLabels[1] && <button className="text-[0.8vi] px-4 py-2 font-semibold text-white rounded-full focus:outline-none hover:bg-font-color-light active:shadow-none bg-font-color">{recipe.dietLabels[1]}</button>}
                        </div>
                    </div>
                </div>
            </div >
            <Link href={`/recipe/${recipe.uri}`} className="flex items-center justify-center mt-6 text-xl duration-300 w-fit text-primary hover:text-primary-hover hover:scale-105 hover:drop-shadow-xl">
                More Details
            </Link>
            <span className="flex items-center mx-auto justify-center w-2/3 h-0.5 mt-6 mb-12 bg-font-color"></span>
        </>
    )
}

export default ResultCard