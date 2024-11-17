"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPageFromDatabase } from "./actions";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Gift, Heart } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NeonHeartLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <div className="flex flex-col space-y-2 items-center">
        <div className={`relative text-white animate-pulse`}>
          <Gift className="w-16 h-16 transform rotate-[-18deg]" />
        </div>
        <span className="text-center text-sm text-black/60">
          Desembrulhando seu presente...
        </span>
      </div>
    </div>
  );
};

export default function Page() {
  const { pageName } = useParams<{ pageName: string }>();
  const [data, setData] = useState<any>();

  const previewIcon =
    data?.icon === "heart"
      ? "/3d-heart.png"
      : data?.icon === "sun"
      ? "/3d-sun.png"
      : "/3d-thumb-up.png";

  useEffect(() => {
    getPageFromDatabase(pageName).then((response) => {
      setData(response);
    });
  }, []);

  if (!data) {
    return (
      <div
        className={cn("min-h-screen bg-primary", {
          "bg-primary hover:bg-primary": data?.color === "primary",
          "bg-blue-400 hover:bg-blue-400": data?.color === "blue",
          "bg-violet-500 hover:bg-violet-500": data?.color === "violet",
        })}
      >
        <NeonHeartLoading />
      </div>
    );
  }

  return (
    <div
      className={cn("min-h-screen bg-primary", {
        "bg-primary hover:bg-primary": data?.color === "primary",
        "bg-blue-400 hover:bg-blue-400": data?.color === "blue",
        "bg-violet-500 hover:bg-violet-500": data?.color === "violet",
      })}
    >
      <header className="container mx-auto p-4 flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Link href={"/"} className="flex items-center gap-1">
            <Gift className="size-6 text-white transform rotate-[-18deg]" />
          </Link>
        </div>
      </header>
      <div className="flex flex-col gap-4 text-center mt-8">
        <div className="bg-white w-[80%] mx-auto rounded-md">
          {data && <span className="text-xs">{data.message}</span>}
        </div>
      </div>
      <Swiper
        loop={false}
        spaceBetween={0}
        slidesPerView={1}
        grabCursor={true}
        speed={500}
        className="w-full h-screen"
      >
        <div
          key={data?.id}
          className="w-full h-full max-w-screen-sm flex flex-col items-center gap-4 pt-12 px-6"
        >
          {data && data.images.length > 0 ? (
            data.images.map((image: any) => (
              <SwiperSlide key={image.index} className="relative h-full">
                <div className="absolute top-6 left-6 transform transition-transform hover:scale-110 rotate-[-18deg]">
                  <Image
                    src={previewIcon}
                    alt={data?.icon || "icon"}
                    width={80}
                    height={80}
                    className="size-20 rounded-full bg-white p-3 shadow-sm"
                  />
                </div>
                <div className="absolute top-[30%] right-5 transform transition-transform hover:scale-110 rotate-[10deg]">
                  <Image
                    src={previewIcon}
                    alt={data?.icon || "icon"}
                    width={80}
                    height={80}
                    className="size-16 rounded-full bg-white p-3 shadow-sm"
                  />
                </div>
                <div className="absolute bottom-36 left-6 transform transition-transform hover:scale-110 rotate-[-12deg]">
                  <Image
                    src={previewIcon}
                    alt={data?.icon || "icon"}
                    width={80}
                    height={80}
                    className="size-12 rounded-full bg-white p-3 shadow-sm"
                  />
                </div>
                <div className="w-[80%] h-[75%] mx-auto overflow-hidden rounded-md flex-shrink-0 py-10 px-4">
                  <div className="w-full h-full rounded-md">
                    <img
                      src={image.url}
                      alt={image.description}
                      className="w-full h-full object-cover rounded-md border 
                      border-white/40 shadow-xl shadow-white/20"
                    />
                  </div>
                </div>
                <footer className="h-[25%] w-full flex flex-col justify-between">
                  <div
                    className="bg-white flex items-center justify-center w-[80%] 
                  mx-auto p-2 mt-4 rounded-md"
                  >
                    {/* <span className="text-xs">Memória do dia:</span> */}
                    <span className="text-xs">Nossa Querida Memória</span>
                  </div>
                  <div
                    className="w-full h-full mt-6 
                      break-words flex flex-col items-center 
                    text-white/60 py-4 px-6"
                  >
                    <span className="text-sm text-white text-center mb-2">
                      Lembrança:
                    </span>
                    <span className="text-center text-sm">
                      {image.description}
                    </span>
                  </div>
                </footer>
              </SwiperSlide>
            ))
          ) : (
            <div>Carregando...</div>
          )}
        </div>
      </Swiper>
    </div>
  );
}
