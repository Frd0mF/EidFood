export default async function handler(req, res) {
    const { q } = req.query;
    const url = `https://api.edamam.com/search?q=${q}&app_id=${process.env.EDMAM_APP_ID}&app_key=${process.env.EDMAM_APP_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data.hits);
}