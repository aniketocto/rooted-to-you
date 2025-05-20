"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PauseSubscriptionModal from "./PauseSubscriptionModal";

const OrderHistory = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Starts at 0 based on API
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [subsId, setSubsId] = useState([]);
  const [customerId, setCustomerId] = useState();
  const [token, setToken] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const storedUser = JSON.parse(
          localStorage.getItem("authenticatedUser")
        );
        // console.log("Stored user:", storedUser);
        setCustomerId(storedUser?.id);
        const token = storedUser?.token;
        setToken(token);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/subscriptions/list/${storedUser?.id}?page=${currentPage}&limit=5`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${storedUser?.token}`,
            },
          }
        );

        const data = await res.json();
        // console.log("Fetched subscriptions:", data);
        const ids = data?.subscriptions?.map((sub) => sub.id);
        setSubsId(ids); // e.g. [1, 4, 7]

        if (data.success) {
          setSubscriptions(data.subscriptions || []);
          setActiveSubscription(data.subscription);
          setTotalPages(data.totalPages || 1);
          setCount(data.count || 0);
        }
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (!subscriptions.length) {
    return (
      <p className="text-center mt-4 text-muted-foreground">
        No subscriptions found.
      </p>
    );
  }

  //   const subscriptions = [
  //   {
  //     id: 1,
  //     amount: 1299,
  //     box: "Standard Box",
  //     boxId: 101,
  //     deliveryType: "Morning",
  //     subscriptionType: "Weekly",
  //     weekendType: "Even Saturdays",
  //     dietType: "Vegan",
  //     startDate: "2025-05-20",
  //     endDate: "2025-05-26",
  //   },
  //   {
  //     id: 2,
  //     amount: 2499,
  //     box: "Premium Box",
  //     boxId: 102,
  //     deliveryType: "Evening",
  //     subscriptionType: "Monthly",
  //     weekendType: null,
  //     dietType: null,
  //     startDate: "2025-06-01",
  //     endDate: "2025-06-30",
  //   },
  // ];

  return (
    <div className="overflow-hidden rounded-md shadow-sm mt-8">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="primary-font font-base-1 capitalize">
              ID
            </TableHead>
            <TableHead className="primary-font font-base-1 capitalize">
              Amount
            </TableHead>
            <TableHead className="primary-font font-base-1 capitalize">
              Box
            </TableHead>
            <TableHead className="primary-font font-base-1 capitalize">
              Time
            </TableHead>
            <TableHead className="primary-font font-base-1 capitalize">
              Type
            </TableHead>
            <TableHead className="primary-font font-base-1 capitalize">
              Weekend
            </TableHead>
            <TableHead className="primary-font font-base-1 capitalize">
              Diet
            </TableHead>
            <TableHead className="primary-font font-base-1 capitalize">
              Start Date
            </TableHead>
            <TableHead className="primary-font font-base-1 capitalize">
              End Date
            </TableHead>
            <TableHead className="primary-font font-base-1 capitalize">
              Pause
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((sub,index) => (
            <TableRow key={sub.id}>
              <TableCell className="primary-font font-base-1 capitalize">
                {currentPage * count + index + 1}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.amount ? `₹${sub.amount}` : "—"}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.box?.name || `Box ${sub.boxId}`}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.deliveryType}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.subscriptionType}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.weekendType || "—"}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.dietType === "non_veg" ? "Non-Veg" : "Veg" || "—"}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {new Date(sub.startDate).toDateString()}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {new Date(sub.endDate).toDateString()}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                <PauseSubscriptionModal
                  activeSubscription={sub}
                  customerId={customerId}
                  subsId={subsId}
                  token={token}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {count > 5 && (
        <div className="flex flex-wrap justify-end items-center mt-4 gap-2 text-sm md:text-base">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-3 py-1">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={currentPage + 1 >= totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
