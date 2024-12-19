"use strict";

const newUser = new UserForm();
newUser.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    });
};

newUser.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    })
};