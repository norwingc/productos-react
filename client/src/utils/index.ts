export function formatPrice(price: number) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
    }).format(price);
}

export function toBoolean(value: string) {
    return value.toLowerCase() === "true";
}
