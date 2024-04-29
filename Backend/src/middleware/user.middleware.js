import { User } from "../models/user.modal.js";

const getUser = async (req, res, next) => {
  const name = req.body.user?.name;
  const email = req.body.user?.email;
  let user;
  try {
    user = await User.findOne({ email });

    if (user) {
      req.body.user = user;
      next();
    } else {
      user = await User.create({
        name,
        email,
        queryCount: 0,
      });
      req.body.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
export { getUser };
