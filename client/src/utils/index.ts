export function formatPrice(price: number) {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
    }).format(price);
}
