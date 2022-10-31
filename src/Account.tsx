import { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { getProfile } from "./api";
import { supabase } from "./supabaseClient";

const Account = ({ session }: { session: Session | null }) => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getProfile(session!);
      if (data) {
        setName(data.name);
      }
      setLoading(false);
    }
    if (session) {
      load();
    }
  }, [session]);

  const updateProfile = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updates = {
        id: session?.user?.id,
        name,
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      // alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div aria-live="polite">
      {loading ? (
        "Loading ..."
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          {!name?.length && (
            <h2 className="text-xl my-4">Complete your profile</h2>
          )}
          <div>Email: {session?.user?.email}</div>
          <div>
            <label htmlFor="username" className="block">
              Name
            </label>
            <input
              id="username"
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 bg-gray-700 my-2"
            />
          </div>

          <div>
            <button
              className="block border rounded p-2 bg-gray-700"
              disabled={loading}
            >
              Update profile
            </button>
          </div>
        </form>
      )}
      <button
        type="button"
        className="block border rounded p-2 my-8"
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Account;
