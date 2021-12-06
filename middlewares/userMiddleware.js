import * as userService from "../services/userService.js";

const userMiddleware = async (context, next) => {
  const user = await context.state.session.get("user");

  if (user) {
    const found_user = await userService.findUserByEmail(user.email);
    context.user = found_user[0];
  }

  await next();
};

export { userMiddleware };