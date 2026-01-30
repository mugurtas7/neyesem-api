export const calculateBMI = (height, weight) => {
    let heightSq = height * height;
    return weight / heightSq;
}

export const whatWantNormalize = (whatWant) => {
    return whatWant == 0 ? "Kilo Vermek" : (whatWant == 1 ? "Kilo Almak" : "Sağlıklı Kalmak")
}