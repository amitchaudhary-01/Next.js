'use client'

import React, { useState, useMemo } from 'react'

export interface Product {
  id: number
  title: string
  description: string
  price: number
  category: string
  rating: number
  thumbnail: string
}

interface ProductCatalogProps {
  initialProducts: Product[]
}

const   ProductCatalog = ({ initialProducts }: ProductCatalogProps) => {
  // No fetch, no loading state — data arrives already rendered from the server.
  const [products] = useState<Product[]>(initialProducts)
  const [search, setSearch] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'rating'>('default')

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)))
    return ['all', ...unique]
  }, [products])

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return 0
      })
  }, [products, search, selectedCategory, sortBy])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-slate-900">
      {/* Header & Controls */}
      <header className="mb-8">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Explore Products
        </h1>

        <div className="grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Search Input */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Search
            </label>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm capitalize text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-800 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </header>

      {/* Results Bar */}
      <div className="mb-6 text-sm text-slate-500">
        Showing <strong className="font-semibold text-slate-800">{filteredProducts.length}</strong> of{' '}
        <strong className="font-semibold text-slate-800">{products.length}</strong> products
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center">
          <h3 className="text-lg font-semibold text-slate-700">No products match your filters</h3>
          <p className="mt-1 text-sm text-slate-500">Try searching for something else or reset your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Product Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={p.thumbnail}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-700 backdrop-blur-xs shadow-xs">
                  {p.category}
                </span>
              </div>

              {/* Card Details */}
              <div className="flex flex-1 flex-col p-5">
                {/* Rating & Price */}
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-500">
                    ★ {p.rating.toFixed(1)}
                  </span>
                  <span className="text-xl font-bold text-slate-900">
                    ${p.price.toFixed(2)}
                  </span>
                </div>

                <h2 className="mb-2 text-base font-semibold text-slate-900 line-clamp-1">
                  {p.title}
                </h2>

                <p className="mb-5 text-sm text-slate-500 line-clamp-2">
                  {p.description}
                </p>

                {/* Call to Action */}
                <button className="mt-auto w-full cursor-pointer rounded-lg bg-blue-600 py-2.5 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCatalog