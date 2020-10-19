const mongoose = require("mongoose");

var achievementSchema = new mongoose.Schema({
  date: { type: String, required: true },
  heading: { type: String, required: true },
  content: { type: String, required: true },
  imagesPath: [{ type: String }],
  pdfsPath: [{ type: String }],
});

var AchievementModel;
try {
  AchievementModel = mongoose.model("achievement");
} catch {
  AchievementModel = mongoose.model("achievement", achievementSchema);
}

export default AchievementModel;
