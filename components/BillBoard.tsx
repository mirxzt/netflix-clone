import useBillBoard from '@/hooks/useBillBoard';
import React, { useCallback } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai'
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';


const BillBoard = () => {
  const { data } = useBillBoard();  
  const { openModal } = useInfoModal();

  const handlerOpenModal = useCallback(() => {
    openModal(data?.id)
  },[openModal,data?.id])

  return (
    <div className='relative h-[56.25vm]' >
      <video className='
        w-full
        h-[56.25vm]
        object-cover
        brightness-[60%]
      '
        poster={data?.thumbnailUrl} 
        src={data?.videoUrl} 
        autoPlay  
        muted
      >
      </video>

      <div className='absolute top-[30%] md:top-[40%] ml-4 md:ml-16'>
        <p className='
          text-white
          text-1xl
          md:text-5xl
          h-full
          w-[50%]
          lg:text-6xl
          font-bold
          drop-shadow-xl
        '
        >
          { data?.title }
        </p>
        <p className='
          text-white
          text-[8px]
          md:text-lg
          mt-3
          md:mt-8
          w-[90%]
          md:w-[80%]
          lg:w-[70%]
          drop-shadow-xl
          '
        >
          { data?.decription }
        </p>

        <div className='flex flex-row items-center mt-3 lg:mt-6 gap-3'>
          <PlayButton movieId = {data?.id}/>
          <button 
          onClick={handlerOpenModal}
          className='
            text-white
            bg-white
            bg-opacity-30
            rounded-md  
            py-1
            md:py-2
            px-2
            md:px-4
            font-semibold
            flex
            flex-row
            items-center
            gap-1
            hover:bg-opacity-20
            transition
          '>
            <AiOutlineInfoCircle></AiOutlineInfoCircle>
            More Info
          </button>
        </div>
      </div>
    </div>
  )
}

export default BillBoard;