import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 

const OrderHistoryTable = () => {
  const orders = [
    {
      orderNo: "01",
      orderDate: "2025-03-20",
      yourOrder: "Maharashtrian Cuisine",
      orderType: "Executive Meal",
      location: "Dadar",
    },
    {
      orderNo: "02",
      orderDate: "2025-03-21",
      yourOrder: "Punjabi Cuisine",
      orderType: "Executive Meal",
      location: "Dadar",
    },
    {
      orderNo: "03",
      orderDate: "2025-03-22",
      yourOrder: "Gujarati Cuisine",
      orderType: "Executive Meal",
      location: "Dadar",
    },
  ];

  return (
    <Table className="w-full mt-8">
      <TableHeader>
        <TableRow>
          <TableHead>Order No</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Your Order</TableHead>
          <TableHead>Order Type</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.orderNo}>
            <TableCell>{order.orderNo}</TableCell>
            <TableCell>{order.orderDate}</TableCell>
            <TableCell>{order.yourOrder}</TableCell>
            <TableCell>{order.orderType}</TableCell>
            <TableCell>{order.location}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderHistoryTable;
