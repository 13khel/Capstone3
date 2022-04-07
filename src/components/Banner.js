import { Link } from "react-router-dom"
export default function Banner({bannerProp}) {

    const {title, text, button} = bannerProp

    if (button !== ""){
        return(
            <div className="jumbotron jumbotron-fluid m-2">
                <div className="container">
                    <h1 className="display-5">{title}</h1>
                    <p className="lead">{text}</p>
                    <a className="btn btn-info" href="/">{button}</a>
                </div>
            </div>

        )
    }else{
        return(
            <div className="jumbotron jumbotron-fluid m-2">
                <div className="container">
                    <h1 className="display-5 text-light">{title}</h1>
                <div className="d-flex m-2 align-items-center">
                    <p className="lead mx-2 mt-3 text-light">{text}</p><Link to='/'>homepage</Link>
                </div>
                </div>
            </div>
        )
    }
}