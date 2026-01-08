"use client";

export default function UpgradeBanner({ message }: { message: string }) {
  return (
    <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-xl">
      <p className="font-medium text-yellow-800">
        Upgrade Required
      </p>
      <p className="text-sm text-yellow-700 mt-1">
        {message}
      </p>
    </div>
  );
}
