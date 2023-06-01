import React from "react";
import { useRouter } from "next/router";
import { BsPlayFill } from 'react-icons/bs';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({movieId}) => {
  const router = useRouter();
  
  return (
    <button
    onClick={() => {router.push(`watch/${movieId}`)}}
     className="
      bg-white
      rounded-md
      py-1 md:py-2
      px-2 md:px-4
      w-auto
      h-10
      text-xs
      lg:text-lg
      font-semibold
      flex
      flex-row
      items-center
      hover:bg-neutral-300
      transition
     "
    >
      <BsPlayFill size={20}/>
      Play 
    </button>
  )
}

export default PlayButton;