"use client";
import defaultSeoConfig from "@/next-seo.config";
import { DefaultSeo } from "next-seo";

 

export default function SeoProvider() {
  return <DefaultSeo {...defaultSeoConfig} />;
}
