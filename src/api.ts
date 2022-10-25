import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";

const getProfile = async (session: Session) => {
  try {
    let { data, error, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session?.user?.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(error);
  } finally {
  }
};

export { getProfile };
