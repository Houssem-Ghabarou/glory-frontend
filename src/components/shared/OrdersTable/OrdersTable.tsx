"use client";
import type React from "react";
import { useState } from "react";
import Image from "next/image";
import type { Order } from "@/types/models/order";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OrderDetailsModal } from "../OrderDetailsModalProps/OrderDetailsModalProps";

type Props = {
  orders: Order[];
};

const OrdersTable: React.FC<Props> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Article</th>
              <th className="p-3 text-left">Client</th>
              <th className="hidden md:table-cell p-3 text-left">Téléphone</th>
              <th className="hidden md:table-cell p-3 text-left">Quantité</th>
              <th className="p-3 text-left">Total</th>
              <th className="hidden md:table-cell p-3 text-left">
                Localisation
              </th>
              <th className="hidden md:table-cell p-3 text-left">Livré</th>
              <th className="md:hidden p-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleRowClick(order)}
              >
                <td className="p-3">
                  {order.items[0]?.product &&
                    typeof order.items[0].product === "object" &&
                    order.items[0].product !== null &&
                    "images" in order.items[0].product &&
                    order.items[0].product.images?.[0] && (
                      <Image
                        src={
                          order.items[0].product.images[0] || "/placeholder.svg"
                        }
                        alt="Produit"
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                    )}
                </td>
                <td className="p-3">{order.customerInfo.name}</td>
                <td className="hidden md:table-cell p-3">
                  {order.customerInfo.phone}
                </td>
                <td className="hidden md:table-cell p-3">
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </td>
                <td className="p-3">{order.total} dt</td>
                <td className="hidden md:table-cell p-3">
                  {order.customerInfo.gouvernourat}, {order.customerInfo.ville}
                </td>
                <td className="hidden md:table-cell p-3">
                  <input
                    type="checkbox"
                    checked={order.status === "Completed"}
                    readOnly
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="md:hidden p-3 text-right">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OrderDetailsModal order={selectedOrder} onClose={closeModal} />
    </>
  );
};

export default OrdersTable;
