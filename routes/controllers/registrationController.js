import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";
import { registrationValidationRules } from "../../validation/validationRules.js";

const showRegistrationForm = ({ render }) => {
    const populated = {};
    render("registration.eta", populated);
};

const getRegistrationData = async (request) => {
    const body = request.body({type: "form"});
    const params = await body.value;

    return {
        email: params.get("email"),
        password: params.get("password"),
        errors: [],
    };
};

const registerUser = async ({ request, response, render }) => {
    const registrationData = await getRegistrationData(request);
    const [passes, errors] = await validasaur.validate(
        registrationData,
        registrationValidationRules,
    );
    
    if (!passes) {
        registrationData.errors.push(errors);
        render("registration.eta", { errors: registrationData.errors[0], populated: registrationData.email });
    } else {
        await userService.addUser(registrationData.email, await bcrypt.hash(registrationData.password));
        response.redirect("/auth/login");
    }


};

export { showRegistrationForm, registerUser };