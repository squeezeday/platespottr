import { Session } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "./api";
import { useAppContext } from "./context/AppContext";
import Entry from "./Entry";
import Plate from "./Plate";

export default function Home({ session }: { session: Session | null }) {
  const { state } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile(session!);
        if (!data) throw new Error("No profile");
      } catch (error) {
        navigate("/account");
      }
    }
    if (session) {
      load();
    }
  }, [session]);

  return (
    <>
      <h2 className="my-8 text-5xl">Platespotter challenge 2022</h2>

      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((initial) => {
        return (
          <div className="" key={`plates-${initial}`}>
            <h3>{initial}XX</h3>
            {state?.plates
              .filter((x) => x.number.charAt(0) === initial.toString())
              ?.sort((a, b) => a.number.localeCompare(b.number))
              .map((plate) => (
                <div key={plate.id} className="w-32">
                  <a
                    href={`https://res.cloudinary.com/${
                      import.meta.env.VITE_CLOUD_NAME
                    }/image/upload/w_640,h_640,c_fit/${
                      plate.cloudinary_id
                    }.jpg`}
                    target="_blank"
                  >
                    <Plate number={plate.number} />
                  </a>
                </div>
              ))}
          </div>
        );
      })}
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <Link
          className="rounded border-2  bg-gray-700 text-white text-2xl p-4 mx-auto block text-center max-w-sm"
          to="/submit"
        >
          Submit New Plate
        </Link>
      </div>
    </>
  );
}
