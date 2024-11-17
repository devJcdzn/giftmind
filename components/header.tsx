import { Gift } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={"/"} className="flex items-center gap-2">
            <div
              className="size-10 p-2 rounded-full bg-[#FF6B6B] flex 
            items-center justify-center"
            >
              <Gift className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#4A4E69]">giftmind</span>
          </Link>
        </div>
        <div className="flex gap-4"></div>
      </div>
    </header>
  );
};
