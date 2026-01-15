import user1 from "../assets/User Icon (1).png";
import user2 from "../assets/User Icon (2).png";
import user3 from "../assets/User Icon (3).png";
import user4 from "../assets/User Icon (4).png";
import user5 from "../assets/User Icon (5).png";
import user6 from "../assets/User Icon (6).png";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Aditya Kashyap",
      location: "Kolkata",
      text: "Medico made booking a doctor extremely easy. I found a good cardiologist within minutes and the appointment was confirmed instantly. Very smooth experience.",
      image: user1,
      role: "Patient"
    },
    {
      id: 2,
      name: "Sonakshi Bose",
      location: "Delhi",
      text: "Medicines arrived on time with proper packaging. Great service overall.",
      image: user2,
      role: "Patient"
    },
    {
      id: 3,
      name: "Mihir Virani",
      location: "Mumbai",
      text: "Medico feels like a complete healthcare solution. Booking, consultation, and medicines everything works smoothly.",
      image: user3,
      role: "Patient"
    },
    {
      id: 4,
      name: "Sameer Maheshwari",
      location: "Chennai",
      text: "I love the convenience of having everything in one app. Very user friendly.",
      image: user4,
      role: "Patient"
    },
    {
      id: 5,
      name: "Naina Aggarwal",
      location: "Ahmedabad",
      text: "Excellent customer support and fast delivery of medicines.",
      image: user5,
      role: "Patient"
    },
    {
      id: 6,
      name: "Arushi Jha",
      location: "Mumbai",
      text: "Very helpful app for busy people. I like how appointment history and medicine orders are managed in one place.",
      image: user6,
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
