import { useState, useEffect } from "react";
import Plate from "./Plate";
import { supabase } from "./supabaseClient";
import IPlate from "./types/plate";

interface num_plates {
  count: number;
}
interface ILeaderboardRow {
  id: string;
  name: string;
  num_plates: num_plates[];
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<ILeaderboardRow[]>([]);
  const loadPlates = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, num_plates:plates(count)");
    if (data)
      setLeaderboard(
        (data as ILeaderboardRow[]).sort(
          (a, b) => b.num_plates[0].count - a.num_plates[0].count
        )
      );
  };
  useEffect(() => {
    loadPlates();
  }, []);
  return (
    <>
      <h2 className="my-8">Leaderboard</h2>
      <div className="flex">
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard?.map((user) => (
              <tr key={`leaderboard-${user.id}`}>
                <td>{user.name}</td>
                <td>{user.num_plates[0].count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
