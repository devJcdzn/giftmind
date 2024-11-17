"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

interface ImageData {
  url: string;
  description: string;
}

interface Props {
  images: ImageData[];
  message?: string;
  disabled: boolean;
  name: string;
  color?: string;
  icon?: string;
}

const URLDisplay = ({ name }: { name: string }) => (
  <div className="bg-white mt-10 text-text w-[80%] mx-auto rounded-md truncate">
    <span>
      giftmind.com/{name ? name.split(" ").join("-").toLowerCase() : ""}
    </span>
  </div>
);

const UploadPlaceholder = () => (
  <div className="w-[80%] h-[75%] mx-auto overflow-hidden rounded-md flex-shrink-0">
    <label
      htmlFor="fileInput"
      className="w-full h-full flex items-center cursor-pointer justify-center border border-white/80 bg-primary rounded-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#fff"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        ></path>
      </svg>
    </label>
  </div>
);

const MessageDisplay = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col gap-4 text-center">
      <div className="bg-white w-[80%] mx-auto rounded-md">
        <span className="text-xs">
          {message ? message : "Sua mensagem ficará aqui"}
        </span>
      </div>
    </div>
  );
};

export const Preview = ({
  images,
  message,
  name,
  disabled,
  color,
  icon,
}: Props) => {
  const previewIcon =
    icon === "heart"
      ? "/3d-heart.png"
      : icon === "sun"
      ? "/3d-sun.png"
      : "/3d-thumb-up.png";

  return (
    <div
      className={cn(
        "relative w-[90vw] lg:w-[330px] h-[160vw] lg:h-[570px] bg-primary rounded-lg shadow-xl",
        {
          "bg-primary hover:bg-primary": color === "primary",
          "bg-blue-400 hover:bg-blue-400": color === "blue",
          "bg-violet-500 hover:bg-violet-500": color === "violet",
        }
      )}
    >
      <div className="absolute top-4 left-4 flex gap-2">
        <div className="size-3 bg-red-500 rounded-full" />
        <div className="size-3 bg-yellow-500 rounded-full" />
        <div className="size-3 bg-green-500 rounded-full" />
      </div>
      <div className="flex flex-col text-center gap-4 h-full overflow-y-auto">
        <URLDisplay name={name} />

        <MessageDisplay message={message} />

        <Swiper
          loop={false}
          spaceBetween={0}
          slidesPerView={1}
          grabCursor={!disabled}
          speed={500}
          className="w-full h-full"
        >
          <div className="w-full h-full flex flex-col items-center">
            {images.length > 0 ? (
              images.map((image, index) => (
                <SwiperSlide key={index} className="relative">
                  <div className="absolute top-6 left-6 transform transition-transform hover:scale-110 rotate-[-18deg]">
                    <Image
                      src={previewIcon}
                      alt={icon || "icon"}
                      width={80}
                      height={80}
                      className="size-16 rounded-full bg-white p-3 shadow-sm"
                    />
                  </div>
                  <div className="absolute top-[30%] right-5 transform transition-transform hover:scale-110 rotate-[10deg]">
                    <Image
                      src={previewIcon}
                      alt={icon || "icon"}
                      width={80}
                      height={80}
                      className="size-12 rounded-full bg-white p-3 shadow-sm"
                    />
                  </div>
                  <div className="absolute bottom-36 left-6 transform transition-transform hover:scale-110 rotate-[-12deg]">
                    <Image
                      src={previewIcon}
                      alt={icon || "icon"}
                      width={80}
                      height={80}
                      className="size-10 rounded-full bg-white p-3 shadow-sm"
                    />
                  </div>
                  <div className="w-[80%] h-[70%] mx-auto overflow-hidden rounded-md flex-shrink-0">
                    <div className="w-full h-full rounded-md">
                      <img
                        src={image.url}
                        alt={`Preview-${index}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </div>
                  <div className="bg-white flex items-center justify-center w-[80%] mx-auto p-2 mt-4 rounded-md">
                    <span className="text-xs">Memória do dia:</span>
                  </div>
                  <div className="border border-primary w-full opacity-40 mt-5" />
                  <div className="w-[80%] text-sm mx-auto break-words mb-10 mt-4">
                    <span>{image.description}</span>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide className="relative">
                <UploadPlaceholder />
              </SwiperSlide>
            )}
          </div>
        </Swiper>
      </div>
    </div>
  );
};
