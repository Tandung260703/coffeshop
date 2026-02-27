import ProductList from "./components/Product List/ProductList.jsx"

const HomePage=(props)=>{
    return(
        <>
            <ProductList spreadValue={props.spreadValue} />
        </>
    )
}

export default HomePage;
