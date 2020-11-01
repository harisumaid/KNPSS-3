import { date } from "yup";
import mongooseConnection from "../middleware/database";
import News from "../models/news";

export const fetchAllNews = async () => {
  const data = await News.find({});
  return JSON.stringify(data);
};

export const fetchIdList = async () => {
  const idList = await News.find({}, "_id");
  return idList.map((id) => {
    return {
      params: {
        id: id._id.toString(),
      },
    };
  });
};

export const fetchForId = async (id) => {
  const data = JSON.stringify(await News.find({ _id: id }));
  return data;
};

export const fetchFirstFive = async () => {
  const data = await News.find({}).sort("date").limit(5);
  return JSON.stringify(data);
};
