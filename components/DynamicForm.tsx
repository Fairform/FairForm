"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchemas } from "@/data/formSchemas";

export default function DynamicForm({ industrySlug }: { industrySlug: string }) {
  const schema = formSchemas[industrySlug] || z.object({ companyName: z.string() });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    console.log("Form Data", data);
    // Placeholder for doc generation
    alert("Document generated (stub)");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {Object.keys(schema.shape).map((key) => (
        <div key={key}>
          <label className="block font-medium capitalize">{key}</label>
          <input
            {...register(key)}
            className="border rounded w-full px-3 py-2"
            placeholder={`Enter ${key}`}
          />
          {errors[key] && (
            <p className="text-red-500 text-sm">{errors[key]?.message?.toString()}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
      >
        Generate Policies
      </button>
    </form>
  );
}