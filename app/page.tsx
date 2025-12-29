import { Metadata } from "next";
import { searchCelebrities } from "@/lib/api";
import HomeClient from "@/components/Home";

export const revalidate = 3600;

interface Props {
  searchParams: Promise<{ q?: string; page?: string; sort?: string }>; // ✅ Add sort
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q: query } = await searchParams;

  return {
    title: query
      ? `Results for "${query}" | Celebrity Finder`
      : "Popular Celebrities | Celebrity Finder",
    description: query
      ? `Browse search results for ${query}.`
      : "Discover the most popular actors and actresses.",
    openGraph: {
      title: query
        ? `Results for "${query}" | Celebrity Finder`
        : "Popular Celebrities | Celebrity Finder",
      description: query
        ? `Browse search results for ${query}.`
        : "Discover the most popular actors and actresses.",
      siteName: "Celebrity Finder",
      images: [
        {
          url: "https://celeb.soft.io.vn/og-default.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  // ✅ Parse page number (Default to 1 if missing or invalid)
  const page = Number(resolvedParams.page) || 1;

  // ✅ Fetch data with pagination
  const { results, total_results } = await searchCelebrities(query, page);

  // TMDB API limit: They cap "popular" results at 500 pages (10,000 items)
  // even if total_results is higher. Let's cap it in the UI logic if needed,
  // but passing total_results works fine for Pagination logic.

  return (
    <HomeClient
      initialCelebrities={results}
      searchQuery={query}
      currentPage={page}
      totalResults={total_results > 10000 ? 10000 : total_results} // Cap at 10k for TMDB limits
    />
  );
}
