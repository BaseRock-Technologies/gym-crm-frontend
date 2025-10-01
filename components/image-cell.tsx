import { User2 } from "lucide-react";
 import Image from "next/image";
  interface ImageCellProps { 
    clientPicture: string; 
  } 
  
  export function ImageCell({ clientPicture }: ImageCellProps) { 
    return ( 
       <div className="relative sm:w-14 w-10 sm:h-14 h-10 rounded-md bg-helper-secondary"> 
         {/* {clientPicture ? ( 
          <Image src={clientPicture} alt={"image"} fill className="object-cover rounded-sm relative flex justify-center items-center place-items-center" /> 
         ) : (  */}
          <User2 className="w-full h-full p-2 text-white" /> 
        {/*  )} */}
      </div> 
    ); 
  }