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
  const [users, setUsers] = useState<ILeaderboardRow[]>([]);
  const loadPlates = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, num_plates:plates(count)");
    if (data) setUsers(data as ILeaderboardRow[]);
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
            {users?.map((user) => (
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
