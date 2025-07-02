"use client";
import { useRouter } from "next/navigation";
import { industries } from "@/data/industries";

export default function IndustrySelector() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {industries.map((industry) => (
        <button
          key={industry.slug}
          onClick={() => router.push(`/generate/${industry.slug}`)}
          className="border p-4 rounded-md text-left hover:bg-gray-50"
        >
          <h2 className="font-semibold">{industry.name}</h2>
          <p className="text-sm text-gray-500">{industry.description}</p>
        </button>
      ))}
    </div>
  );
}