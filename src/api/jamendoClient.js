// Client bridge for Jamendo API
const API_BASE_URL = "https://api.jamendo.com/v3.0"
const client_ID = "9941dd9a"

const jamendoClient = async (limit=50) => {
  try{
    const response = await fetch(`${API_BASE_URL}/tracks/?client_id=${client_ID}&format=jsonpretty&limit=${limit}&boost=listens_total&include=stats&imagesize=600`)

    const data = await response.json()

    if(!data || !data.headers || data.headers.status !== "success"){
      console.warn("Jamendo API Warning:", data?.headers?.error_message || "Invalid response");
    }

    return data.results.map((track)=>({
      id: track.id,
      title: track.name,
      artist: track.artist_name,
      albumArt: track.image || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&q=80",
      stream_url: track.audio,
      duration: track.duration,
      metrics: {
        plays: track.stats.rate_listened_total,
        likes: track.stats.likes || 0,
        monthlyListeners: track.stats.rate_listened_total
      }
    }))
  }
  
  catch(error){
    console.log("API Fetch Error:", error)
    return []
  }
};

// Add this below your existing jamendoClient function
export const searchTracks = async (query, limit = 20) => {
  try {
    // We use the 'namesearch' and 'tags' parameters to find specific music
    const response = await fetch(
      `${API_BASE_URL}/tracks/?client_id=${client_ID}&format=jsonpretty&limit=${limit}&namesearch=${encodeURIComponent(query)}&include=stats&imagesize=600`
    );

    const data = await response.json();

    if (!data || !data.headers || data.headers.status !== "success") {
      console.warn("Jamendo API Warning:", data?.headers?.error_message || "Invalid response");
      return []; 
    }

    if (!data.results || !Array.isArray(data.results)) return []; 

    return data.results.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artist_name,
      albumArt: track.image || "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&q=80",
      stream_url: track.audio,
      duration: track.duration,
      metrics: {
        plays: track.stats.rate_listened_total,
        likes: track.stats.likes || 0,
        monthlyListeners: track.stats.rate_listened_total
      }
    }));
  } catch (error) {
    console.error("Search API Fetch Error:", error);
    return [];
  }
};


export default jamendoClient;
