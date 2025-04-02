import { Result } from "@/typings/searchTypings";

//designed to scrape e-commerce search results from Walmart using the Oxylabs API
function fetchSearch(searchTerm: string) { //Defines a function named fetchSearch that takes searchTerm (a string) as input.
    const username = process.env.OXYLABS_USERNAME;
    const password = process.env.OXYLABS_PASSWORD;

    const newUrl = new URL(`https://www.walmart.com/search?q=${searchTerm}`); //Builds a Walmart search URL dynamically using the search term

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
            revalidate: 60 * 60,
        } 
    })

    //Handling API Response
    .then((res) => res.json()) // Converts response to JSON
    .then((data) => {
        if (data.results.length === 0) return; // If no results, exit
        const result: Result = data.results[0]; // Extract first result

        return result;
    })
    .catch((err) => console.log(err));

    return response;
}

export default fetchSearch