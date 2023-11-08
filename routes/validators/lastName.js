export default function getValidator(parameterLocation) {
    return parameterLocation('lastName')
        .isString()
        .withMessage("Der Nachname muss als Text interpretierbar sein.")
        .notEmpty()
        .withMessage("Der Nachname darf nicht leer sein.");
}