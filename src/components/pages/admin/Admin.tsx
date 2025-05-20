"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import admin from "@/assets/images/admin.png";
import blacklogo from "@/assets/logo/blacklogo.svg";
import { getProducts, getOrders } from "@/lib/api/prod";
import type { Product } from "@/types/models/product";
import type { Order } from "@/types/models/order";
import PublishedProducts from "../../shared/PublishedProducts/PublishedProducts";
import OrdersTable from "../../shared/OrdersTable/OrdersTable";
import AddProduit from "../../shared/addproduit/AddProduit";
import { X, Menu, ChevronRight } from "lucide-react";

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState<"publie" | "commande">(
    "publie"
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
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
    const updateUnderline = () => {
      const ref = selectedTab === "publie" ? publieRef : commandeRef;
      if (ref.current) {
        setUnderlineStyle({
          left: ref.current.offsetLeft,
          width: ref.current.offsetWidth,
        });
      }
    };

    updateUnderline();

    // Update underline position on window resize
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [selectedTab]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="relative w-full h-[120px] sm:h-[150px] md:h-[200px]">
        <Image
          src={admin || "/placeholder.svg"}
          alt="admin"
          className="object-cover"
          fill
          priority
        />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-5 md:left-5 z-10">
          <Image
            src={blacklogo || "/placeholder.svg"}
            alt="Logo"
            width={50}
            height={50}
            className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[80px] md:h-[80px]"
          />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white bg-black/30">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-md text-center px-4">
            Ajoutez des articles
          </h1>
          <button
            onClick={openModal}
            className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-white text-black text-sm sm:text-base font-semibold rounded hover:bg-gray-100 transition-colors"
          >
            Ajoutez
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden flex items-center justify-between p-4 bg-gray-100">
          <button
            onClick={toggleSidebar}
            className="flex items-center gap-2 text-black font-medium"
          >
            <Menu className="w-5 h-5" />
            <span>Menu</span>
          </button>
          <Image
            src={blacklogo || "/placeholder.svg"}
            alt="Logo"
            width={40}
            height={40}
          />
        </div>

        {/* Sidebar - Hidden on mobile unless toggled */}
        <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block bg-[#F3F3F3] w-full md:w-48 md:min-h-[calc(100vh-200px-40px)] relative transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col text-theme text-bold py-5 md:py-10 px-4 gap-4">
            <li
              onClick={() => {
                openModal();
                setIsSidebarOpen(false);
              }}
              className="font-medium cursor-pointer hover:font-bold transition-all flex items-center justify-between"
            >
              <span>Ajoutez des articles</span>
              <ChevronRight className="w-4 h-4 md:hidden" />
            </li>
            <li className="font-medium cursor-pointer hover:font-bold transition-all flex items-center justify-between">
              <span>Stock épuisé</span>
              <ChevronRight className="w-4 h-4 md:hidden" />
            </li>
          </ul>
          <Image
            src={blacklogo || "/placeholder.svg"}
            alt="Logo"
            width={60}
            height={60}
            className="hidden md:block absolute bottom-5 left-5 z-10"
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6">
          {/* Tabs */}
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <div className="relative flex space-x-4 sm:space-x-6 md:space-x-8">
              <button
                ref={publieRef}
                onClick={() => setSelectedTab("publie")}
                className={`relative pb-2 text-sm sm:text-base ${
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
                className={`relative pb-2 text-sm sm:text-base ${
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

          {selectedTab === "publie" ? (
            <PublishedProducts products={products} />
          ) : (
            <OrdersTable orders={orders} />
          )}
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 text-gray-600 hover:text-gray-800 z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="p-3 sm:p-4 md:p-6">
              <AddProduit isEdit={false} closeModal={closeModal} />{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
