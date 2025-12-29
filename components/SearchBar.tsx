"use client";

import { Input } from "antd";
import { useRouter } from "next/navigation";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchBar({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();

  const handleSearch = (value: string) => {
    router.push(`/?q=${encodeURIComponent(value)}`);
  };

  return (
    <Input
      placeholder="Search stars..."
      autoFocus
      allowClear
      size="large"
      defaultValue={initialQuery}
      // ✅ Trigger search on Enter key since we removed the button
      onPressEnter={(e) => handleSearch(e.currentTarget.value)}
      // ✅ Add Search icon on the left
      prefix={
        <SearchOutlined
          style={{ color: "#9ca3af", fontSize: 18, marginRight: 8 }}
        />
      }
      style={{
        maxWidth: 600,
        width: "100%",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)", // Optional: adds a nice lift
      }}
    />
  );
}
