import React,{ useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai'


import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface useInfoModalProps {
  visible?:boolean,
  onClose: any
};


const Infomodal:React.FC<useInfoModalProps> = ({ visible, onClose }) => {
  const [ isVisible, setIsVisible ] = useState(!!visible);
  
  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible)
  },[visible]);

  const handlerClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  },[onClose])

  if (!visible) {
    return null
  }

  return (
    <div
    className="
      z-50
      transition
      duration
      bg-black
      bg-opacity-80
      flex
      justify-center
      items-center
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
    "
    >
    <div className="
        relative
        w-auto
        mx-auto
        max-w-3xl
        rounded-md
        overflow-hidden
      ">

        <div className={`
          ${visible ? 'scale-100' : 'scale-0'}
          transition
          duration-300
          relative
          flex-auto
          bg-zinc-900
          drop-shadow-md
        `}>

          <div className="relative h-96">
            <video
              className="
                w-full
                h-full
                object-cover
                brightness-[60%]
              " 
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}  
              src={data?.videoUrl}
              >
              </video>

              <div
                className="
                  cursor-pointed
                  absolute
                  top-3
                  right-3
                  h-10
                  w-10
                  rounded-md
                  bg-black
                  bg-opacity-70
                  flex
                  items-center
                  justify-center
                "
                onClick={handlerClose}
              >
                <AiOutlineClose className="text-white" size={20}></AiOutlineClose>
              </div>

              <div className="
                absolute
                bottom-[5%]
                left-5
              ">
                <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-6">
                    { data?.title }
                </p>

                <div className="flex flex-row gap-4 items-center">
                  <PlayButton  movieId={data?.id}/>
                  <FavoriteButton movieId={data?.id}></FavoriteButton>
                </div>
              </div>
          </div>

          <div className="px-12 py-8">
            <p className="text-green-400 font-semibold text-lg">
              New
            </p>
            <p className="text-white text-lg">
              {data?.duration}
            </p>
            <p className="text-white text-lg">
              {data?.genre}
            </p>
            <p className="text-white text-lg">
              {data?.decription}
            </p>
          </div>

        </div>

    </div>

    </div>
  )
}

export default Infomodal;
