import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import BillBoard from '@/components/BillBoard';
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import Infomodal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";


export async function getServerSideProps(context:NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    };
  }

  return {
    props: {}
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favoriteMovies = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
      <Infomodal visible = {isOpen} onClose={closeModal}/>
      <Navbar/>
      <BillBoard />
      <div className="pb-40">
        <MovieList title="Trending Now"  data={movies}/>
        <MovieList title="Trending Now"  data={favoriteMovies}/>
      </div>
    </>
  )
}
