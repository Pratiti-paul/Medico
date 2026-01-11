import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DoctorProfile.css";
// import verifiedIcon from "../assets/verified_icon.svg"; 
// import infoIcon from "../assets/info_icon.svg"; 

const DoctorProfile = () => {
    const { docId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/api/doctors/${docId}`);
                setDoctor(res.data);
            } catch (error) {
                console.error("Error fetching doctor:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctor();
        
        // Generate booking slots (placeholder logic)
        // We'll generate next 7 days
        let today = new Date();
        let allSlots = [];
        
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0); // 9 PM
            
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0); 
            }
            
            let timeSlots = [];
            while(currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                });
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            
            allSlots.push(timeSlots);
        }
        setDocSlots(allSlots);
        
    }, [docId]);

    if (loading) return <div className="loading-text">Loading...</div>;
    if (!doctor) return <div className="loading-text">Doctor not found</div>;

    // Use placeholder verified icon for now
    const verifiedIconObj = "https://via.placeholder.com/20/0000FF/808080?text=V"

    return (
        <div className="doctor-profile-container">
            {/* Top Detail Card */}
            <div className="doctor-detail-card">
                <div className="detail-image-box">
                    <img src={doctor.image} alt={doctor.name} className="detail-image" />
                </div>
                
                <div className="detail-info-box">
                    <h1 className="detail-name">
                        {doctor.name} 
                        <img src={verifiedIconObj} alt="verified" className="verified-badge-img" title="Verified" />
                    </h1>
                    
                    <div className="detail-qualification">
                        <span>MBBS - {doctor.specialization}</span>
                        <span className="experience-pill">{doctor.experience} Years</span>
                    </div>
                    
                    <div className="detail-about">
                        <h3>About <span className="info-icon">ℹ️</span></h3>
                        <p className="about-text">
                            {doctor.name} is a dedicated {doctor.specialization.toLowerCase()} with over {doctor.experience} years 
                            of professional experience. Committed to providing comprehensive medical care, {doctor.name.split(' ')[0]} focuses 
                            on preventative strategies and accurate diagnoses to ensure the best patient outcomes.
                        </p>
                    </div>
                    
                    <div className="detail-fee">
                        <p>Appointment fee: <span>₹{doctor.consultationFee}</span></p>
                    </div>
                </div>
            </div>
            
            {/* Booking Slots Section */}
            <div className="booking-slots-section">
                <h3>Booking slots</h3>
                
                <div className="slots-days">
                    {docSlots.length > 0 && docSlots.map((item, index) => (
                        <div 
                            key={index} 
                            className={`day-slot ${slotIndex === index ? 'active' : ''}`}
                            onClick={() => setSlotIndex(index)}
                        >
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>
                
                <div className="slots-times">
                    {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                        <p 
                            className={`time-slot ${item.time === slotTime ? 'active' : ''}`} 
                            key={index}
                            onClick={() => setSlotTime(item.time)}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>
                
                <button className="book-appointment-btn">
                    Book an appointment
                </button>
            </div>
            
             {/* Related Doctors (Optional/Placeholder) */}
             {/* Could reuse TopDoctors component or filtered list here */}
        </div>
    );
};

export default DoctorProfile;
