"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CelebrityDetail, getCelebrityDetail, getImageUrl } from "@/lib/api";
import { Row, Col, Typography, Image, Tag, Button, Spin } from "antd";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  HeartFilled,
  GlobalOutlined,
  LinkOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const PersonPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [person, setPerson] = useState<CelebrityDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCelebrityDetail(id).then((data) => {
        setPerson(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !person) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{ background: "#fdfbf7", minHeight: "100vh", paddingBottom: 60 }}
    >
      {/* 🌟 Top Navigation Bar */}
      <div
        style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 20px 20px" }}
      >
        <Link href="/">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            style={{ color: "#6b7280", fontWeight: 600 }}
          >
            Back to Stars
          </Button>
        </Link>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
        <Row gutter={[48, 48]} align="top">
          {/* 📸 LEFT COLUMN: Photo */}
          <Col xs={24} md={8}>
            <div style={{ position: "sticky", top: 40 }}>
              <div
                style={{
                  borderRadius: 40,
                  overflow: "hidden",
                  boxShadow: "0 20px 50px -12px rgba(139, 92, 246, 0.25)",
                }}
              >
                <Image
                  src={getImageUrl(person.profile_path)}
                  alt={person.name}
                  width="100%"
                  preview={{ mask: "Zoom In" }}
                />
              </div>

              {/* ✅ NEW: EXTERNAL LINKS SECTION */}
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {person.external_ids?.imdb_id && (
                  <Button
                    href={`https://www.imdb.com/name/${person.external_ids.imdb_id}`}
                    target="_blank"
                    icon={<LinkOutlined />}
                    style={{
                      background: "#f5c518", // Official IMDb Yellow
                      color: "#000",
                      fontWeight: 800,
                      border: "none",
                      borderRadius: 8,
                      height: 44,
                      padding: "0 24px",
                    }}
                  >
                    IMDb
                  </Button>
                )}
                {person.external_ids?.instagram_id && (
                  <Button
                    href={`https://instagram.com/${person.external_ids.instagram_id}`}
                    target="_blank"
                    icon={<GlobalOutlined />}
                    shape="circle"
                    size="large"
                  />
                )}
              </div>
            </div>
          </Col>

          {/* 📝 RIGHT COLUMN: Info */}
          <Col xs={24} md={16}>
            <Tag
              color="orange"
              style={{
                borderRadius: 20,
                padding: "6px 16px",
                fontSize: 14,
                marginBottom: 16,
                border: "none",
                background: "#fff7ed",
                color: "#ea580c",
              }}
            >
              Known for {person.known_for_department}
            </Tag>

            <Title
              level={1}
              style={{ fontSize: "3rem", margin: "10px 0 20px" }}
            >
              {person.name}
            </Title>

            {/* Quick Stats Row */}
            <div style={{ display: "flex", gap: 24, marginBottom: 40 }}>
              <div>
                <Text
                  type="secondary"
                  style={{ display: "block", fontSize: 12, marginBottom: 4 }}
                >
                  BORN ON
                </Text>
                <Text strong style={{ fontSize: 16 }}>
                  <CalendarOutlined
                    style={{ color: "#8b5cf6", marginRight: 6 }}
                  />
                  {person.birthday || "N/A"}
                </Text>
              </div>
              <div>
                <Text
                  type="secondary"
                  style={{ display: "block", fontSize: 12, marginBottom: 4 }}
                >
                  FROM
                </Text>
                <Text strong style={{ fontSize: 16 }}>
                  <EnvironmentOutlined
                    style={{ color: "#8b5cf6", marginRight: 6 }}
                  />
                  {person.place_of_birth || "Unknown"}
                </Text>
              </div>
              <div>
                <Text
                  type="secondary"
                  style={{ display: "block", fontSize: 12, marginBottom: 4 }}
                >
                  POPULARITY
                </Text>
                <Text strong style={{ fontSize: 16 }}>
                  <HeartFilled style={{ color: "#ec4899", marginRight: 6 }} />
                  {Math.round(person.popularity)}%
                </Text>
              </div>
            </div>

            {/* Biography Card */}
            <div
              style={{
                background: "#fff",
                padding: 32,
                borderRadius: 32,
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <Title level={3} style={{ marginTop: 0 }}>
                About
              </Title>
              <Paragraph
                style={{
                  fontSize: 18,
                  lineHeight: 1.8,
                  color: "#4b5563",
                  marginBottom: 0,
                }}
                ellipsis={{
                  rows: 8,
                  expandable: true,
                  symbol: (
                    <span style={{ color: "#8b5cf6", fontWeight: "bold" }}>
                      Read Full Bio
                    </span>
                  ),
                }}
              >
                {person.biography ||
                  "We don't have a biography for this star yet, but we're sure they're amazing!"}
              </Paragraph>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PersonPage;
