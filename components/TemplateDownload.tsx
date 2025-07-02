export default function TemplateDownload({ files = [] }: { files: string[] }) {
  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="font-bold text-lg mb-2">Your Documents</h2>
      <ul className="list-disc pl-6 text-sm">
        {files.map((file) => (
          <li key={file}>
            <a href={`#`} className="text-blue-600 underline">
              {file}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-gray-500 mt-4">
        Upgrade to Pro to unlock editable versions and additional policies.
      </p>
    </div>
  );
}