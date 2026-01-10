// import patient1 from "../assets/patient1.png";
// import patient2 from "../assets/patient2.png";
const patient1 = "https://via.placeholder.com/50?text=P1";
const patient2 = "https://via.placeholder.com/50?text=P2";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah J.",
      location: "Bangalore",
      text: "Booking appointments was super easy and quick. Highly recommended for everyone.",
      image: patient1,
      role: "Patient"
    },
    {
      id: 2,
      name: "Mike T.",
      location: "Delhi",
      text: "Medicines arrived on time with proper packaging. Great service overall.",
      image: patient2,
      role: "Patient"
    },
    {
      id: 3,
      name: "Emily R.",
      location: "Mumbai",
      text: "The doctors are very professional and the video consultation was seamless.",
      image: patient1, // Reusing due to quota
      role: "Patient"
    },
    {
      id: 4,
      name: "David K.",
      location: "Chennai",
      text: "I love the convenience of having everything in one app. Very user friendly.",
      image: patient2, // Reusing
      role: "Patient"
    },
    {
      id: 5,
      name: "Priya S.",
      location: "Hyderabad",
      text: "Excellent customer support and fast delivery of medicines.",
      image: patient1,
      role: "Patient"
    }
  ];

  return (
    <div className="testimonials-section">
      <h2 className="testimonials-title">What Our Patients Say</h2>
      <div className="testimonials-scroll">
        {testimonials.map((item) => (
          <div className="testimonial-card" key={item.id}>
            <img className="testimonial-avatar" src={item.image} alt={item.name} />
            <div className="testimonial-content">
              <p className="testimonial-text">"{item.text}"</p>
              <div className="testimonial-user">
                <div>
                  <span className="testimonial-name">{item.name}</span>
                  <span className="testimonial-location">{item.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
