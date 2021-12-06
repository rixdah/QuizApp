import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const showLoginForm = ({ render }) => {
    const populated = {};
    render("login.eta", populated);
};

const processLogin = async ({ request, response, state, render }) => {
    const body = request.body({type: "form"});
    const params = await body.value;
    const userByEmail = await userService.findUserByEmail(params.get("email"));

    if (userByEmail.length != 1) {
        render("login.eta", {error: "Wrong email or password", populated: params.get("email")});
        return;
    }

    const userObj = userByEmail[0];
    const correctPassword = await bcrypt.compare(params.get("password"), userObj.password);

    if (!correctPassword) {
        render("login.eta", {error: "Wrong email or password", populated: params.get("email")});
        return;
    }

    await state.session.set("user", userObj);
    response.redirect("/questions");
};

const logout = async ({ state, response }) => {
    await state.session.set("authenticated", null);
    await state.session.set("user", null);
    
    response.redirect("/");
};

export { showLoginForm, processLogin, logout };