import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

function Home() {
    return (
        <Carousel>
            <Carousel.Item >
            <img
                className="d-block w-100 hero"
                src="https://images.unsplash.com/photo-1553289038-6638b1a1802a"
                alt="First slide"
            />
            </Carousel.Item>
            <Carousel.Item >
            <img
                className="d-block w-100 hero"
                src="https://images.unsplash.com/photo-1553615738-d8e0829f1d61"
                alt="Second slide"
            />
            </Carousel.Item>
            <Carousel.Item >
            <img
                className="d-block w-100 hero"
                src="https://images.unsplash.com/photo-1553696590-4b3f68898333"
                alt="Third slide"
            />
            </Carousel.Item>
        </Carousel>
    )
}

export default Home;