import React, { useState, useEffect } from "react";
import axios from "axios";

const TravelStats = () => {
  const [stats, setStats] = useState({
    trips: 0,
    countriesVisited: 0,
    citiesVisited: 0,
    hoursTraveled: 0,
    avgTripDuration: 0,
  }); // Default state for stats
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const user = localStorage.getItem("user");
  const token = JSON.parse(user).token;

  useEffect(() => {
    const fetchTravelStats = async () => {
      try {
        // Make a GET request to the backend to fetch travel stats
        const response = await axios.get("http://localhost:8000/api/travel-stats", {
          headers: {
            Authorization: `Bearer ${token}`, // Use your authentication token
          },
        });
        const data = response.data;
        console.log(data)

        // Update state with the API data
        setStats({
          trips: data.trips,
          countriesVisited: data.countriesVisited, // Use this for now as countriesVisited
          hoursTraveled: Math.round(data.hoursTraveled), // Rounded for better readability
          avgTripDuration: parseFloat(data.avgTripDuration.toFixed(1)), // Round to one decimal place
        });
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to load travel stats.");
        setLoading(false); // Stop loading on error
      }
    };

    fetchTravelStats();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator
  }

  if (error) {
    return <p>{error}</p>; // Show error message if any
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Travel Stats</h1>

      <div style={styles.statsContainer}>
        <StatCard label="Total Trips" value={stats.trips} icon="🧳" />
        <StatCard label="Countries Visited" value={stats.countriesVisited} icon="🏞️" />
        <StatCard label="Hours Traveled" value={`${stats.hoursTraveled} hrs`} icon="⏳" />
        <StatCard label="Average Trip Duration" value={`${stats.avgTripDuration} days`} icon="📅" />
      </div>

      <button style={styles.viewDetailsButton}>View Detailed Stats</button>
    </div>
  );
};

const StatCard = ({ label, value, icon }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardIcon}>{icon}</div>
      <div style={styles.cardContent}>
        <div style={styles.cardLabel}>{label}</div>
        <div style={styles.cardValue}>{value}</div>
      </div>
    </div>
  );
};

// Inline Styles (same as provided)
const styles = {
  container: {
    padding: "30px",
    maxWidth: "800px",
    margin: "auto",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
    color: "#333",
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    transition: "box-shadow 0.3s",
  },
  cardIcon: {
    fontSize: "32px",
    marginRight: "15px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  cardLabel: {
    fontSize: "16px",
    color: "#555",
    fontWeight: "bold",
  },
  cardValue: {
    fontSize: "20px",
    color: "#333",
  },
  viewDetailsButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginTop: "20px",
  },
};

export default TravelStats;
