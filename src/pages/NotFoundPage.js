import Banner from "../components/Banner";
import { Fragment } from "react";


export default function NotFoundPage(){

    let bannerData = 
    {
        title: "Page not found",
        text: "Go back to the",
        button: ""
        
    }
    return(
        <Fragment>
            <Banner bannerProp={bannerData}></Banner>
            <div id="landingbg" />
        </Fragment>
    )
}