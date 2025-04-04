"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().refine((value) => /^[6-9]\d{9}$/.test(value), {
    message: "Please enter a valid 10-digit phone number.",
  }),
  message: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phoneNumber: "",
    },
  });
  function onSubmit(values) {
    setIsSubmitting(true);
    console.log(values);

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  }

  return (
    <section className="w-full h-fit flex justify-center items-center my-20">
      <Image
        src="/images/nav-bg.jpg"
        alt="bg"
        width={1440}
        height={270}
        quality={100}
        className="absolute top-0 z-[-1]"
      />
      <div className="max-w-[1340px] w-full h-full flex flex-col items-baseline justify-center md:mx-10 mx-5 mt-26">
        <div className="flex w-full justify-center items-center">
          <div className="w-[80%]">
            <p className="primary-font text-2xl! mb-5">Get Started</p>
            <h1 className="text-[#d49c3e]! text-7xl! secondary-font font-extrabold">Get in touch with us. We're here to assist you.</h1>
          </div>
          <div className="w-[20%] flex flex-col gap-5 items-end justify-center">
            <a href="" className="border border-white rounded-full w-fit p-3">
              <Image
                src="/images/instagram.png"
                alt="Instagram"
                width={30}
                height={100}
              />
            </a>
            <a href="" className="border border-white rounded-full w-fit p-3">
              <Image
                src="/images/linkedin.png"
                alt="Linkedin"
                width={30}
                height={100}
              />
            </a>

            <a href="" className="border border-white rounded-full w-fit p-3">
              <Image
                src="/images/facebook.png"
                alt="Facebook"
                width={30}
                height={100}
              />
            </a>
          </div>
        </div>

        <div className="flex w-full justify-center items-center mt-14">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="flex flex-col lg:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Name"
                          {...field}
                          className="w-full h-14 border border-gray-400 rounded-md bg-transparent px-3 py-2"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500!" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          {...field}
                          className="w-full h-14 border border-gray-400 rounded-md bg-transparent px-3 py-2"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500!" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone Number"
                          {...field}
                          className="w-full h-14 border border-gray-400 rounded-md bg-transparent px-3 py-2"
                          maxLength={10}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500!" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Message"
                        className="resize-none h-32 border border-gray-400 rounded-md bg-transparent px-3 py-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#e6af55]  w-fit hover:bg-[#d49c3e] text-[#03141C] text-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "LEAVE US A MESSAGE"}
                {!isSubmitting && (
                  <Image
                    src="/images/right-arrow.png"
                    alt="right-arrow"
                    width={20}
                    height={15}
                  />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
