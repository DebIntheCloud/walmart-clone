import Product from '@/components/Product';
import fetchSearch from '@/lib/fetchSearch';
import { Organic } from '@/typings/searchTypings';

type Props = {
    searchParams: {
        q: string;
    }
};

async function SearchPage({ searchParams }: Props) {
    const q = await searchParams?.q; // ✅ Await before using searchParams (dont use them directly - without the await-)
    // Fetch teh Search Results
    const results = await fetchSearch(q);

    console.log("Product Data:", Product);


    return (
    <div className='p-10'>
        <h1 className='text-3xl font-bold mb-2'>Results for {q}</h1>
            <h2 className='mb-5 text-gray-400'>
                ({results?.content?.page_details?.total_results ?? "No"} results)
            </h2> 

            <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {results?.content?.results && results.content.results.length > 0 ? (
                    results.content.results.map((product: Organic, index) => {

                        return (
                            <li key={product.product_id ?? index}>
                                    <Product product ={product}/>
                            </li>
                        );
                    })
                ) : (
                    <p>No results found.</p>
                )}

         
        </ul>
    </div>
    );
}

export default SearchPage;

// chatgpt solution
// import Product from '@/components/Product';
// import fetchSearch from '@/lib/fetchSearch';
// import { Organic } from '@/typings/searchTypings';

// type Props = {
//     searchParams: Promise<{ q?: string }>; // Ensure searchParams is treated as a Promise
// };

// async function SearchPage({ searchParams }: Props) {
//     // ✅ Await searchParams before using it
//     const params = await searchParams;
//     const q = params?.q;

//     if (!q) {
//         return <p>Error: No search query found.</p>;
//     }

//     // Fetch the Search Results
//     const results = await fetchSearch(q);

//     console.log("Fetched results:", results);

//     return (
//         <div className='p-10'>
//             <h1 className='text-3xl font-bold mb-2'>Results for {q}</h1>
//             <h2 className='mb-5 text-gray-400'>
//                 ({results?.content?.page_details?.total_results ?? "No"} results)
//             </h2> 

//             <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
//                 {results?.content?.results && results.content.results.length > 0 ? (
//                     results.content.results.map((product: Organic, index) => (
//                         <li key={product.product_id ?? index}>
//                             <Product product={product} />
//                         </li>
//                     ))
//                 ) : (
//                     <p>No results found.</p>
//                 )}
//             </ul>
//         </div>
//     );
// }

// export default SearchPage;

