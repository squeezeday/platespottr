import { Link, useParams } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Entry from "./Entry";

export default function Gallery() {
  const { state } = useAppContext();
  const { query } = useParams();
  return (
    <>
      <h2 className="my-8">Wall of Fame</h2>
      <ul className="flex flex-wrap justify-center items-center mb-6 text-lg font-bold">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((initial) => (
          <li key={initial}>
            <Link to={`/gallery/${initial}`} className="p-2">
              {initial}XX
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
        {query ? (
          <>
            {state?.plates
              ?.filter((x) => x.number.charAt(0) === query)
              ?.sort((a, b) => a.number.localeCompare(b.number))
              ?.map((plate) => (
                <div key={plate.id} className="">
                  <Entry plate={plate} />
                </div>
              ))}
          </>
        ) : null}
      </div>
    </>
  );
}
