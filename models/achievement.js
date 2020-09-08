const mongoose = require('mongoose')

var achievementSchema = new mongoose.Schema({
    date: String,
    title : String,
    details: String,
    filePath: String,
});

var AchievementModel;
try{
    AchievementModel = mongoose.model('achievement');
} catch{
    AchievementModel = mongoose.model('achievement',achievementSchema);
}



export default AchievementModel;