"use client"
import React, { useState, useEffect } from "react"
import styles from "./page.module.css"

export default function Home(){
  const [weatherData, setWeatherData] = useState(null)
  const [city, setCity] = useState("berlin")

  async function fetchData(cityName) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/weather?address=" + cityName
      );
      const jsonData = (await response.json()).data
      setWeatherData(jsonData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <main className={styles.main}>
      <article className={styles.widget}>
        <form
          className={styles.weatherLocation}
          onSubmit={(e) => {
            e.preventDefault()
            fetchData(city)
          }}
        >
          <input
            className={styles.input_field}
            placeholder="Stadt eingeben"
            type="text"
            id="cityName"
            name="cityName"
            onChange={(e) => setCity(e.target.value)}
          />
          <button className={styles.search_button} type="submit">
            Suchen
          </button>
        </form>
        {weatherData && weatherData.weather && weatherData.weather[0] ? (
          <>
            <div className={styles.icon_and_weatherInfo}>
              <div className={styles.weatherIcon}>
                <i className="wi wi-day-cloudy"></i>
              </div>
              <div className={styles.weatherInfo}>
                <div className={styles.temperature}>
                  <span>
                    {(weatherData?.main?.temp - 273.5).toFixed(0) +
                      String.fromCharCode(176)}
                  </span>
                </div>
                <div className={styles.weatherCondition}>
                  {weatherData?.weather[0]?.description?.toUpperCase()}
                </div>
                <div className={styles.weatherCondition}>
                  {weatherData?.main["humidity"]}% Luftfeuchtigkeit
                </div>
              </div>
            </div>
            <div className={styles.place}>{weatherData?.name}</div>
          </>
        ) : (
          <div className={styles.place}>Keine Stadt eingegeben...</div>
        )}
      </article>
    </main>
  )
}