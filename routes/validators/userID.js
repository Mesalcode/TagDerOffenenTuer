export default function getValidator(parameterLocation) {
    return parameterLocation('userID')
        .toInt();
}