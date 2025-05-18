import { pagesMargin } from "@/lib/tailwind/classNames";
import ProductDetail from "@/components/pages/product-details/ProductDetails";
import { getProductDetailsById } from "@/lib/api/productDetails";
import { notFound } from "next/navigation";
export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params; // Await params to resolve the Promise
  const getIdFromSlug = (slug: string) => {
    const parts = slug.split("-");
    const id = parts[parts.length - 1];
    return id;
  };
  const id = getIdFromSlug(slug);

  try {
    const product = await getProductDetailsById(id);
    console.log("Product details:", product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return notFound();
  }

  return (
    <div className={`min-h-screen ${pagesMargin}`}>
      <ProductDetail />
    </div>
  );
}
