export default function getValidator(parameterLocation) {
    return parameterLocation('moodleUsername')
        .isString()
        .withMessage("Der Logineo-Benutzername muss mindestens ein Sonderzeichen beinhalten")
        .isAlphanumeric()
        .withMessage("Der Logineo-Benutzername darf nur Buchstaben und Zahlen enthalten.")
        .notEmpty()
        .withMessage("Der Logineo-Benutzername darf nicht leer sein.")
        .isLength(
            { 
                max: global.config.MOODLE_USERNAME_MAX_LENGTH 
            }
        ).withMessage(
            "Der Logineo-Benutzername darf nur maximal " 
            + global.config.MOODLE_USERNAME_MAX_LENGTH
            + " Zeichen lang sein."
        );
}