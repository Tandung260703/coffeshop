import ProductItems from "./Product Items/ProductItems.jsx";
import "./ProductList.css";
// import {useState} from 'react';
import {useContext} from 'react';
import {varContext} from '../../App.jsx' 

// import PropTypes from 'prop-types'
// import Cart from "../Cart/Cart.jsx"
const ProductList=(props)=>{
    const value=useContext(varContext)
    const {infoProduct,setInfoProduct,dataCoffe,storage,loading}=value
    return(
        <>
          <h1>Coffee Products</h1>
          {loading===true?(storage.length!=0?<div className="Products-wrapper">
            {storage.map((product,index)=>( <ProductItems
                key={index}
                product={product}
                infoProduct={infoProduct}
                setInfoProduct={setInfoProduct}
                spreadValue={props.spreadValue}
            />))}
        </div>
        :
        <div className="Products-wrapper">
            {dataCoffe.map((product,index)=>( <ProductItems
                key={index}
                product={product}
                infoProduct={infoProduct}
                setInfoProduct={setInfoProduct}
                spreadValue={props.spreadValue}
            />))}
        </div>):(<h1>Loading...</h1>)}
        </>
    )
}
// ProductList.proptypes={
//     products: PropTypes.arrayOf(PropTypes.object).isRequired
// }

export default ProductList;
