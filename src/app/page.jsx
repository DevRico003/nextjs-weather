"use client"
import React, { useState, useEffect } from "react"
import styles from "./page.module.css"

export default function Home(){
  // Hier definieren wir einen Zustand namens "weatherData" und eine zugehörige Setzer-Funktion.
  // Dieser Zustand speichert die Wetterdaten, die wir von unserer API abrufen.
  const [weatherData, setWeatherData] = useState(null)
  
  // Ein weiterer Zustand namens "city" und seine Setzer-Funktion. 
  // Er speichert den Namen der Stadt, die der Benutzer eingeben wird.
  const [city, setCity] = useState("berlin")

  // Eine asynchrone Funktion "fetchData", die die Wetterdaten für eine bestimmte Stadt von einer API abruft.
  async function fetchData(cityName) {
    try {
      // Wir machen einen asynchronen Fetch-Request an unsere API.
      const response = await fetch(
        "https://main.d384k0t4p433to.amplifyapp.com/api/weather?address=" + cityName
      )
      // Wir warten darauf, dass die Antwort in ein JSON-Objekt umgewandelt wird 
      // und extrahieren die "data"-Eigenschaft daraus.
      const jsonData = (await response.json()).data
      
      // Wir aktualisieren unseren "weatherData"-Zustand mit den abgerufenen Daten.
      setWeatherData(jsonData)
    } catch (error) {
      // Bei einem Fehler beim Abrufen der Daten wird dieser im Konsolenprotokoll angezeigt.
      console.error("Error fetching data:", error)
    }
  }

  return (
    <main className={styles.main}>
    <article className={styles.widget}>
      <form
        className={styles.weatherLocation}
        // Wenn das Formular gesendet wird, verhindern wir das Standardverhalten (Seitenneuladung) 
        // und rufen unsere "fetchData"-Funktion auf, um die Wetterdaten für die eingegebene Stadt abzurufen.
        onSubmit={(e) => {
          e.preventDefault()
          fetchData(city)
        }}
      >
        {/* Dies ist das Eingabefeld, in dem der Benutzer den Namen einer Stadt eingeben kann. */}
        <input
          className={styles.input_field}
          placeholder="Stadt eingeben"
          type="text"
          id="cityName"
          name="cityName"
          // Bei jeder Änderung des Eingabefeldes aktualisieren wir den "city"-Zustand mit dem neuen Wert.
          onChange={(e) => setCity(e.target.value)}
        />
        {/* Dies ist der "Suchen"-Button, der das Formular sendet. */}
          <button className={styles.search_button} type="submit">
            Suchen
          </button>
        </form>
        {/* Wenn wir gültige Wetterdaten haben, zeigen wir sie an. */}
        {weatherData && weatherData.weather && weatherData.weather[0] ? (
          <>
            {/* Dies ist der Abschnitt, der das Wetter-Icon und die Wetterinformationen anzeigt. */}
            <div className={styles.icon_and_weatherInfo}>
              <div className={styles.weatherIcon}>
                <i className="wi wi-day-cloudy"></i>
              </div>
              <div className={styles.weatherInfo}>
                {/* Die Temperatur wird von Kelvin in Celsius umgerechnet und angezeigt. */}
                <div className={styles.temperature}>
                  <span>
                    {(weatherData?.main?.temp - 273.5).toFixed(0) +
                      String.fromCharCode(176)}
                  </span>
                </div>
                {/* Das Wetter (z.B. "bewölkt") wird angezeigt. */}
                <div className={styles.weatherCondition}>
                  {weatherData?.weather[0]?.description?.toUpperCase()}
                </div>
                {/* Die Luftfeuchtigkeit wird angezeigt. */}
                <div className={styles.weatherCondition}>
                  {weatherData?.main["humidity"]}% Luftfeuchtigkeit
                </div>
              </div>
            </div>
            {/* Der Name der Stadt wird angezeigt. */}
            <div className={styles.place}>{weatherData?.name}</div>
          </>
        ) : (
          // Wenn wir keine gültigen Wetterdaten haben, zeigen wir eine Fehlermeldung an.
          <div className={styles.place}>Keine Stadt eingegeben...</div>
        )}
      </article>
    </main>
  )
}