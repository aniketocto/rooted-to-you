'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-md w-full space-y-6">
        <h1 className="text-6xl font-bold text-gray-800">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 text-lg">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex justify-center space-x-4">
          <Link href="/">
            <Button>
              Go Home
            </Button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}