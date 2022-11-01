import { Link, useParams } from "react-router-dom";
import { useAppContext } from "./context/AppContext";
import Entry from "./Entry";

export default function UserGallery() {
  const { state } = useAppContext();
  const { userId } = useParams();
  return (
    <>
      <h2 className="my-8">
        By {state.profiles.find((x) => x.id === userId)?.name}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
        {userId ? (
          <>
            {state?.plates
              ?.filter((x) => x.user_id === userId)
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
