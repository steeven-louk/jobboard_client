import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function JobCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex items-center space-x-4 mb-4">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

