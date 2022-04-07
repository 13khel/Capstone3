import { Fragment } from 'react';
import { Link } from 'react-router-dom';



export default function Footer(){
    return (
        <Fragment>
            <footer className="pt-3 m-0 p-0" id="footer">
                <div className="container-fluid text-center">
                    <div className="row">
                        <div className="col-4 m-0 p-0">
                            <img id='footerLogo' alt="footerlogo" className='m-0 p-0'
                            src={require('./../img/Turntablist.png')}/>
                            <p className="text-uppercase text-light m-0"><strong>DEEP BEAT AUDIO</strong></p>
                            <p className="text-light m-0">Affordable Quality Music for all</p>
                        </div>

                        <div className='col-4 m-0 p-0'>
                            <h5 className="text-uppercase text-light"><strong>CONTACT US</strong></h5>
                            <ul className="list-unstyled">
                                <li><p className="text-light m-0 p-0">145-B P. Santiago St. Paso de Blas, Valenzuela City</p></li>
                                <li><p className="text-light m-0 p-0">Metro Manila, 1440, Philippines</p></li>
                                <li><p className="text-light m-0 p-0">khel.bermal@gmail.com / +639088912250</p></li>
                            </ul>
                        </div>

                        <div className="col-md-3 m-0 p-0">
                            <h5 className="text-light text-center"><strong>SOCIAL MEDIA</strong></h5>
                            <ul className="list-unstyled d-flex justify-content-center align-items-center">
                                <li>
                                    <Link to='/'>                                    
                                    <img id='footerIcon' alt="footerIcon" className='mx-3 mt-2 p-0'
                                    src={require('./../img/fb.png')}/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/'>                                    
                                    <img id='footerIcon' alt="footerIcon" className='mx-3 mt-2 p-0'
                                    src={require('./../img/ig.png')}/>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/'>                                    
                                    <img id='footerIcon' alt="footerIcon" className='mx-3 mt-2 p-0'
                                    src={require('./../img/twitter.png')}/>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright text-center text-light m-0 p-0 pb-2">
                    <strong>DEEP BEAT AUDIO &#169; 2022</strong>
                </div>

            </footer>
            </Fragment>
)}