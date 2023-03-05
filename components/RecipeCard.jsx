import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactStars from "react-rating-stars-component";

const RecipeCard = ({ recipeId, imageSrc, name, prepTime, cuisineType, rating, numberOfRatings }) => {

    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes };
    }

    const { hours, minutes } = toHoursAndMinutes(prepTime);

    return (
        <div className="mx-auto overflow-hidden rounded shadow-lg md:max-w-md md:w-96 md:h-[37rem]">
            <Image width={512} height={512} alt="popular recipe image" className="w-full p-2" src={imageSrc} />
            <div className="px-6 py-4">
                <Link href={`/recipe/${recipeId}`} className="mb-2 text-xl font-bold truncate w-80">
                    {name?.length > 35 ? name.substr(0, 35) + '...' : name}
                </Link>
                <div className="flex flex-col mb-4">
                    <div className="w-full flex">
                        <svg
                            className="inline-block w-5 h-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 110-16 8 8 0 010 16zm-.5-1a7 7 0 100-14 7 7 0 000 14zm.5-7.41V5a.5.5 0 011 0v4c0 .28-.22.5-.5.5H5a.5.5 0 010-1h4.5z" clipRule="evenodd" />
                        </svg>
                        <span className="text-base text-gray-700">Cuisine type:</span>{" "}
                        <p className="first-letter:uppercase ml-1"> {cuisineType}</p>
                    </div>
                    <div className="w-full">
                        {
                            hours || minutes ?
                                <>
                                    <svg
                                        className="inline-block w-5 h-5 mr-2"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 110-16 8 8 0 010 16zm-.5-1a7 7 0 100-14 7 7 0 000 14zm.5-7.41V5a.5.5 0 011 0v4c0 .28-.22.5-.5.5H5a.5.5 0 010-1h4.5z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-base text-gray-700">Prep time:</span>{" "}
                                </>
                                : <div className="w-full flex h-6">
                                </div>
                        }
                        {hours > 0 ? (
                            <span className="text-base text-gray-700">
                                {hours} {hours > 1 ? "hours" : "hour"}{" "}
                            </span>
                        ) : null}
                        {minutes > 0 ? (
                            <span className="text-base text-gray-700">
                                {minutes} {minutes > 1 ? "minutes" : "minute"}
                            </span>
                        ) : null}
                    </div>
                </div>
                <div className="flex mb-4 items-center justify-center">
                    <ReactStars
                        count={5}
                        size={42}
                        value={rating}
                        ishalf={true}
                        edit={false}
                        activeColor="#ffd700"
                    />
                    <span className="text-base text-gray-700 ml-2">({numberOfRatings} ratings)</span>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;

