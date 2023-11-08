export default function getValidator(parameterLocation) {
    return parameterLocation('browser')
        .isString()
        .withMessage("Der Browsername muss als Text interpretierbar sein.")
        .notEmpty()
        .withMessage("Der Browsername darf nicht leer sein.");
}