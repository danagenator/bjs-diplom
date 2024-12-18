"use strict";

const newUser = new UserForm();
newUser.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        response.success ? location.reload() : userForm.setLoginErrorMessage(response.error);
    });
};

newUser.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        response.success ? location.reload() : userForm.setRegisterErrorMessage(response.error);
    })
};