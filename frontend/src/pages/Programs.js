import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom arrows
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
    &#8250;
  </div>
);

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
    &#8249;
  </div>
);

const programsData = [
  {
    title: "Engineering",
    subtitle: "6233 Colleges",
    description: "BE/B.Tech, Diploma in Engineering, ME/M.Tech",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Management",
    subtitle: "7677 Colleges",
    description: "MBA/PGDM, BBA/BMS, Executive MBA",
    image:
      "https://images.unsplash.com/photo-1542223616-4485b1762301?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Commerce",
    subtitle: "4934 Colleges",
    description: "B.Com, M.Com",
    image:
      "https://images.unsplash.com/photo-1556741533-f6acd6474f45?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Arts",
    subtitle: "5554 Colleges",
    description: "BA, MA, BFA, BSW",
    image:
      "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Science",
    subtitle: "3829 Colleges",
    description: "B.Sc, M.Sc, Ph.D.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Law",
    subtitle: "2894 Colleges",
    description: "LLB, LLM, Diploma in Law",
    image:
      "https://images.unsplash.com/photo-1532619675605-cdd1c8b49a3a?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Medicine",
    subtitle: "1287 Colleges",
    description: "MBBS, BDS, MD",
    image:
      "https://images.unsplash.com/photo-1588776814546-59243f4634de?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Architecture",
    subtitle: "1120 Colleges",
    description: "B.Arch, M.Arch, Ph.D. in Architecture",
    image:
      "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Education",
    subtitle: "2350 Colleges",
    description: "B.Ed, M.Ed, Ph.D. in Education",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Design",
    subtitle: "900 Colleges",
    description: "B.Des, M.Des, Diploma in Design",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60",
  },
];

const Programs = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
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
        Explore Programs
      </h2>
      <div
        style={{ maxWidth: "1300px", margin: "0 auto", position: "relative" }}
      >
        <Slider {...settings}>
          {programsData.map((program, index) => (
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
                  src={program.image}
                  alt={program.title}
                  style={{
                    borderRadius: "12px",
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
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
                  {program.title}
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
                  {program.subtitle}
                </h5>
                <p
                  style={{
                    color: "#555770",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  {program.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Programs;
