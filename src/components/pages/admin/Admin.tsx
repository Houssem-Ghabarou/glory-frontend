"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import admin from "@/assets/images/admin.png";
import blacklogo from "@/assets/logo/blacklogo.svg";
import { getProducts, getOrders } from "@/lib/prod";

import { Product } from "@/types/models/product";
import { Order } from "@/types/models/order";
import PublishedProducts from "../../shared/PublishedProducts/PublishedProducts";
import OrdersTable from "../../shared/OrdersTable/OrdersTable";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState<"publie" | "commande">(
    "publie"
  );
  const publieRef = useRef<HTMLButtonElement | null>(null);
  const commandeRef = useRef<HTMLButtonElement | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedTab === "publie") {
          const data = await getProducts();
          setProducts(data);
        } else {
          const data = await getOrders();
          setOrders(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedTab]);

  useEffect(() => {
    const ref = selectedTab === "publie" ? publieRef : commandeRef;
    if (ref.current) {
      setUnderlineStyle({
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth,
      });
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === "publie") {
      getProducts();
    } else {
      getOrders();
    }
  }, [selectedTab]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="relative w-full h-[400px]">
        <Image src={admin} alt="admin" className="object-cover" fill priority />
        <div className="absolute top-5 left-5 z-10">
          <Image src={blacklogo} alt="Logo" width={80} height={80} />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white bg-black/30">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-md">
            Ajoutez des articles
          </h1>
          <button className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-100">
            Ajoutez
          </button>
        </div>
      </div>

      <div className="flex w-full px-10 py-5">
        {/* Sidebar */}
        <aside className="bg-[#F3F3F3] w-48 min-h-[calc(100vh-400px-40px)] relative">
          <ul className="flex flex-col text-theme text-bold py-10 px-4 gap-4">
            <li className="font-medium cursor-pointer hover:font-bold transition-all">
              Ajoutez des articles
            </li>
            <li className="font-medium cursor-pointer hover:font-bold transition-all">
              Stock épuisé
            </li>
          </ul>
          <Image
            src={blacklogo}
            alt="Logo"
            width={80}
            height={80}
            className="absolute bottom-5 left-5 z-10"
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {/* Tabs */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex space-x-8">
              <button
                ref={publieRef}
                onClick={() => setSelectedTab("publie")}
                className={`relative pb-2 ${
                  selectedTab === "publie"
                    ? "font-bold text-black"
                    : "text-gray-500"
                }`}
              >
                Publiés
              </button>
              <button
                ref={commandeRef}
                onClick={() => setSelectedTab("commande")}
                className={`relative pb-2 ${
                  selectedTab === "commande"
                    ? "font-bold text-black"
                    : "text-gray-500"
                }`}
              >
                Commandes
              </button>

              <div
                className="absolute bottom-0 h-[3px] bg-black transition-all duration-300 ease-in-out"
                style={{
                  left: underlineStyle.left,
                  width: underlineStyle.width,
                }}
              />
            </div>
          </div>

          {/* Tab content */}
          {selectedTab === "publie" ? (
            <PublishedProducts products={products} />
          ) : (
            <OrdersTable orders={orders} />
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
