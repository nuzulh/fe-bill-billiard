import { Spinner } from ".";

export function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
