import { Organic } from "@/typings/searchTypings"
import { Badge } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// function Product({product} : { product: Organic }) {
//   return (
//         <Link
//             href={{
//                 pathname: "/product",
//                 query: { url: product.url },
//             }}
//               className="flex flex-col relative border rounded-md h-full p-5"
//         >
//             <Image
//                 src={product.image}
//                 alt={product.title}
//                 width={200}
//                 height={200}
//                 className="mx-auto"
//             />

//             <p className="text-xl font-bold">
//                 {product.price?.currency}
//                 {product.price.price}
//             </p>

                // {product.badge && (
                //     <Badge className="w-fit absolute top-2 right-2">{product.badge}</Badge>
                // )}

                // <p className="font-light">{product.title}</p>

                // {product.rating.rating}✰
                // <span className="text-gray-400 ml-2">({product.rating.count})</span>
                // </div>
//         </Link>
//     );
// }

// export default Product

function Product({ product }: { product: Organic }) {
    const title = product?.general?.title ?? "Product";
    const image = product?.general?.image ?? ""; // Assuming you want to render an image
    const url = product?.general?.url ?? "";  // Use the URL for the link

    const currency = product?.price?.currency ?? "";
    const priceValue = product?.price?.price ?? "N/A";
    const priceSymbol = currency === "USD" ? "$" : currency;
  
    return (
      <Link
        href={{
          pathname: "/product",
          query: { url: product.url },
        }}

        className="flex flex-col relative rounded-md h-full p-5"
      >
        <div className="product-item text-md">
          <img src={image} width={250} height={250} className="mx-auto" />


          <p className="font-bold text-lg">
          {priceSymbol} {priceValue}
        </p>

 
          <p>{title}</p> {/* You can render other product details here */}

          {product.badge && (
            <Badge className="w-fit absolute top-2 right-2">{product.badge}</Badge>
          )}

          <p className="font-light">{product.title}</p>

          <p className="text-yellow-500">
          {product.rating.rating}✰
          <span className="text-gray-400 ml-2">({product.rating.count})</span>
          </p>
          </div>
      </Link>
    );
  }
  
  export default Product;