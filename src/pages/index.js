import Navbar from "components/Navbar"
import Heading from "components/hero/Heading"
import HeroImage from "components/hero/HeroImage"
import SearchBar from "components/hero/SearchBar"
import Stats from "components/Stats"
import PopularRecipes from "components/PopularRecipes"
import WhatDoTheySay from "components/WhatDoTheySay"
import Footer from "components/Footer"

export default function Home() {
  return (
    <>
      <div className="md:h-[100vh] 3xl:h-full">
        <div className="flex flex-col items-center lg:flex-row lg:mx-12 lg:ml-24 md:mt-24">
          <div className="z-10">
            <Heading />
            <SearchBar />
          </div>
          <div className="absolute right-0 hidden xl:block top-20">
            <HeroImage />
          </div>
        </div>
      </div>
      <Stats />
      <PopularRecipes />
      <WhatDoTheySay />
    </>
  )
}

export function getStaticProps() {
  return {
    props: {
      title: "Home",
    },
  }
}

