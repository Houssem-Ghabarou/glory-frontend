"use client";
import React, { useState } from "react";
import Image from "next/image";
import type { Order } from "@/types/models/order";
import { ChevronRight } from "lucide-react";
import { OrderDetailsModal } from "../OrderDetailsModalProps/OrderDetailsModalProps";
import { updateOrderStatus, cancelOrder } from "../../../lib/api/placeOrder";

type Props = {
  orders: Order[];
};

const OrdersTable: React.FC<Props> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [localOrders, setLocalOrders] = useState<Order[]>(orders);

  const handleRowClick = (order: Order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  // Confirmation de la commande (status "Pending")
  const handleConfirm = async (orderId: string) => {
    const result = await updateOrderStatus(orderId, "Pending");
    if (result.success) {
      setLocalOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Pending" } : order
        )
      );
      alert("Commande confirmée !");
    } else {
      alert("Erreur : " + result.message);
    }
  };

  // Annulation de la commande (status "Cancelled")
  const handleCancel = async (orderId: string) => {
    const result = await cancelOrder(orderId);
    if (result.success) {
      setLocalOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
      alert("Commande annulée !");
    } else {
      alert("Erreur : " + result.message);
    }
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
              <th className="p-3 text-left">Actions</th>
              <th className="md:hidden p-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {localOrders.map((order) => (
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
                <td className="p-3">
                  {order.customerInfo.firstName} {order.customerInfo.lastName}
                </td>
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
                  {order.customerInfo.governorate},{" "}
                  {order.customerInfo.address1}
                </td>

                <td className="p-3">
                  {order.status === "Pending" ||
                  order.status === "Cancelled" ? (
                    <span
                      className={`px-3 py-1 rounded font-semibold ${
                        order.status === "Pending"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  ) : (
                    <div className="space-x-2">
                      <button
                        className="bg-black text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirm(order._id);
                        }}
                      >
                        Confirmer
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancel(order._id);
                        }}
                      >
                        Annuler
                      </button>
                    </div>
                  )}
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
