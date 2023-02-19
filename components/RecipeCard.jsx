import Image from "next/image";
import React from "react";

const RecipeCard = ({ imageSrc, name, prepTime, cookTime, rating }) => {
    const fullStar = (
        <svg aria-hidden="true" class="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    );

    const emptyStar = (
        <svg aria-hidden="true" class="w-8 h-8 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    );

    const roundedRating = Math.round(rating * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= roundedRating) {
            stars.push(fullStar);
        } else {
            stars.push(emptyStar);
        }
    }

    return (
        <div className="md:max-w-md rounded overflow-hidden shadow-lg mx-auto md:w-96">
            <Image width={512} height={512} alt="popular recipe image" className="w-full p-2" src={imageSrc} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <div className="flex flex-col mb-4">
                    <div className="w-full">
                        <svg
                            className="w-5 h-5 inline-block mr-2"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 110-16 8 8 0 010 16zm-.5-1a7 7 0 100-14 7 7 0 000 14zm.5-7.41V5a.5.5 0 011 0v4c0 .28-.22.5-.5.5H5a.5.5 0 010-1h4.5z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-base">Prep time:</span>{" "}
                        {prepTime}
                    </div>
                    <div className="w-full">
                        <svg
                            className="w-5 h-5 inline-block mr-2"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 110-16 8 8 0 010 16zm-.5-1a7 7 0 100-14 7 7 0 000 14zm.5-7.41V5a.5.5 0 011 0v4c0 .28-.22.5-.5.5H5a.5.5 0 010-1h4.5z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 text-base">Cook time:</span>{" "}
                        {cookTime}
                    </div>
                </div>
                <div className="flex mb-4">{stars}</div>
            </div>
        </div>
    );
};

export default RecipeCard;

