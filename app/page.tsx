"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Calendar, ExternalLink, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Article {
  title: string
  description: string
  content: string
  url: string
  image: string
  publishedAt: string
  source: {
    name: string
    url: string
  }
}

interface NewsResponse {
  totalArticles: number
  articles: Article[]
}

const categories = [
  { value: "general", label: "General" },
  { value: "world", label: "World" },
  { value: "nation", label: "Nation" },
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "entertainment", label: "Entertainment" },
  { value: "sports", label: "Sports" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
]

export default function NewsAggregator() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [searchInput, setSearchInput] = useState("")

  const fetchNews = async (query?: string, category?: string) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (query) params.append("q", query)
      if (category && category !== "general") params.append("category", category)

      const response = await fetch(`/api/news?${params.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch news")

      const data: NewsResponse = await response.json()
      setArticles(data.articles)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(searchQuery, selectedCategory)
  }, [searchQuery, selectedCategory])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(searchInput)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">MerpatiNews Aggregator</h1>
              <p className="text-muted-foreground">by aslich - KambingCoding</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search news..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Button type="submit" variant="default">Search</Button>
              </form>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2 text-lg">Loading news...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg font-medium">Error loading news</div>
            <p className="text-muted-foreground mt-2">{error}</p>
            <Button onClick={() => fetchNews(searchQuery, selectedCategory)} className="mt-4" variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                {articles.length} articles found
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== "general" && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                  {article.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                        }}
                      />
                    </div>
                  )}

                  <CardHeader className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Badge variant="secondary">{article.source.name}</Badge>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(article.publishedAt)}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg leading-tight">{article.title}</CardTitle>
                    {article.description && (
                      <CardDescription className="line-clamp-3">{article.description}</CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        Read Full Article
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {articles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-lg font-medium">No articles found</div>
                <p className="text-muted-foreground mt-2">Try adjusting your search terms or category filter</p>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <footer className="mt-12 border-t pt-6 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} MerpatiNews by aslich - KambingCoding
        </footer>
      </main>
    </div>
  )
}
