import axios from "axios";
import  React, {useCallback, useMemo} from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId}) => {

  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite =  useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    
    return list.includes(movieId);
  },[movieId,currentUser]);

  const toggleFavorite = useCallback(async ()=>{
    let response;

    if (isFavorite) {
      response = await axios.delete('@/pages/api/favorite',{data: {movieId}});
    }else {
      response = await axios.post('@/pages/api/favorite',{ movieId });
    }

    const updataFavoriteIds = response?.data?.favoritedIds;  

    mutate({
      ...currentUser,
      favoritedIds: updataFavoriteIds
    });

    mutateFavorites();
  },[movieId, isFavorite, mutate, mutateFavorites, currentUser]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div 
    onClick={toggleFavorite}
    className="
      cursor-pointed
      w-6
      h-6
      lg:w-10
      lg:h-10
      rounded-full
      border-white
      border-2
      flex
      justify-center
      items-center
      transition
      hover:border-netural-400
      text-white
    ">
      <Icon size={25}/>
    </div>
  )
}

export default FavoriteButton;