"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Lightbox from "./Lightbox";
import type { GalleryImage } from "@/lib/gallery";

const BLUR="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [open,setOpen]=useState(false);
  const [idx,setIdx]=useState(0);
  const openAt=(i:number)=>{setIdx(i);setOpen(true);};
  const next=()=>setIdx(i=>(i+1)%images.length);
  const prev=()=>setIdx(i=>(i-1+images.length)%images.length);
  const grid=useMemo(()=>images.map((img,i)=>(
    <motion.button key={img.src} className="group relative w-full overflow-hidden rounded-3xl bg-neutral-100"
      onClick={()=>openAt(i)}
      initial={{opacity:0,y:12}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:0.2}}
      transition={{duration:0.35,ease:"easeOut"}}>
      <div className="relative aspect-[4/3]">
        <Image src={img.src} alt={img.alt} fill placeholder="blur" blurDataURL={BLUR}
          sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" /
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    loading={i < 4 ? 'eager' : 'lazy'}
    priority={i < 2}
  >
      </div>
    </motion.button>
  )),[images]);
  return(<>
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3">{grid}</div>
    <Lightbox open={open} src={images[idx]?.src??""} alt={images[idx]?.alt??""} onClose={()=>setOpen(false)} onNext={next} onPrev={prev}/>
  </>);
}
