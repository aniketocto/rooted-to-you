"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First Name must be at least 2 characters." })
    .max(50, { message: "First Name cannot exceed 50 characters." }),

  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last Name must be at least 2 characters." })
    .max(50, { message: "Last Name cannot exceed 50 characters." }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  phoneNumber: z.string().refine((value) => /^[6-9]\d{9}$/.test(value), {
    message: "Please enter a valid 10-digit phone number.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  company: z
    .string()
    .trim()
    .min(2, { message: "Company Name must be at least 2 characters." }),
  address1: z
    .string()
    .trim()
    .min(5, { message: "Address 1 must be at least 5 characters." })
    .max(100, { message: "Address 1 cannot exceed 100 characters." }),

  address2: z
    .string()
    .trim()
    .max(100, { message: "Address 2 cannot exceed 100 characters." })
    .or(z.literal("")), // Allow empty values

  city: z
    .string()
    .trim()
    .min(3, { message: "City must be at least 3 characters." })
    .max(50, { message: "City cannot exceed 50 characters." }),

  zipCode: z
    .string()
    .trim()
    .refine((value) => /^\d{6}$/.test(value), {
      message: "Zip Code must be a valid 6-digit number.",
    }),

  department: z
    .string()
    .trim()
    .min(3, { message: "Department must be at least 3 characters." }),

  designation: z
    .string()
    .trim()
    .min(3, { message: "Designation must be at least 3 characters." }),
});

const LOCAL_STORAGE_KEY = "rootedUserDetails";

const DetailForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      company: "",
      dob: new Date(),
      address1: "",
      address2: "",
      department: "",
      designation: "",
      zipCode: "",
      city: "",
    },
  });

  useEffect(() => {
    async function loadUserData() {
      try {
        setIsLoading(true);

        // **Step 1: Load data from localStorage**
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
          const userData = JSON.parse(storedData);
          form.reset({
            ...userData,
            dob: new Date(userData.dob), // Convert DOB string to Date object
            address1: userData.address?.split(",")[0] || "",
            address2: userData.address?.split(",")[1] || "",
          });
        }

        // **Step 2: (Future) Fetch from backend if available**
        // Uncomment this when backend is ready
        /*
        const response = await fetch("/api/user"); // Example API call
        const userData = await response.json();
        if (userData) {
          form.reset({
            ...userData,
            dob: new Date(userData.dob),
            address1: userData.address?.split(",")[0] || "",
            address2: userData.address?.split(",")[1] || "",
          });
        }
        */
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserData();
  }, [form]);

  function onSubmit(values) {
    const combinedAddress = `${values.address1}, ${values.address2}`.trim();
    const updatedValues = {
      ...values,
      address: combinedAddress,
    };
    delete updatedValues.address1;
    delete updatedValues.address2;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedValues));
    console.log("Profile Data:", updatedValues);

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/payment");
    }, 1000); // Simulate form submission delay
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full h-full p-6">
      <h2 className="text-2xl font-bold primary-font">Personal Details</h2>
      <Separator className="w-full h-[2px] bg-[#D2D2D2]" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 mt-10"
        >
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="flex-1">
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
                        className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
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
                        className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row  gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Mobile Number"
                        {...field}
                        className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                        maxLength={10}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
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
                        className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row  gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full bg-transparent pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Date of Birth</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[300px] p-0 bg-[#197a8a]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          classNames={{
                            caption: "flex justify-center items-center gap-2",
                            caption_label: "hidden", // 🔹 This hides the extra label
                            caption_dropdowns:
                              "flex justify-center gap-2 bg-[#197a8a] p-2 rounded-md",
                            dropdown:
                              "bg-[#197a8a] text-white border-none px-2 py-1 rounded-md",
                            dropdown_icon: "text-white",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Company"
                        {...field}
                        className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row  gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Department"
                        {...field}
                        className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Designation"
                        {...field}
                        className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <FormField
            control={form.control}
            name="address1"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Address 1"
                    {...field}
                    className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500!" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address2"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Address 2"
                    {...field}
                    className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500!" />
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col md:flex-row  gap-4">
            <div className="flex-1">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="City"
                        {...field}
                        className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                        maxLength={10}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Postal Code"
                        {...field}
                        className="w-full border border-gray-400 rounded-md bg-transparent px-3 py-2"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="bg-[#e6af55] w-full hover:bg-[#d49c3e] text-[#03141C] text-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Next"}
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
  );
};

export default DetailForm;
