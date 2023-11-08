export default function getValidator(parameterLocation) {
    return parameterLocation('os')
        .isString()
        .withMessage("Das Betriebssystem muss mindestens ein Sonderzeichen beinhalten")
        .notEmpty()
        .withMessage("Das Betriebssystem darf nicht leer sein.");
}