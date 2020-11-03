import { fetchAllAchievement } from "../../lib/fetchForAchievement";

export default async (req, res) => {
  res.json(await fetchAllAchievement());
};
