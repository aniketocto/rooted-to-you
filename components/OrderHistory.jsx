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

const OrderHistory = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const storedUser = JSON.parse(
          localStorage.getItem("authenticatedUser")
        );
        const customerId = storedUser?.id;
        const token = storedUser?.token; // Assuming the token is stored here

        if (!customerId || !token) {
          console.error("Missing user ID or token in localStorage.");
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/subscriptions/list/${customerId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log(data);

        if (data.success) {
          setSubscriptions(data.subscriptions || []);
        }
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
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

  return (
    <div className="overflow-hidden rounded-md shadow-sm border-b-1 mt-8">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="primary-font font-base-1 capitalize">ID</TableHead>
            <TableHead className="primary-font font-base-1 capitalize">Amount</TableHead>
            <TableHead className="primary-font font-base-1 capitalize">Box</TableHead>
            <TableHead className="primary-font font-base-1 capitalize">Type</TableHead>
            <TableHead className="primary-font font-base-1 capitalize">Weekend</TableHead>
            <TableHead className="primary-font font-base-1 capitalize">Diet</TableHead>
            <TableHead className="primary-font font-base-1 capitalize">
              Start Date
            </TableHead>
            <TableHead className="primary-font font-base-1 capitalize">End Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.id}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.amount ? `₹${sub.amount}` : "—"}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.box?.name || `Box ${sub.boxId}`}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.subscriptionType}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.weekendType || "—"}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {sub.dietType || "—"}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {new Date(sub.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="primary-font font-base-1 capitalize">
                {new Date(sub.endDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderHistory;
