import { useState } from "react";
import { useGetMovieBySearchQuery } from "../services/movieApi";
import { useDebounce } from "../hooks/debounce";
import { Reveal } from "../utils/Reveal";
import { Reveal2 } from "../utils/Reveal2";
import { motion } from "framer-motion";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const { data, isError, isLoading } = useGetMovieBySearchQuery(debounced, {
    skip: debounced.length < 3,
  });

  if (isLoading) {
    return <p className="text-white text-2xl">Loading...</p>;
  }

  return (
    <motion.main
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="w-[90vw] max-w-[37.5em] py-12 px-8 bg-[#1e293b] rounded-xl"
    >
      <form onSubmit={(e) => e.preventDefault()} className="flex gap-5">
        <input
          className="bg-transparent border border-solid border-[#a0a0a0] text-white w-9/12 p-3 focus:border-white"
          type="text"
          placeholder="Wednesday"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-[#ffb92a] w-1/3 cursor-pointer">Search</button>
      </form>

      {data && (
        <>
          <Reveal>
            <article className="text-white grid grid-cols-2 mt-4">
              <Reveal>
                <img className="w-full" src={data.Poster} />
              </Reveal>
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="ml-4"
              >
                <Reveal>
                  <h2 className="text-center text-xl font-semibold">
                    {data.Title}
                  </h2>
                </Reveal>
                <Reveal2>
                  <figure className="my-2">
                    <h4 className="text-center text-lg font-medium">
                      Rating: {data.imdbRating}
                    </h4>
                  </figure>
                </Reveal2>
                <Reveal2>
                  <figure className="flex text-sm gap-4 justify-center text-[#a0a0a0] font-light ">
                    <span>{data.Rated}</span>
                    <span>{data.Year}</span>
                    <span>{data.Runtime}</span>
                  </figure>
                </Reveal2>
                <Reveal2>
                  <figure className="flex mt-4 justify-around">
                    <div>{data.Genre.split("")}</div>
                  </figure>
                </Reveal2>
              </motion.section>
            </article>
          </Reveal>
          <Reveal2>
            <section className="grid w-full mt-2 text-white">
              <Reveal>
                <h3>Plot:</h3>
              </Reveal>
              <Reveal>
                <p className="text-[#a0a0a0]">{data.Plot}</p>
              </Reveal>
              <Reveal>
                <h3>Cast:</h3>
              </Reveal>
              <Reveal>
                <p className="text-[#a0a0a0]"> {data.Actors}</p>
              </Reveal>
            </section>
          </Reveal2>
        </>
      )}
    </motion.main>
  );
};

export default HomePage;
