export const EmployeesPageSkeleton = () => {
  return (
    <div className="grid grid-cols-[300px_1fr] gap-4">
      <div className="animate-pulse rounded-2xl border border-greyscale-200 bg-white p-4">
        <div className="mb-4 h-10 rounded bg-greyscale-200" />
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="mb-3 h-10 rounded bg-greyscale-200" />
        ))}
      </div>
      <div className="animate-pulse rounded-2xl border border-greyscale-200 bg-white p-4">
        <div className="mb-4 h-8 w-1/3 rounded bg-greyscale-200" />
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="mb-3 h-9 rounded bg-greyscale-200" />
        ))}
      </div>
    </div>
  );
};
