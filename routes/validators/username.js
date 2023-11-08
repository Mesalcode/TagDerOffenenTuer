export default function getValidator(parameterLocation) {
    return parameterLocation('username')
        .isString()
        .withMessage("Der Benutzername muss als Text zu interpretieren sein.")
        .isAlphanumeric()
        .withMessage("Der Benutzername darf nur die Buchstaben a-Z und die Zahlen 0-9 beinhalten.")
        .isLength(
            { 
                min: global.config.USERNAME_MIN_LENGTH, 
                max: global.config.USERNAME_MAX_LENGTH
            }
        ).withMessage(
            "Der Benutzername muss zwischen "
            + global.config.USERNAME_MIN_LENGTH 
            + " und " 
            + global.config.USERNAME_MAX_LENGTH 
            + " Zeichen lang sein."
        );
}