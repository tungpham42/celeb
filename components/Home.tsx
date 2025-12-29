"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Empty,
  Pagination,
  Image,
} from "antd";
import { Celebrity, getImageUrl } from "@/lib/api";
import SearchBar from "@/components/SearchBar";
import { FireFilled, StarFilled } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Meta } = Card; // ✅ Added Meta for standard card layouts

interface HomeClientProps {
  initialCelebrities?: Celebrity[];
  searchQuery?: string;
  currentPage?: number;
  totalResults?: number;
  currentSort?: string;
}

export default function HomeClient({
  initialCelebrities = [],
  searchQuery = "",
  currentPage = 1,
  totalResults = 0,
  currentSort = "popularity",
}: HomeClientProps) {
  const router = useRouter();

  const updateParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    params.set("page", currentPage.toString());
    params.set("sort", currentSort);
    Object.entries(newParams).forEach(([key, value]) => params.set(key, value));
    router.push(`/?${params.toString()}`);
  };

  return (
    <main style={{ minHeight: "100vh", paddingBottom: 80 }}>
      {/* 🌟 HERO SECTION */}
      <div
        style={{
          background: "linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)",
          padding: "80px 20px 100px",
          textAlign: "center",
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          marginBottom: -40,
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Title
            level={1}
            style={{
              fontSize: "3.5rem",
              marginBottom: 10,
              background: "linear-gradient(to right, #8b5cf6, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-1px",
            }}
          >
            Who&apos;s Trending?
          </Title>
          <Text
            style={{
              fontSize: 20,
              color: "#6b7280",
              display: "block",
              marginBottom: 40,
            }}
          >
            Discover the stories behind your favorite stars.
          </Text>

          {/* Search Bar */}
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <SearchBar initialQuery={searchQuery} />
          </div>
        </div>
      </div>

      {/* 🌟 CONTENT GRID */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        {initialCelebrities.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<Text style={{ fontSize: 18 }}>No stars found!</Text>}
            style={{ marginTop: 100 }}
          />
        ) : (
          <>
            <Row gutter={[32, 32]}>
              {initialCelebrities.map((person, index) => (
                <Col xs={24} sm={12} md={12} lg={6} key={person.id}>
                  <Link href={`/person/${person.id}`}>
                    <Card
                      hoverable
                      bordered={false}
                      bodyStyle={{ padding: "20px 10px", textAlign: "center" }}
                      cover={
                        <div style={{ position: "relative", height: 340 }}>
                          <Image
                            alt={person.name}
                            src={getImageUrl(person.profile_path)}
                            preview={false}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.5s ease",
                            }}
                          />
                          {/* Rank Badge */}
                          {currentPage === 1 && index < 3 && (
                            <div
                              style={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                background: "#fbbf24",
                                color: "#000",
                                padding: "4px 12px",
                                borderRadius: 20,
                                fontWeight: "bold",
                                fontSize: 12,
                                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                              }}
                            >
                              <StarFilled /> #{index + 1} Trending
                            </div>
                          )}
                        </div>
                      }
                    >
                      {/* ✅ USING META FOR ROBUST NAME DISPLAY */}
                      <Meta
                        title={
                          <div
                            style={{
                              fontSize: "1.4rem", // Larger size
                              fontWeight: 800, // Extra Bold
                              color: "#111827", // Almost black for max contrast
                              marginBottom: 12,
                              whiteSpace: "normal",
                              lineHeight: 1.2,
                              letterSpacing: "-0.02em", // Tighter, modern spacing
                              position: "relative",
                              textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                              width: "fit-content",
                              backgroundColor: "rgba(255, 255, 255, 0.8)",
                              padding: "4px 8px",
                              borderRadius: 8,
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          >
                            {person.name}
                          </div>
                        }
                        description={
                          <div>
                            <Tag color="purple" style={{ marginBottom: 10 }}>
                              {person.known_for_department}
                            </Tag>
                            <div style={{ color: "#9ca3af", fontSize: 12 }}>
                              <FireFilled style={{ color: "#f87171" }} />{" "}
                              {Math.round(person.popularity)} Popularity
                            </div>
                          </div>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>

            <div style={{ marginTop: 80, textAlign: "center" }}>
              <Pagination
                current={currentPage}
                total={totalResults > 10000 ? 10000 : totalResults}
                pageSize={20}
                onChange={(page) => updateParams({ page: page.toString() })}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
