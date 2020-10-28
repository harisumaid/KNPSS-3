import mongooseConnection from '../middleware/database'
import Office from '../models/office'

export const fetchAllOffice = async ()=>{
    const OfficeList =  JSON.stringify(await Office.find({}));
    return OfficeList;
}