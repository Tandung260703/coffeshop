import {Link}  from "react-router-dom"
import "./CartRender.css"
import {varContext} from "../../../App.jsx"
import {useContext} from "react"

const CartRender=(props)=>{
    const {infoProduct,setInfoProduct}=useContext(varContext)
    // console.log(infoProduct)
    const{infoPD}=props
    let sum=0;
    const Total=(Info)=>{
        sum+=parseFloat(Info.price)*Info.quantity
    }
    const solveDetail=(info)=>{
        if(infoPD.length>1){
            infoPD.length=0
        }
        infoPD.push(info)
    }
    // console.log(productInCart)
    let position=1
    const deleProduct=(position)=>{
        for(let i=0;i<infoProduct.length;i++){
            if(infoProduct[i].id==position){
                infoProduct.splice(i,1);
                position=i
                setInfoProduct([...infoProduct])
            }else{
                continue;
            }
        }
    }
    return(
        <div id="cartRenderContainer">  
            <div className="btnBack">
                <Link to='/back'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z"/></svg></Link>
            </div>
            <h1>Your Cart</h1>
                <ul  className="cardContainer">
                    {infoProduct.length==0?null:infoProduct.map((product,index)=>(
                        <li key={index}  className="infoCard">{position++} {product.name} {product.price} $ {Total(product)} Qty:{product.quantity} 
                        <button className="btnDele" onClick={()=>{deleProduct(product.id)}} >Delete</button>
                        <Link to="/product-info"><p onClick={solveDetail(product)}>Detail</p></Link>
                        </li>
                    ))}
                </ul>

                <h3>ToTal: {Math.round(sum*100)/100} $</h3>
        </div>
    )
}

export default CartRender;

