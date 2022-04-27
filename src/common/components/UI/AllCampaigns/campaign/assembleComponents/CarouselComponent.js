import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const CarouselComponent = ({ images, uid, ytLink }) => {
  const updateLink = (ytLink) => {
    
      const newLink = ytLink.replace("watch?v=", "embed/");
      return newLink;
  
  };
  return (
    <>
      <Carousel showThumbs={false} swipeable={true} emulateTouch={true}>
        {images
          ? images.map((image) => (
              <div key={`/projectAssets/${uid}/${image}`}>
                <img
                  src={image}
                  className="rounded"
                  height="450"
                  width="900"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))
          : ""}
        {ytLink ? (
          <>
            <div key={`/projectAssets/${uid}/${ytLink}`}>
              <iframe
                width="800"
                height="400"
                src={updateLink(ytLink)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </>
        ) : (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center fw-bold">
            <h3>No Video Available!!!</h3>
          </div>
        )}
      </Carousel>
    </>
  );
};

export default CarouselComponent;
