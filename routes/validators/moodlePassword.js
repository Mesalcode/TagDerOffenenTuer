export default function getValidator(parameterLocation) {
    return parameterLocation('moodlePassword')
        .isString()
        .withMessage("Das Logineo-Passwort muss als Text interpretierbar sein.")
        .notEmpty()
        .withMessage("Das Logineo-Passwort darf nicht leer sein.");
}