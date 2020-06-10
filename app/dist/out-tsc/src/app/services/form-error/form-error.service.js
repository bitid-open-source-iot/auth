import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let FormErrorService = class FormErrorService {
    validationMessages() {
        const messages = {
            email: 'This email address is invalid',
            required: 'This field is required',
            not_allowed_characters: (matches) => {
                let matchedCharacters = matches;
                matchedCharacters = matchedCharacters.reduce((characterString, character, index) => {
                    let string = characterString;
                    string += character;
                    if (matchedCharacters.length !== index + 1) {
                        string += ', ';
                    }
                    return string;
                }, '');
                return `These characters are not allowed: ${matchedCharacters}`;
            },
        };
        return messages;
    }
    ;
    validateForm(formToValidate, formErrors, checkDirty) {
        const form = formToValidate;
        for (const field in formErrors) {
            if (field) {
                formErrors[field] = '';
                const control = form.get(field);
                const messages = this.validationMessages();
                if (control && !control.valid) {
                    if (!checkDirty || (control.dirty || control.touched)) {
                        for (const key in control.errors) {
                            if (key && key !== 'not_allowed_characters') {
                                formErrors[field] = formErrors[field] || messages[key];
                            }
                            else {
                                formErrors[field] = formErrors[field] || messages[key](control.errors[key]);
                            }
                        }
                    }
                }
            }
        }
        return formErrors;
    }
};
FormErrorService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FormErrorService);
export { FormErrorService };
//# sourceMappingURL=form-error.service.js.map