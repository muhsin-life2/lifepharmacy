export default async function getSingleProductData(lang:string, slug:string) {
    const urlPath =`https://prodapp.lifepharmacy.com/api/web/products/details?product_slug=${slug}&new_method=true&lang=${lang}`
    
    const res = await fetch(urlPath)

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}