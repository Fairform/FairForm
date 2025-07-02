import { industries } from "@/data/industries";
import { notFound } from "next/navigation";
import DynamicForm from "@/components/DynamicForm";

export default function GeneratorPage({ params }: { params: { industrySlug: string } }) {
  const industry = industries.find((i) => i.slug === params.industrySlug);
  if (!industry) return notFound();

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-4">{industry.name} Compliance Pack</h1>
      <p className="text-gray-600 mb-6">{industry.description}</p>
      <DynamicForm industrySlug={industry.slug} />
    </div>
  );
}