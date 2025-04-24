"use client";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

const FeedbackForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = (data) => {
    console.log("Submitted:", data);
    form.reset(); // Reset the form after submission
    // handle submission
  };

  return (
    <section className="w-[full] relative h-fit flex md:flex-col flex-row justify-start items-start gap-5 my-10">
      
      <div className="w-[90%] h-fit flex flex-wrap items-center gap-20 justify-center ">
        <div className="w-full flex flexCol gap-10">
          <div className="flex-1 flex w-full justify-center items-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 w-full max-w-5xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="First Name"
                            {...field}
                            className="h-14 border border-gray-400 bg-transparent px-3 py-2 rounded-md"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Last Name"
                            {...field}
                            className="h-14 border border-gray-400 bg-transparent px-3 py-2 rounded-md"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email"
                          {...field}
                          className="h-14 border border-gray-400 bg-transparent px-3 py-2 rounded-md"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Feed back or message"
                          className="resize-none h-32 border border-gray-400 bg-transparent px-3 py-2 rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-[#e6af55] hover:bg-[#d49c3e] text-[#03141C] font-semibold px-6 py-3 rounded-md flex gap-2 items-center"
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
      </div>
    </section>
  );
};

export default FeedbackForm;
