export default async function getBrandsData() {
    const res = await fetch('https://prodapp.lifepharmacy.com/api/web/brands')

    if (!res.ok) throw new Error('failed to fetch data')

    return res.json()
}