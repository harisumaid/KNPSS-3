import { fetchAllNews } from "../../lib/fetchForNews";

export default async (req, res) => {
  res.json(await fetchAllNews());
};
