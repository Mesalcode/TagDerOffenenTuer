export default function getValidator(parameterLocation) {
    return parameterLocation('macAddress')
        .isString()
        .withMessage("Die Mac-Adresse muss als Text interpretierbar sein.")
        .isLength(
            { 
                min: 12, 
                max: 12 
            }
        ).withMessage("Die Mac-Adresse muss 12 Zeichen lang sein.");
}