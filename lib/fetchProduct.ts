import { ProductContent } from "@/typings/productTypings";

async function fetchProduct(url: string) {
    const username = process.env.OXYLABS_USERNAME;
    const password = process.env.OXYLABS_PASSWORD;

    const newUrl = new URL(`https://www.walmart.com${url}`);
    
    console.log("Scraping >>>", newUrl.toString());

    const body = {
        source: "universal_ecommerce",
        url: newUrl.toString(),
        geo_location: "United States",
        parse: true,
    };

    const response = fetch("https://realtime.oxylabs.io/v1/queries", { //Calls Oxylabs' Real-Time Crawler API (/v1/queries endpoint). fetch is used to send an HTTP POST request.
        method: "post",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Authorization:
                "Basic " + Buffer.from(`${username}:${password}`).toString("base64"), //This is required to prove access to the API.
        },
        next: {
            revalidate: 60 * 60  * 24, // refresh the cache every every hour every 1 day. ISR
        }, 
    }) .then((res) => res.json()) // /*Handling API Response*/ Converts response to JSON
        .then((data) => {
            if (data.results.length === 0) return; // If no results, exit
            const result: ProductContent = data.results[0]; // Extract first result

            const product = result.content;
    
            return product;
        })
        .catch((err) => console.log(err));
    
        return response;
}

export default fetchProduct;