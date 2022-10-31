import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { supabase } from "../supabaseClient";
import IPlate from "../types/plate";
import IProfile from "../types/profile";

interface IAppContext {
  state: State;
}

const initialState = { plates: [], profiles: [] };

type State = {
  plates: IPlate[];
  profiles: IProfile[];
};
type Action = {
  type?: string;
  payload: any;
};

const appReducer = (state: State, action: Action): State => {
  if (action.type === "plates.upsert") {
    const other = state.plates.filter((x) => x.id != action.payload.id);
    return {
      ...state,
      plates: [action.payload, ...other],
    };
  } else if (action.type === "plates.set") {
    return {
      ...state,
      plates: action.payload,
    };
  } else if (action.type === "profiles.upsert") {
    const other = state.profiles.filter((x) => x.id != action.payload.id);
    return {
      ...state,
      profiles: [action.payload, ...other],
    };
  } else if (action.type === "profiles.set") {
    return {
      ...state,
      profiles: action.payload,
    };
  }
  return initialState;
};

const AppContext = createContext<IAppContext>({
  state: initialState,
});

export function AppWrapper({ children }: any) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const loadPlates = async () => {
    const { data, error } = await supabase
      .from("plates")
      .select(
        "id, number, user_id, cloudinary_id, created_at, profiles (id, name)"
      )
      .order("created_at");
    dispatch({ type: "plates.set", payload: data });
  };
  const loadProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("id, name");
    dispatch({ type: "profiles.set", payload: data });
  };

  useEffect(() => {
    const subscription = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "plates" },
        (payload) => {
          const plate = payload.new as IPlate;
          const profiles = state.profiles.find((x) => x.id === plate.user_id);
          console.log({ payload, profiles });
          dispatch({ type: "plates.upsert", payload: { ...plate, profiles } });
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "profiles" },
        (payload) => {
          dispatch({ type: "profiles.upsert", payload: payload.new });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "profiles" },
        (payload) => {
          dispatch({ type: "profiles.upsert", payload: payload.new });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);
  useEffect(() => {
    loadPlates();
    loadProfiles();
  }, []);
  return (
    <AppContext.Provider value={{ state }}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
