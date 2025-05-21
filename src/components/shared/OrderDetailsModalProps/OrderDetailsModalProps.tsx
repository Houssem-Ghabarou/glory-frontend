import type { Order } from "@/types/models/order";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Cancelled: "bg-red-100 text-red-800",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <Dialog open={!!order} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Détails de la commande
          </DialogTitle>
          <DialogClose className="absolute cursor-pointer right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </DialogClose>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Statut</h3>
            <Badge className={statusColors[order.status]}>{order.status}</Badge>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Informations client</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Nom</div>
              <div>{order.customerInfo.name}</div>

              <div className="text-gray-500">Email</div>
              <div>{order.customerInfo.email}</div>

              <div className="text-gray-500">Téléphone</div>
              <div>{order.customerInfo.phone}</div>

              <div className="text-gray-500">Adresse</div>
              <div>
                {order.customerInfo.address}, {order.customerInfo.ville},{" "}
                {order.customerInfo.gouvernourat}
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Articles</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  {item.product &&
                    typeof item.product === "object" &&
                    item.product !== null &&
                    "images" in item.product &&
                    item.product.images?.[0] && (
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt="Produit"
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                    )}
                  <div className="flex-1">
                    <div className="font-medium">
                      {typeof item.product === "object" &&
                      item.product !== null &&
                      "name" in item.product
                        ? item.product.name
                        : "Produit"}
                    </div>
                    <div className="text-sm text-gray-500">
                      Taille: {item.size}, Couleur: {item.color}
                    </div>
                    <div className="text-sm">Quantité: {item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <h3 className="font-semibold">Total</h3>
            <div className="text-xl font-bold">{order.total} dt</div>
          </div>

          <div className="border-t pt-4 text-sm text-gray-500">
            <div>Créé le: {new Date(order.createdAt).toLocaleDateString()}</div>
            <div>
              Mis à jour le: {new Date(order.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
