import React from "react";
import Slider from "react-slick";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      right: -20,
      top: "40%",
      zIndex: 1,
      cursor: "pointer",
      background: "#7E69AB",
      borderRadius: "50%",
      width: 40,
      height: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontSize: 24,
      boxShadow: "0 2px 10px rgba(126,105,171,0.7)",
    }}
  >
    <ArrowRight size={20} />
  </div>
);

// Custom Previous Arrow
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute",
      left: -20,
      top: "40%",
      zIndex: 1,
      cursor: "pointer",
      background: "#7E69AB",
      borderRadius: "50%",
      width: 40,
      height: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontSize: 24,
      boxShadow: "0 2px 10px rgba(126,105,171,0.7)",
    }}
  >
    <ArrowLeft size={20} />
  </div>
);

const colleges = [
  {
    name: "IIT Madras",
    location: "Chennai, Tamil Nadu",
    course: "BE/B.Tech",
    fees: "2.42 Lacs",
    rating: "4.3/5",
    reviews: 376,
    link: "https://www.iitm.ac.in/",
    image: "https://upload.wikimedia.org/wikipedia/en/2/29/IIT_Madras_Logo.svg"
  },
  {
    name: "IIMA",
    location: "Ahmedabad, Gujarat",
    course: "MBA/PGDM",
    fees: "25.00 Lacs",
    rating: "4.5/5",
    reviews: 51,
    link: "https://www.iima.ac.in/",
    image: "https://upload.wikimedia.org/wikipedia/en/6/65/IIM_Ahmedabad_Logo.svg"
  },
  {
    name: "Chandigarh University",
    location: "Chandigarh",
    course: "BE/B.Tech",
    fees: "2.10 Lacs",
    rating: "4.4/5",
    reviews: 3383,
    link: "https://www.cuchd.in/",
    image: "https://upload.wikimedia.org/wikipedia/en/2/27/Chandigarh_University_Logo.png"
  },
  {
    name: "SP Jain",
    location: "Mumbai, Maharashtra",
    course: "MBA/PGDM",
    fees: "22.50 Lacs",
    rating: "4.2/5",
    reviews: 43,
    link: "https://www.spjimr.org/",
    image: "https://upload.wikimedia.org/wikipedia/en/4/47/SPJIMR_Logo.png"
  }
];

const TopUniversitiesSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    fade: true,
    swipeToSlide: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <section
      style={{
        padding: "4rem 2rem",
        backgroundColor: "#f4f6fb",
        width: "100%",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
          color: "#3e3e66",
          fontWeight: "700",
          fontSize: "2.8rem",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          letterSpacing: "1.2px",
        }}
      >
        Top Universities
      </h2>
      <div
        style={{ maxWidth: "1300px", margin: "0 auto", position: "relative" }}
      >
        <Slider {...settings}>
          {colleges.map((college, index) => (
            <div key={index} style={{ padding: "0 15px", outline: "none" }}>
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 10px 25px rgba(126, 105, 171, 0.25)",
                  padding: "1.5rem",
                  minHeight: "360px",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 35px rgba(126, 105, 171, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(126, 105, 171, 0.25)";
                }}
              >
                <img
                  src={college.image}
                  alt={college.name}
                  style={{
                    borderRadius: "12px",
                    width: "100%",
                    height: "180px",
                    objectFit: "contain",
                    marginBottom: "1rem",
                    userSelect: "none",
                  }}
                />
                <h3
                  style={{
                    color: "#4a3c9e",
                    fontWeight: "700",
                    fontSize: "1.4rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  {college.name}
                </h3>
                <h5
                  style={{
                    color: "#a59bd6",
                    fontWeight: "600",
                    marginBottom: "0.6rem",
                    fontSize: "1rem",
                    fontStyle: "italic",
                  }}
                >
                  {college.location}
                </h5>
                <p
                  style={{
                    color: "#555770",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  🎓 <b>Course:</b> {college.course}
                </p>
                <p
                  style={{
                    color: "#555770",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  💰 <b>Fees:</b> ₹{college.fees}
                </p>
                <p
                  style={{
                    color: "#555770",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  ⭐ <b>Rating:</b> {college.rating} ({college.reviews} reviews)
                </p>
                <a
                  href={college.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "1rem",
                    display: "inline-block",
                    backgroundColor: "#7E69AB",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TopUniversitiesSlider;
