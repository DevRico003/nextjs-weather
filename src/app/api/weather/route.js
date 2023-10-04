import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  
  // Wir erstellen ein neues URL-Objekt aus der URL des eingehenden Requests.
  // Das gibt uns Zugriff auf verschiedene Teile der URL, einschließlich der Suchparameter.
  const { searchParams } = new URL(request.url);
  
  // Wir versuchen, den "address"-Parameter aus den Suchparametern der URL zu extrahieren.
  const address = searchParams.get("address");

  // Eine leere Zeichenkette für die URL wird initialisiert.
  let url = "";
  
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
  
  // Wenn eine Adresse angegeben wurde, stellen wir die URL für die OpenWeatherMap-API zusammen.
  if (address) {
    url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      address +
      "&lang=de" +
      "&appid=" +
      apiKey
  } 

  // Ein Konsolen-Log zur Debugging-Zwecken, um die endgültige URL zu überprüfen.
  console.log(url);

  // Wir verwenden die `fetch`-Funktion, um eine Netzwerkanfrage an die OpenWeatherMap-API zu senden.
  const res = await fetch(url);

  // Wir warten darauf, dass die Antwort in ein JSON-Objekt umgewandelt wird.
  const data = await res.json();
  
  // Schließlich senden wir die empfangenen Daten als JSON-Antwort zurück.
  // Hier verwenden wir die NextResponse-Klasse von `next/server`, um die Antwort zu formen.
  return NextResponse.json({ data });
}
