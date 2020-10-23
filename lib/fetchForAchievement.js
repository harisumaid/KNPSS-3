import mongooseConnection from '../middleware/database'
import Achievement from '../models/achievement'

export const fetchAllAchievement = async ()=>{
    const data = await Achievement.find({});
    return JSON.stringify(data);
}

export const fetchIdList = async()=>{
    const idList = await Achievement.find({},'_id');
    return idList.map(id=>{
        return {
            params:{
                id: id._id.toString(),
            }
        }
    })
}

export const fetchForId = async(id)=>{
    const data = JSON.stringify( await Achievement.find({_id:id}));
    return data;
}