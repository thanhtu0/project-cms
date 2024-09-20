import Button from '~/components/Button';
import './RouteOne.scss';
import { route_1, route_2, route_3, route_4, route_5 } from '~/utils/images';
import { Description, Label, TitleSubtitle } from '~/components';

const images = [
    { src: route_1, alt: 'Skateboard 1', className: 'img-1', left: 484 },
    { src: route_2, alt: 'Skateboard 2', className: 'img-2', left: 624 },
    { src: route_3, alt: 'Skateboard 3', className: 'img-3', left: 764 },
    { src: route_4, alt: 'Skateboard 4', className: 'img-4', left: 904 },
    { src: route_5, alt: 'Skateboard 5', className: 'img-5', left: 1044 },
];

const RouteOne = () => {
    return (
        <div className="route_one flex flex-between position-relative mw-144 px-13">
            <div className="route_one__content">
                <Label text="New Season" className="text-black position-relative label" />
                <TitleSubtitle
                    title="Route One O.B."
                    subtitle="Latest Graphics"
                    titleClassName="text-black"
                    subtitleClassName="text-black mt-8"
                />
                <Description
                    text="Route One O.B. is our in-house brand; helping our favorite finds to become your most loved wardrobe
                    staples."
                />
                <Button to={'route-one'} fill>
                    Discover
                </Button>
            </div>
            <div className="route_one__image">
                {images.map((image, index) => (
                    <img
                        key={index}
                        className="position-absolute top-0"
                        src={image.src}
                        alt={image.alt}
                        style={{ left: `${image.left}px` }}
                    />
                ))}
            </div>
        </div>
    );
};

export default RouteOne;
