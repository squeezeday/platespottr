import { useAppContext } from "./context/AppContext";
import Entry from "./Entry";

export default function Gallery() {
  const { state } = useAppContext();
  return (
    <>
      <h2 className="my-8">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
        {state?.plates.map((plate) => (
          <div key={plate.id} className="">
            <Entry plate={plate} />
          </div>
        ))}
      </div>
    </>
  );
}
