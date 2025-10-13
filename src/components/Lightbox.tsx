"use client";
import Image from "next/image";
import { useState } from "react";

export default function Lightbox({ images }:{images:string[]}) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src,i)=>(
          <button key={src} className="group relative" onClick={()=>{setIdx(i);setOpen(true);}}>
            <Image src={src} alt={`Gallery ${i+1}`} width={1200} height={900}
              className="h-48 w-full object-cover rounded-md" />
            <span className="absolute inset-0 rounded-md bg-black/0 group-hover:bg-black/15 transition" />
          </button>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur flex items-center justify-center p-4"
             onClick={()=>setOpen(false)}>
          <button className="absolute top-4 right-4 text-white text-xl" aria-label="Close">✕</button>
          <div className="max-w-5xl w-full" onClick={(e)=>e.stopPropagation()}>
            <Image src={images[idx]} alt={`Image ${idx+1}`} width={2000} height={1500}
              className="w-full h-auto rounded-lg" priority />
            <div className="mt-3 flex justify-between text-white/90 text-sm">
              <button onClick={()=>setIdx((idx-1+images.length)%images.length)}>← Prev</button>
              <span>{idx+1} / {images.length}</span>
              <button onClick={()=>setIdx((idx+1)%images.length)}>Next →</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
