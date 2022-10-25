import { Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      <h2 className="my-8">Latest entries</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
        {state?.plates
          ?.sort((a, b) => a.number.localeCompare(b.number))
          .map((plate) => (
            <div key={plate.id} className="">
              <Plate number={plate.number} />
            </div>
          ))}
      </div>
    </>
  );
}
