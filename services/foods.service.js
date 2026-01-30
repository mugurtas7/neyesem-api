export async function searchFoodByName(query) {
    try {
        const r = await axios.get(
            "https://world.openfoodfacts.org/cgi/search.pl",
            { params: { search_terms: q, json: 1, page_size: 1, lc: "tr" } }
        );

        product = r.data.products?.[0];

        return product;
    } catch (err) {
        return new Error("Bilinmeyen bir hata oluştu!");
    }
}