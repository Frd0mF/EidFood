import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactStars from "react-rating-stars-component";
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Comments from 'components/Comments';
import { useSession } from "next-auth/react";


function recipeDetails({ recipe, dbComments }) {


    const router = useRouter();
    const [isSaved, setIsSaved] = useState(false)
    const [personalRating, setPersonalRating] = useState(0)
    const { data: session } = useSession();


    useEffect(() => {
        async function getSavedStatus() {
            const { recipeId } = router.query;
            await fetch(`/api/recipeOps/getIsSaved?recipeId=${recipeId}`)
                .then(res => res.json())
                .then(data => setIsSaved(data.isSaved))
        }
        getSavedStatus();

        async function getPersonalRating() {
            const { recipeId } = router.query;
            await fetch(`/api/recipeOps/getPersonalRating?recipeId=${recipeId}`)
                .then(res => res.json())
                .then(data => setPersonalRating(+data?.personalRating))
        }
        getPersonalRating();
    }, [])

    const [heartIconHover, setHeartIconHover] = React.useState(false);

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes };
    }

    const { hours, minutes } = toHoursAndMinutes(recipe.totalTime);

    const changeRating = async (newRating) => {
        const { recipeId } = router.query;
        await fetch(`/api/recipeOps/rate/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipeId,
                rating: newRating
            })
        })
            .catch(err => console.log(`Error: ${err}`)
            )
    };

    const saveRecipe = async () => {
        await fetch(`/api/recipeOps/save/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipeId: recipe.uri?.split('#')[1] || recipe.id,
            })
        })
            .then(res => {
                if (res.status === 200) {
                    setIsSaved(true)
                }
            })
            .catch(err => console.log(`Error: ${err}`)
            )
    };

    const unsaveRecipe = async () => {
        await fetch(`/api/recipeOps/unsave/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipeId: recipe.uri?.split('#')[1] || recipe.id,
            })
        })
            .then(res => {
                if (res.status === 200) {
                    setIsSaved(false)
                }
            })
            .catch(err => console.log(`Error: ${err}`)
            )
    };

    const handleImgError = (e) => {
        e.target.src = '/images/recipe-placeholder.png'
        console.log('error')
    }

    return (
        <div className='grid grid-cols-12 my-12 mx-36'>
            <div className='col-span-8'>
                <div className='flex flex-col'>
                    <div className='flex flex-col items-start'>
                        <h1 className="text-4xl font-bold text-primary">{recipe.label}</h1>
                        <h3 className='ml-3 text-2xl text-font-color-light'>({recipe.yield} Servings)</h3>
                    </div>
                    <div className='flex flex-row my-3 space-x-12'>
                        <div className='flex flex-col items-center mt-3 ml-4 space-x-2'>
                            <p className="text-xl text-font-color-light">Total time</p>
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
                            <p className="text-xl text-font-color-light">{recipe.numRatings} Review(s)</p>
                            <div className="flex mb-4">
                                <ReactStars
                                    count={5}
                                    value={recipe?.avgRating}
                                    size={42}
                                    isHalf={true}
                                    edit={false}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                            </div>
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

                        <Comments dbComments={dbComments} />
                    </div>
                </div>
            </div>
            <div className='col-span-4'>
                <div className='flex flex-col items-center'>
                    <div className="relative">
                        <img
                            onError={handleImgError}
                            className='object-cover rounded-md shadow-xl w-80 h-80'
                            src={recipe.image} alt={recipe.label} />
                        {
                            isSaved ?
                                heartIconHover ?
                                    <BsHeart
                                        onMouseLeave={() => setHeartIconHover(false)}
                                        onClick={unsaveRecipe}
                                        className="absolute top-0 right-0 w-12 h-12 p-2 text-primary" />
                                    :
                                    <BsHeartFill
                                        onMouseEnter={() => setHeartIconHover(true)}
                                        onClick={unsaveRecipe}
                                        className="absolute top-0 right-0 w-12 h-12 p-2 text-primary" />
                                :
                                heartIconHover ?
                                    <BsHeartFill
                                        onMouseLeave={() => setHeartIconHover(false)}
                                        onClick={saveRecipe}
                                        className="absolute top-0 right-0 w-12 h-12 p-2 text-primary" />
                                    :
                                    <BsHeart
                                        onMouseEnter={() => setHeartIconHover(true)}
                                        onClick={saveRecipe}
                                        className="absolute top-0 right-0 w-12 h-12 p-2 text-primary" />
                        }
                    </div>

                    <p className="text-xl text-font-color-light -mb-3">My Rating</p>
                    <ReactStars
                        key={personalRating}
                        count={5}
                        value={personalRating}
                        onChange={changeRating}
                        edit={session?.user ? true : false}
                        size={42}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                    {
                        !session?.user ?
                            <div className="flex space-x-4 mb-3">
                                <h1 className="text-xl font-semibold text-font-color-light">Please
                                    <Link href="/register" className="underline mx-1">sign in</Link> to rate this recipe</h1>
                            </div>
                            :
                            null
                    }
                    <div className='flex flex-col'>
                        <div className='bg-ingredient-background px-3 py-6'>
                            <h1 className='text-3xl font-black'>Ingredients</h1>
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
                        <h1 className="mt-12 text-2xl font-bold text-font-color-light">Nutrients (per serving)</h1>
                        {
                            recipe.digest?.map((item, index) => (
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
        </div >
    )
}

export default recipeDetails

const cloudinary = require('cloudinary').v2
import prisma from '../../lib/prismadb'
import Link from 'next/link';

export async function getStaticProps(context) {
    const { recipeId } = context.params;

    const dbRecipe = await prisma.recipe.findUnique({
        where: {
            id: recipeId
        },
        include: {
            ratings: true
        }
    })
    if (dbRecipe?.ratings) {
        const ratings = dbRecipe.ratings.map(rating => rating.rating)
        const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length
        dbRecipe.avgRating = avgRating
        // number of ratings
        dbRecipe.numRatings = ratings.length
        // remove ratings from recipe
        delete dbRecipe.ratings
    }

    const dbComments = await prisma.comment.findMany({
        where: {
            recipeId
        },
        include: {
            replies: {
                include: {
                    user: true
                }
            },
            user: true
        },
    });

    if (dbRecipe) {
        return {
            props: {
                recipe: dbRecipe,
                dbComments
            },
            revalidate: 60 * 60 * 24
        }
    }
    const data = await fetch(process.env.APP_URL + '/api/edmamAPI?recipeId=' + recipeId)
        .then(res => res.json())

    if (data?.recipes) {
        // Configuration 
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        const res = await cloudinary.uploader.upload(data.recipes.image, {
            public_id: `recipe/${recipeId}`,
            overwrite: true,
            invalidate: true,
            resource_type: 'image',
            folder: 'recipe',
            use_filename: true,
            unique_filename: true,
        })
        data.recipes.image = res.secure_url
        await prisma.recipe.create({
            data: {
                id: recipeId,
                label: data.recipes.label,
                yield: data.recipes.yield,
                image: data.recipes.image,
                totalTime: data.recipes.totalTime,
                cuisineType: data.recipes.cuisineType,
                mealType: data.recipes.mealType,
                dishType: data.recipes.dishType,
                ingredients: data.recipes.ingredients,
                healthLabels: data.recipes.healthLabels,
                digest: data.recipes.digest
            }
        })
    }

    return {
        props: {
            recipe: data?.recipes || {},
            dbComments
        },
        revalidate: 60 * 60 * 24
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}