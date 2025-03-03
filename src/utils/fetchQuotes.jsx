import axios from "axios";

// Play codes to choose from
const PLAY_CODES = ["Ham", "Mac", "Oth", "Rom", "Lr", "JC", "Tmp", "WT"];

// Fetch a Shakespeare quote along with its surrounding lines
export const fetchShakespeareQuote = async (prompt = "", includeSurrounding = false) => {
  try {
    const randomPlay = PLAY_CODES[Math.floor(Math.random() * PLAY_CODES.length)];

    // Fetch full play text
    const url = `https://www.folgerdigitaltexts.org/${randomPlay}/text/`;
    const response = await axios.get(url, { responseType: "text" });

    console.log("API Response:", response.data);

    // Split text into lines and filter meaningful lines
    const lines = response.data.split("\n").filter(line => line.trim().length > 10);

    let index = Math.floor(Math.random() * lines.length);
    
    // If user provides a prompt, try to find a relevant line
    if (prompt) {
      const filteredIndexes = lines
        .map((line, i) => (line.toLowerCase().includes(prompt.toLowerCase()) ? i : -1))
        .filter(i => i !== -1);
      
      if (filteredIndexes.length > 0) {
        index = filteredIndexes[Math.floor(Math.random() * filteredIndexes.length)];
      }
    }

    // Get surrounding lines
    const previous = index > 0 ? lines[index - 1] : "";
    const current = lines[index];
    const next = index < lines.length - 1 ? lines[index + 1] : "";

    return { previous, current, next };
  } catch (error) {
    console.error("Error fetching Shakespeare quote:", error);
    throw new Error("Failed to fetch a quote.");
  }
};
