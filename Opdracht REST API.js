
async function zoekPlaats() {
  try {
    //Vraag de locatie op bij Nominatim
    const url = new URL(
      "https://nominatim.openstreetmap.org/search"
    );

    url.search = new URLSearchParams({
      format: "jsonv2",
      q: "Roermond",
      limit: "1"
    });

    const response = await fetch(url, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("De API-aanvraag is mislukt.");
    }

    const data = await response.json();

    if (data.length === 0) {
      throw new Error("Geen locatie gevonden.");
    }

    //Haal latitude en longitude uit de response
    const latitude = Number.parseFloat(data[0].lat);
    const longitude = Number.parseFloat(data[0].lon);

    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);

    //Maak de kaart op de gevonden locatie
    const map = L.map("map").setView(
      [latitude, longitude],
      14
    );

    //Voeg de OpenStreetMap-kaarttegels toe
    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "&copy; OpenStreetMap contributors"
      }
    ).addTo(map);

    //Plaats een marker
    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(data[0].display_name)
      .openPopup();

  } catch (error) {
    console.error("Fout:", error);
    alert("Er ging iets mis: " + error.message);
  }
}

zoekPlaats();
