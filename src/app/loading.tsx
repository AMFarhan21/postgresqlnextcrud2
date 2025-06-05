import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return (
    <div className='w-6xl mx-auto max-w-screen px-6 justify-center flex mt-20'>
      <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-6xl rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-6xl" />
        <Skeleton className="h-4 w-6xl" />
      </div>
    </div>
    </div>
  )
}
