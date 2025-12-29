import axios from "axios";
import { cache } from "react";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const OG_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: "en-US" },
  timeout: 10000,
});

export interface Celebrity {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}

export interface CelebrityDetail extends Celebrity {
  biography: string;
  birthday: string;
  place_of_birth: string;
  images?: { profiles: { file_path: string }[] };
  // ✅ ADD EXTERNAL IDS
  external_ids?: {
    imdb_id?: string;
    instagram_id?: string;
    twitter_id?: string;
    facebook_id?: string;
  };
}

export interface SearchResponse {
  results: Celebrity[];
  total_results: number;
  total_pages: number;
}

export const getImageUrl = (path: string | null) =>
  path
    ? `${IMAGE_BASE_URL}${path}`
    : "https://placehold.co/500x750?text=No+Image";

export const getOpenGraphImage = (path: string | null) =>
  path
    ? `${OG_IMAGE_BASE_URL}${path}`
    : "https://placehold.co/1200x630?text=No+Image";

export async function searchCelebrities(
  query: string = "",
  page: number = 1
): Promise<SearchResponse> {
  try {
    const endpoint = query ? "/search/person" : "/person/popular";
    const response = await tmdbClient.get(endpoint, {
      params: { query, page },
    });

    // Remove duplicates based on ID
    const uniqueResults = Array.from(
      new Map(
        response.data.results.map((item: Celebrity) => [item.id, item])
      ).values()
    ) as Celebrity[];

    return {
      results: uniqueResults,
      total_results: response.data.total_results,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching celebrities:", error);
    return { results: [], total_results: 0, total_pages: 0 };
  }
}

export const getCelebrityDetail = cache(
  async (id: string): Promise<CelebrityDetail> => {
    try {
      const response = await tmdbClient.get(`/person/${id}`, {
        // ✅ REQUEST EXTERNAL IDS HERE
        params: { append_to_response: "images,external_ids" },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching celebrity detail:", error);
      throw new Error("Failed to fetch celebrity details");
    }
  }
);
