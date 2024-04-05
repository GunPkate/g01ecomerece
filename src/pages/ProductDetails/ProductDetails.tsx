// import { Outlet } from "react-router-dom"
import { useParams } from "react-router-dom"
import Footer from "../../components/Footer"
import Navbar from "../../components/Navbar"
import productByPermarlink from '../../skuData/productByPermarlink.json'

export default function ProductDetails(){
    
    const contentBodyStyle = 'min-h-[90vh]'
    const {permalink} = useParams();
    // console.log(permalink)
    let dataDisplay = productByPermarlink.filter(x=>x.permalink==permalink)
    console.log(dataDisplay)

    return (<>
    <Navbar/>
        <div  className={ contentBodyStyle }>

        <div className="mx-[160px] mt-[160px] lg:flex justify-between">
            <div>123</div>
            <div>{dataDisplay.length > 0 ? dataDisplay.map(x=> <>
                    <div>{x.name}</div> 
                    <div>{x.description}</div> 
                    <div>{x.price}</div> 
                    <div>{x.promotionalPrice}</div> 
                    <div className="flex">
                    {[...Array(Math.ceil(x.ratings))].map((index)=> 
                        <span key={index}>
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.5 7L11.5 1L7.71839 7L1 8.5L5 13V20.5L11 18L17.5 20L17 13.5L21.5 8.5L14.5 7Z" fill="#DEF81C"/>
                        <path d="M11.1426 1.70897C11.1554 1.70897 11.1639 1.71324 11.1682 1.72606L13.2616 5.97284C13.7658 6.98968 14.7356 7.69463 15.8593 7.86121L20.5589 8.54481C20.5675 8.55335 20.576 8.57471 20.5632 8.59608L17.1709 11.9029C16.3592 12.6933 15.9875 13.8383 16.1797 14.9534L16.9829 19.636C16.9787 19.6445 16.9659 19.6574 16.9445 19.6574C16.9402 19.6574 16.9359 19.6574 16.9317 19.6574L12.7404 17.4528C12.2491 17.1922 11.6937 17.0555 11.134 17.0555C10.5786 17.0555 10.0232 17.1922 9.52757 17.4528L5.33207 19.6531C5.32352 19.6531 5.30216 19.636 5.30216 19.6146L6.10111 14.9492C6.29337 13.8298 5.92167 12.6891 5.1099 11.8987L1.70906 8.58326C1.70906 8.57471 1.71333 8.54908 1.73897 8.54053L6.42582 7.86121C7.54943 7.6989 8.51927 6.99395 9.02342 5.97284L11.1255 1.71324C11.1212 1.71324 11.1297 1.70897 11.1426 1.70897ZM11.1426 0C10.523 0 9.90354 0.324703 9.58311 0.969837L7.48965 5.21661C7.23758 5.72931 6.74625 6.08392 6.17801 6.16937L1.49117 6.84869C0.0641843 7.05804 -0.504047 8.8097 0.525602 9.81372L3.9179 13.1206C4.32804 13.5222 4.51603 14.0947 4.41777 14.6586L3.61883 19.3241C3.42657 20.4478 4.3195 21.3621 5.33207 21.3621C5.60123 21.3621 5.87467 21.298 6.14383 21.157L10.3351 18.9524C10.5871 18.82 10.8648 18.7516 11.1426 18.7516C11.4203 18.7516 11.698 18.82 11.95 18.9524L16.1413 21.157C16.4062 21.298 16.6839 21.3621 16.953 21.3621C17.9656 21.3621 18.8585 20.4478 18.6662 19.3241L17.8673 14.6586C17.7691 14.0947 17.957 13.5179 18.3672 13.1206L21.7595 9.81372C22.7934 8.80542 22.2209 7.05376 20.7939 6.84869L16.1071 6.16937C15.5389 6.08819 15.0518 5.72931 14.7955 5.21661L12.702 0.969837C12.3816 0.324703 11.7621 0 11.1426 0Z" fill="#DEF81C"/>
                        </svg> &nbsp; 
                        </span> 
                 
                        ) 
                    }
                    </div>
                </>
                )
                : 
                <></>}
            </div>
        </div>
        {/* <Outlet/> */}
    </div>
    <Footer/>
    </>)
}