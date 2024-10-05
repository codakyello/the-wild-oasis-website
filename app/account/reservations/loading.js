import Spinner from "@/app/_components/Spinner";

function Loading() {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <Spinner />
    </div>
  );
}

export default Loading;
