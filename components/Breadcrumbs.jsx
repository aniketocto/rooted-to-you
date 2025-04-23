"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  const humanize = (str) => {
    return str
      .replace(/[-_]/g, " ") // replace both - and _ with space
      .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize first letter of each word
  };

  return (
    <nav className="flex text-sm text-white my-5" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li>
          <Link
            href="/"
            className="hover:text-[#e6af55] text-sm md:text-xl primary-font transition-colors duration-200"
          >
            Home
          </Link>
        </li>

        {pathnames.map((segment, index) => {
          const href = "/" + pathnames.slice(0, index + 1).join("/");

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2 text-gray-400">›</span>
              <Link
                href={href}
                className="hover:text-[#e6af55] text-sm md:text-xl primary-font transition-colors duration-200 capitalize"
              >
                {humanize(decodeURIComponent(segment))}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
