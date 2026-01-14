import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DoctorProfile.css";

const DoctorProfile = () => {
    const { docId } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const [bookedSlots, setBookedSlots] = useState([]);

    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    useEffect(() => {
        const fetchDoctorAndSlots = async () => {
            try {
                const [docRes, slotsRes] = await Promise.all([
                    axios.get(`http://localhost:5001/api/doctors/${docId}`),
                    axios.get(`http://localhost:5001/api/appointments/doctor/${docId}`)
                ]);
                
                setDoctor(docRes.data);
                setBookedSlots(slotsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctorAndSlots();
    }, [docId]);

    // Generate slots
    useEffect(() => {
        if (!doctor) return;

        let today = new Date();
        let allSlots = [];
        
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);
            
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0); 
            
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
                // Use a standard date format for comparison (e.g., DD_MM_YYYY or simplified string)
                // For this implementation, we'll use `toDateString()` which returns "Wed Jan 15 2026"
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                });
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
            
            allSlots.push(timeSlots);
        }
        setDocSlots(allSlots);
    }, [doctor]);

    const bookAppointment = async () => {
        if (!slotTime) {
            alert("Please select a time slot");
            return;
        }

        const date = docSlots[slotIndex][0].datetime.getDate();
        const month = docSlots[slotIndex][0].datetime.getMonth() + 1;
        const year = docSlots[slotIndex][0].datetime.getFullYear();
        
        const slotDate = `${date}_${month}_${year}`; 

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to book appointment");
                navigate('/login');
                return;
            }

            const res = await axios.post(
                "http://localhost:5001/api/appointments",
                {
                    doctorId: docId,
                    date: slotDate,
                    time: slotTime
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.appointment) {
                alert("Appointment booked successfully!");
                // Refresh booked slots
                const updatedSlots = await axios.get(`http://localhost:5001/api/appointments/doctor/${docId}`);
                setBookedSlots(updatedSlots.data);
                setSlotTime(''); // Reset selection
            }

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Booking failed");
        }
    };

    const isSlotBooked = (dateObj, time) => {
        const date = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        const slotDate = `${date}_${month}_${year}`;
        
        return bookedSlots.some(slot => slot.date === slotDate && slot.time === time);
    };

    if (loading) return <div className="loading-text">Loading...</div>;
    if (!doctor) return <div className="loading-text">Doctor not found</div>;

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
                            of professional experience. Committed to providing comprehensive professional medical care, {doctor.name.split(' ')[0]} focuses 
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
                    {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => {
                        const booked = isSlotBooked(item.datetime, item.time);
                        return (
                            <p 
                                className={`time-slot ${item.time === slotTime ? 'active' : ''} ${booked ? 'booked' : ''}`} 
                                key={index}
                                onClick={() => !booked && setSlotTime(item.time)}
                                style={booked ? { backgroundColor: '#e0e0e0', color: '#a0a0a0', cursor: 'not-allowed', borderColor: '#d0d0d0' } : {}}
                                title={booked ? "Slot already booked" : ""}
                            >
                                {item.time.toLowerCase()}
                            </p>
                        )
                    })}
                </div>
                
                <button className="book-appointment-btn" onClick={bookAppointment}>
                    Book an appointment
                </button>
            </div>
        </div>
    );
};

export default DoctorProfile;
