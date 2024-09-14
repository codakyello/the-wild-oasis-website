import Spinner from "@/app/_components/Spinner";

function Loading() {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <Spinner />
      <p className="text-[2rem] text-primary-200">Loading cabin data...</p>
    </div>
  );
}

export default Loading;
