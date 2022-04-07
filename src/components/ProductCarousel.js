import { Carousel } from "react-bootstrap"


export default function ProductCarousel () {

    return(
        <div className="col-12">
            <div className="text-center text-light my-5">
                <h2><strong>Featured Items</strong></h2>
            </div>
            <div className="d-flex justify-content-center text-center mt-5">
                <Carousel fade id="carousel" controls={false} interval={1200} indicators={false}>
                <Carousel.Item>
                    <img className="product" alt="QDZ Neptune" src={require('./../img/624272fd181b0d8a17962dc5.jpg')}/>
                    <div className="mt-5">
                    <Carousel.Caption>
                    <h3 className="text-dark">QDZ Neptune</h3>
                    <p className="text-dark">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="product" alt="KZ AST" src={require('./../img/6242a9ef97c3e94b8ea5c8d1.jpg')}/>
                    <div className="mt-5">
                    <Carousel.Caption>
                    <h3 className="text-dark">KZ AST</h3>
                    <p className="text-dark">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="product" alt="TFZ T2" src={require('./../img/624272d6181b0d8a17962dc2.jpg')}/>
                    <div className="mt-5">
                    <Carousel.Caption>
                    <h3 className="text-dark">TFZ T2</h3>
                    <p className="text-dark">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="product" alt="Major 3" src={require('./../img/62427370181b0d8a17962dc8.jpg')}/>
                    <div className="mt-5">
                    <Carousel.Caption>
                    <h3 className="text-dark">Marshall Major III</h3>
                    <p className="text-dark">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="product" alt="Sony WH"src={require('./../img/62427394181b0d8a17962dca.jpg')}/>
                    <div className="mt-5">
                    <Carousel.Caption>
                    <h3 className="text-dark">Sony WH-1000XM4</h3>
                    <p className="text-dark">Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                    </div>
                </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}