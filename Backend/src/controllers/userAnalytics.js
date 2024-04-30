import { User } from "../models/user.modal.js";

const userAnalytics = async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);
    console.log(users);
  } catch (error) {
    console.log(error);
  }
};
export { userAnalytics };
