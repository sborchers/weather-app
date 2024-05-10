const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const fetchData = async (city: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}${encodeURIComponent(
        city
      )}?unitGroup=us&key=5AJ55Y8AZDJZWULWLEE5RN6PE&contentType=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { fetchData };
