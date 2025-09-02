import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/styles/BatteryInfo.css';
import { IoMdBatteryCharging } from 'react-icons/io';
import { BsBatteryCharging } from 'react-icons/bs';
import { MdOutlineManageHistory, MdEarbudsBattery } from 'react-icons/md';
import { VscRemote } from 'react-icons/vsc';
import Navbar from '../navbar/Navbar';
import Footer from '../navbar/Footer';
import gsap from 'gsap';
import batteryVideo from '../assets/battery.mp4';

const BatteryInfo = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const batteryInfoRef = useRef(null);
  const sectionsRef = useRef([]);
  const [isBatteryVisible, setBatteryVisible] = useState(false);

  useEffect(() => {
  const authToken = sessionStorage.getItem('authToken');
  const userId = sessionStorage.getItem('userId');

  if (!authToken) {
    navigate('/login');
    return;
  }

  // ✅ Print userId to console
  if (userId) {
    console.log("Logged-in User ID:", userId);
  }

  // Animate hero video
  gsap.from(videoRef.current, {
    opacity: 0,
    duration: 1.5,
    ease: 'power2.out',
  });

  gsap.from(".hero-content", {
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: "power2.out",
  });

  // Scroll observer for feature cards
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setBatteryVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );

  if (batteryInfoRef.current) {
    observer.observe(batteryInfoRef.current);
  }
}, [navigate]);

  // Trigger card animations based on scroll position
  useEffect(() => {
    if (isBatteryVisible) {
      gsap.to(sectionsRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }
  }, [isBatteryVisible]);

  const features = [
    {
      to: '/functions/RtbatteryMonitoring',
      icon: <IoMdBatteryCharging className="icon" />,
      title: 'Real-Time Battery Monitoring',
    },
    {
      to: '/functions/BatteryCharge',
      icon: <BsBatteryCharging className="icon" />,
      title: 'Charging Status',
    },
    {
      to: '/functions/HistoricalDataLogs',
      icon: <MdOutlineManageHistory className="icon" />,
      title: 'Historical Data & Logging',
    },
    {
      to: '/functions/BatteryBalance',
      icon: <MdEarbudsBattery className="icon" />,
      title: 'Battery Balancing Control',
    },
    {
      to: '/functions/ConfigureSetting',
      icon: <VscRemote className="icon" />,
      title: 'Warranty Claim',
    },
  ];

  return (
    <>
      <Navbar />
      <section className="hero-section">
        <video autoPlay muted loop ref={videoRef}>
          <source src={batteryVideo} type="video/mp4" />
        </video>
        <div className="hero-content">
          <p>Scroll down to explore features</p>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`battery-info ${isBatteryVisible ? 'visible' : ''}`}
        ref={batteryInfoRef}
      >
        {features.map((item, index) => (
          <div
            className="card"
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
          >
            <Link to={item.to} className="link">
              {item.icon}
              <h3>{item.title}</h3>
            </Link>
          </div>
        ))}
      </section>

      <div className="scroll-indicator">
        <p>⬇️ Scroll for more</p>
      </div>
      <Footer />
    </>
  );
};

export default BatteryInfo;
