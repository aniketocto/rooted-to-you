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
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";

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
  companyName: z
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

  pincode: z
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

const DetailForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      companyName: "",
      dob: null,
      address1: "",
      address2: "",
      department: "",
      designation: "",
      pincode: "",
      city: "",
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedUser = localStorage.getItem("authenticatedUser");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      const customerId = user?.id;
      const token = user?.token;

      if (!customerId || !token) return;

      setIsAuthorized(true);
      setIsLoading(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/${customerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await res.json();
        const userData = result?.data;

        if (res.ok && userData) {
          const hasUserInfo =
            userData.firstName ||
            userData.lastName ||
            userData.email ||
            userData.phoneNumber;

          if (hasUserInfo) {
            form.reset({
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              phoneNumber: userData.phoneNumber || "",
              email: userData.email || "",
              companyName: userData.companyName || "",
              dob: userData.dob ? new Date(userData.dob) : undefined,
              address1: userData.address1 || "",
              address2: userData.address2 || "",
              department: userData.department || "",
              designation: userData.designation || "",
              pincode: userData.pincode || "",
              city: userData.city || "",
            });
          }
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [form]);

  async function onSubmit(values) {
    const storedUser = localStorage.getItem("authenticatedUser");

    if (!storedUser) {
      console.error("No user is logged in.");
      return;
    }

    const userData = JSON.parse(storedUser);
    const customerId = userData?.id;
    const token = userData?.token;

    if (!customerId || !token) {
      console.error("User ID or token missing");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Check if the pincode is available
      const checkResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/pincodes/check-availability?pincode=${values.pincode}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const checkData = await checkResponse.json();

      if (!checkResponse.ok || !checkData.success) {
        setErrorMessage("Sorry, we do not deliver to this pincode.");
        setIsSubmitting(false);
        return;
      }

      // 2. Update user profile
      const updateRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (!updateRes.ok) {
        const error = await updateRes.json();
        throw new Error(error.message || "Failed to update profile");
      }

      // 3. Fetch updated user profile
      const fetchUpdatedRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/customers/${customerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = await fetchUpdatedRes.json();
      console.log("fetchUser", updatedUser);

      if (fetchUpdatedRes.ok && updatedUser?.data) {
        // Flatten and store
        const newStoredUser = {
          ...userData,
          ...updatedUser.data,
        };

        localStorage.setItem(
          "authenticatedUser",
          JSON.stringify(newStoredUser)
        );
        
        router.push("/payment");
      } else {
        throw new Error("Failed to fetch updated user info");
      }
    } catch (error) {
      console.error("Profile Update Error:", error.message);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) return <LoadingSpinner />;

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
                        className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
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
                        className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
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
                        className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
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
                        className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
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
                          selected={field.value || undefined}
                          onSelect={field.onChange}
                          fromYear={1900}
                          toYear={2018}
                          initialFocus
                          disabled={(date) =>
                            date > new Date("2018-12-31") ||
                            date < new Date("1900-01-01")
                          }
                          classNames={{
                            root: "w-full max-w-md mx-auto border h-12 border-gray-200 rounded-lg shadow-sm bg-[#197a8a]",
                            caption:
                              "flex justify-center items-center gap-2 p-2",
                            caption_label: "hidden", // ❌ Hide label
                            caption_dropdowns:
                              "flex gap-2 bg-[#197a8a] p-2 rounded-md text-white", // ✅ Styled bg
                            dropdown:
                              "bg-[#197a8a] text-white border-none px-2 py-1 rounded-md appearance-none scrollbar-hide",
                            dropdown_icon: "text-white",
                            table: "w-full border-collapse mt-2",
                            head_row: "text-gray-500 text-sm",
                            row: "text-center",
                            cell: "w-10 h-10 text-sm hover:bg-[#197a8a] hover:text-white rounded-md transition",
                            day_selected: "bg-white text-[#197a8a]",
                            day_today: "",
                            day_disabled: "text-gray-300 cursor-not-allowed",
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
                name="companyName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Company"
                        {...field}
                        className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
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
                        className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
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
                        className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
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
                    className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
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
                    className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
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
                        className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
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
                name="pincode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Postal Code"
                        {...field}
                        className="w-full border h-12 border-gray-400 rounded-md bg-transparent px-3 py-2"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500!" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : isAuthorized ? (
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
          ) : (
            <div className="text-center text-red-600 font-semibold">
              <Link
                href="/register"
                className="inline-block mt-4 bg-[#e6af55] text-[#03141C] px-6 py-2 rounded hover:bg-[#d49f4c]"
              >
                You need to Login in
              </Link>
            </div>
          )}
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </Form>
    </div>
  );
};

export default DetailForm;
