import React, { useState } from 'react'
import { useRouter } from 'next/router'

function Filters() {

    const router = useRouter()
    const [intolerances, setIntolerances] = useState(['Celery', 'Crustaceans', 'Dairy', 'Egg', 'Fish', 'Gluten', 'Lupine', 'Mustard', 'Peanut', 'Sesame', 'Shellfish', 'Soy', 'Tree Nut', 'Wheat'])

    const handleIntollerance = (intolerance) => {
        console.log(router.query)
        //loop through the intolerances array and check if the intolerance is already in the query
        //if it is, remove it from the query
        //if it isn't, add it to the query
        router.query.health.map((health) => {
            if (health === intolerance) {
                const index = router.query.health.indexOf(intolerance)
                router.query.health.splice(index, 1)
                // router.push({
                //     pathname: '/search',
                //     query: { health: router.query.health.join(',') },
                //     shallow: true
                // })
            }
        })
        let health = router.query.health
        let query = router.query.search
        health.push(intolerance)
        router.push({
            pathname: '/search',
            query: {
                search: query,
                health: health.join(',')
            },
            shallow: true
        })

        // if (router.query.health) {
        //     const intolerances = router.query.health.split(',')
        //     if (intolerances.includes(intolerance)) {
        //         const index = intolerances.indexOf(intolerance)
        //         intolerances.splice(index, 1)
        //         router.push({
        //             pathname: '/search',
        //             query: { health: intolerances.join(',') },
        //             shallow: true
        //         })
        //     } else {
        //         router.push({
        //             pathname: '/search',
        //             query: { health: intolerances.join(',') + ',' + intolerance },
        //             shallow: true
        //         })
        //     }
        // } else {
        //     router.push({
        //         pathname: '/search',
        //         query: { intolerances: intolerance },
        //         shallow: true
        //     })
        // }
    }
    return (
        <div className="flex flex-col items-center justify-center w-3/12 h-full ml-16">
            <div className="flex flex-col items-center justify-center h-full space-y-10">
                <div className="flex flex-col items-start justify-center w-full space-y-5 h-1/4">
                    <p className="self-center text-2xl text-font-color-light">Filters</p>
                    <div className="flex flex-col items-start justify-center w-full space-y-5 h-1/2">
                        <p className="text-xl text-font-color-light">Calories</p>
                        <div className="flex flex-col items-start justify-start w-full">
                            Min<input type="number" className="w-1/2 h-10 pl-5 pr-1 text-xl bg-transparent border-2 rounded-md focus:outline-none text-font-color-light border-accent-primary" />
                            Max <input type="number" className="w-1/2 h-10 pl-5 pr-1 text-xl bg-transparent border-2 rounded-md focus:outline-none text-font-color-light border-accent-primary" />
                        </div>
                    </div>
                    <p className="text-xl underline text-font-color-light">Intolerances / Alergies</p>
                    <div className="flex flex-col items-center justify-center w-full space-y-5 h-1/2">
                        <div className="flex flex-col items-start justify-center w-full space-y-5 h-1/2">
                            {intolerances.map((intolerance, index) => {
                                return (
                                    <div className="flex items-center justify-start w-full space-x-5" key={index}>
                                        <input type="checkbox" className="w-5 h-5 accent-primary"
                                            onClick={() => {
                                                handleIntollerance(intolerance)
                                            }}
                                        />
                                        <p className="text-xl text-font-color-light">{intolerance}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters