import {
  Calendar,
  User,
  ArrowLeft,
  Newspaper,
} from "lucide-react";
import Link from "next/link";

interface ArticleData {
  _id: string;
  headline: string;
  image: string;
  description: string;
  author: string;
  publisher: string;
  createdAt: string;
}

async function getNewsById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/news/${id}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  if (!res.ok || !data.success) return null;
  return data.data as ArticleData;
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getNewsById(id);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#111827] flex flex-col items-center justify-center px-4 py-20 text-center">
        <Newspaper className="w-12 h-12 text-orange-500 mb-4" />
        <h1 className="text-2xl font-bold text-white">Article Not Found</h1>
        <p className="text-sm text-gray-400 mt-2 mb-8">
          The article you are looking for does not exist or may have been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg text-sm transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const formattedDate = article.createdAt
    ? new Date(article.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100 py-12 px-4 md:px-12 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <span className="bg-orange-500 text-white font-semibold px-3 py-1 rounded-lg text-xs uppercase tracking-wider">
          {article.publisher}
        </span>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 mb-6 leading-tight">
          {article.headline}
        </h1>

        <div className="flex items-center gap-6 text-sm text-gray-400 pb-6 border-b border-gray-800 mb-8">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-orange-500" /> {article.author}
          </span>
          {formattedDate && (
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" /> {formattedDate}
            </span>
          )}
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl mb-8 max-h-[450px]">
          <img
            src={article.image}
            alt={article.headline}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-[#1f2937] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-lg">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
            {article.description}
          </p>
        </div>
      </div>
    </div>
  );
}
