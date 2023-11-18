import React from "react";
import { Card, CardFooter, Image } from "@nextui-org/react";
import "./Cards.css";

export default function Cards({ urlImage, text }) {
  return (
    <Card isFooterBlurred radius="lg" className="border-none hover:scale-105 transition-transform duration-300 ease-in-out">
      <Image
        alt="img medic"
        className="object-cover"
        height={600}
        src={urlImage}
        width={600}
      />
      <CardFooter className="before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute rounded-large right-1 bottom-0 w-[calc(100%_-_8px)] shadow-small ml-1 z-10" >
        <p className="text-xl text-white/80">{text}</p>
      </CardFooter>
    </Card>
  );
}

