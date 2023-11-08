export default function getValidator(parameterLocation) {
    return parameterLocation('firstName')
        .isString()
        .withMessage("Der Vorname muss als Text interpretierbar sein.")
        .notEmpty()
        .withMessage("Der Vorname darf nicht leer sein.");
}