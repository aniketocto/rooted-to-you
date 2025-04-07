"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 space-y-5">
      {/* <img src="/images/not-found.png" className="w-1/2 h-1/2 absolute" alt="" />  */}
      <h1 className="md:text-[353px]! secondary-font text-9xl! font-bold text-white!">
        404
      </h1>

      <p className="text-xl capitalize primary-font">
        It seems you follow backlink
      </p>

      <div className="flex justify-center space-x-4">
        <div className="w-full flex justify-center">
          <Link href='/'> 
            <Button className="primary-font uppercase text-lg mb-28 bg-[#e6af55] px-10 py-5 flex items-center justify-center text-center cursor-pointer font-semibold">
              <p className="text-[#03141c]! text-2xl mt-1.5">Back to Home</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
