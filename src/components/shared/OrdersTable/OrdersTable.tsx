"use client";
import React from "react";
import Image from "next/image";
import { Order } from "@/types/models/order";

type Props = {
  orders: Order[];
};

const OrdersTable: React.FC<Props> = ({ orders }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Article</th>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Téléphone</th>
            <th className="p-3 text-left">Quantité</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-left">Localisation</th>
            <th className="p-3 text-left">Livré</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="p-3 space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {item.product &&
                      typeof item.product === "object" &&
                      "images" in item.product &&
                      item.product.images?.[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt="Produit"
                          width={40}
                          height={40}
                          className="rounded object-cover"
                        />
                      )}
                  </div>
                ))}
              </td>
              <td className="p-3">{order.customerInfo.name}</td>
              <td className="p-3">{order.customerInfo.phone}</td>
              <td className="p-3">
                {order.items.reduce((total, item) => total + item.quantity, 0)}
              </td>
              <td className="p-3">{order.total} dt</td>
              <td className="p-3">
                {order.customerInfo.gouvernourat}, {order.customerInfo.ville}
              </td>
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={order.status === "Completed"}
                  readOnly
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
