import { NextRequest, NextResponse } from "next/server";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  let url = "";
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (address) {
    url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      address +
      "&lang=de" +
      "&appid=" +
      apiKey
  } 

  console.log(url);
  const res = await fetch(url);

  const data = await res.json();
  return NextResponse.json({ data });
}
