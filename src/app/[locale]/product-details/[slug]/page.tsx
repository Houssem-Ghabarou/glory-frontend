import { pagesMargin } from "@/lib/tailwind/classNames";
import ProductDetail from "@/components/pages/product-details/ProductDetails";

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

  return (
    <div className={`min-h-screen ${pagesMargin}`}>
      <ProductDetail />
    </div>
  );
}
