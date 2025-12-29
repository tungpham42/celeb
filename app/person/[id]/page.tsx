import { Metadata } from "next";
import PersonPage from "@/components/Person";
import { getCelebrityDetail } from "@/lib/api";

export const revalidate = 86400;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const person = await getCelebrityDetail(id);

    return {
      title: `${person.name} - Biography & Facts`,
      description: person.biography
        ? person.biography.slice(0, 160) + "..."
        : `Learn more about ${person.name}.`,
      openGraph: {
        title: `${person.name} - Profile`,
        description: person.biography?.slice(0, 160),
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Celebrity Not Found",
      description: "The requested profile could not be retrieved.",
    };
  }
}

export default function Person() {
  return <PersonPage />;
}
