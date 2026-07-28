import type { Metadata } from "next";
import ProductCatalog, { type Product } from "@/component/product-page";

export const metadata: Metadata = {
  title: "Explore Products",
  description: "Browse, search, and filter our full product catalog.",
};

interface DummyJsonResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Runs on the server for every request (SSR). If you'd rather cache and
// revalidate periodically instead of fetching fresh every time, swap
// `cache: "no-store"` for `next: { revalidate: 60 }` (ISR).
async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://dummyjson.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const json: DummyJsonResponse = await res.json();
    return json.products ?? [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Page() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-slate-50/50 py-6 sm:py-10">
      <ProductCatalog initialProducts={products} />
    </main>
  );
}