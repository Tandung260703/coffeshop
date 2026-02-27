import "./ProductItems.css";
import {useNavigate } from "react-router-dom";

const ProductItems = (props) => {
  const { product } = props;
  const navigate=useNavigate()
  // console.log(product)
  const productBuy = (Info) => {
    // console.log(props.infoProduct);
    // console.log(Info)
    props.setInfoProduct((prev) => {
      // console.log(prev)
      const existingProductIndex = prev.findIndex(
        (item) => item.name === Info.name
      );
      if (existingProductIndex == -1) {
        const newProduct = {id:Info.id,information:Info.information, name: Info.name, price: Info.price, quantity: 1 ,avatar:Info.avatar};
        // console.log("false");
        return [...prev, newProduct];
      } else {
        const updatedProducts = prev.map((item) => {
          if (item.name === Info.name) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return updatedProducts;
      }
    });
  };
  return (
    <>
      {product.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul className="Item">
            <li>
              <img className="imgItem" src={product.avatar} />
            </li>
            <li>{product.name}</li>
            <li>Price:{product.price}$</li>
            <li>{product.information}</li>
            <button
              onClick={() => {
                productBuy(product);
              }}
            >
              Buy
            </button>
              <button
                onClick={() => {
                  props.spreadValue(product);navigate("/product-info")
                }}
              >
                Details
              </button>
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductItems;
