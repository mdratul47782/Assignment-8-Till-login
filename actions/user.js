import connectMongo from "@/dbConnect/connectMongo";
import User from "@/models/User";
export const getUsers = async () => {
  try {
    await connectMongo();

    // get users

    const users = await User.find();
    return users;
  } catch (err) {


    console.log(err);
  }
};
