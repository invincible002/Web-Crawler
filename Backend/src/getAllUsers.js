import { User } from "./models/user.modal.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users, message: "Fetched All Users" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error While Fetching Users" });
  }
};
export { getAllUsers };
