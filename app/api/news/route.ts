import { type NextRequest, NextResponse } from "next/server"

const GNEWS_API_KEY = process.env.GNEWS_API_KEY
const GNEWS_BASE_URL = "https://gnews.io/api/v4"

console.log("GNEWS_API_KEY =", GNEWS_API_KEY)

// Fallback mock data
const mockData = {
  totalArticles: 3,
  articles: [
    {
      title: "Breaking: Major Technology Breakthrough Announced",
      description:
        "Scientists have made a significant discovery that could revolutionize the tech industry. This breakthrough promises to change how we interact with technology in our daily lives.",
      content: "Full article content would be here...",
      url: "https://example.com/article1",
      image: "https://source.unsplash.com/400x200/?technology",
      publishedAt: new Date().toISOString(),
      source: {
        name: "Tech News Daily",
        url: "https://technewsdaily.com",
      },
    },
    {
      title: "Global Climate Summit Reaches Historic Agreement",
      description:
        "World leaders have come together to sign a groundbreaking climate agreement that sets ambitious targets for carbon reduction over the next decade.",
      content: "Full article content would be here...",
      url: "https://example.com/article2",
      image: "https://source.unsplash.com/400x200/?climate",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: {
        name: "Global News Network",
        url: "https://globalnews.com",
      },
    },
    {
      title: "Sports Championship Finals Draw Record Viewership",
      description:
        "The championship finals have broken all previous viewership records, with millions of fans tuning in from around the world to watch the historic match.",
      content: "Full article content would be here...",
      url: "https://example.com/article3",
      image: "https://source.unsplash.com/400x200/?sports",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: {
        name: "Sports Central",
        url: "https://sportscentral.com",
      },
    },
  ],
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const category = searchParams.get("category")

  try {
    if (!GNEWS_API_KEY) {
      throw new Error("GNEWS_API_KEY is missing")
    }

    const params = new URLSearchParams({
      token: GNEWS_API_KEY,
      lang: "en",
      country: "us",
      max: "12",
    })

    if (query) {
      params.append("q", query)
    }

    if (category) {
      params.append("category", category)
    }

    const endpoint = query ? "search" : "top-headlines"
    const url = `${GNEWS_BASE_URL}/${endpoint}?${params.toString()}`

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      console.error("GNews returned", response.status)
      return NextResponse.json(mockData)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("News API error:", error)
    return NextResponse.json(mockData)
  }
}
