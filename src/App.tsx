import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import { Session } from "@supabase/supabase-js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import Home from "./Home";
import Leaderboard from "./Leaderboard";
import Layout from "./Layout";
import Account from "./Account";
import Submit from "./Submit";
import { AppWrapper } from "./context/AppContext";
import Gallery from "./Gallery";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="App">
      {!session ? (
        <>
          <Auth />
        </>
      ) : (
        <AppWrapper>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home session={session} />} />
                <Route
                  path="/account"
                  element={<Account session={session} />}
                />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/submit" element={<Submit session={session} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AppWrapper>
      )}
    </div>
  );
}

export default App;
