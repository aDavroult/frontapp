import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import photo1 from '../../images/hotel5.jpg'
import photo2 from '../../images/hotel10.jpg'
import photo3 from '../../images/hotel2.jpg'
import photo4 from '../../images/hotel3.jpg'
import photo5 from '../../images/hotel7.jpg'

function Home() {
    return (
        <Carousel>
        
            <Carousel.Item >
            <img
                className="d-block w-100 hero"
                src={photo4}
                alt="First slide"
            />
            </Carousel.Item>
            <Carousel.Item >
            <img
                className="d-block w-100 hero"
                src={photo2}
                alt="Second slide"
            />
            </Carousel.Item>
            <Carousel.Item >
            <img
                className="d-block w-100 hero"
                src={photo3}
                alt="Third slide"
            />
            </Carousel.Item>
            <Carousel.Item >
            <img
                className="d-block w-100 hero"
                src={photo1}
                alt="Fourd slide"
/>
            </Carousel.Item>
            <Carousel.Item >
            <img
                className="d-block w-100 hero"
                src={photo5}
                alt="Fourd slide"
            />
            </Carousel.Item>
        </Carousel>
    )
}

export default Home;