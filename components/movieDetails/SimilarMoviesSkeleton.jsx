import Skeleton from "./Skeleton";
function SimilarMoviesSkeleton() {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
      </div>
    );
  }
  