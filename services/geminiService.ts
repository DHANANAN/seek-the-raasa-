import { GoogleGenAI } from "@google/genai";
import { Monument, MonumentImage, OfficialRecord, InstitutionalLink } from "../types";

/**
 * Generates a photorealistic image of the monument if search fails.
 * Uses gemini-2.5-flash-image for high-fidelity visual reconstruction.
 */
async function generateHeritageImage(prompt: string): Promise<string | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // We specifically request a cinematic, travel-photography style image
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Cinematic wide-angle travel photography of ${prompt}, India. Golden hour lighting, majestic, hyper-realistic, 8k resolution, detailed architecture, historical monument, authentic atmosphere, no text, no watermarks.` }],
      },
      config: {
        imageConfig: { aspectRatio: "4:3" }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    console.error("Image Generation Failed:", e);
    return null;
  }
}

/**
 * Heritage Oracle Engine v8.2 - MASTER PIPELINE
 * Integrated Search + Generation
 */
export const searchMonumentInfo = async (query: string): Promise<Monument | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are the "Heritage Oracle v8.2". 
    Your mission: Perform a forensic digital excavation of Indian monuments.

    CHANNEL 1: VISUAL ARCHIVES (HIGH FIDELITY & FAIR USE)
    - PRIMARY OBJECTIVE: Source high-quality, aesthetically pleasing images suitable for a modern travel app.
    - PRIORITY SOURCES: Search specifically for images from Unsplash, Pexels, and Pixabay. 
    - SECONDARY SOURCE: Google Images, utilizing "Fair Use" guidelines for educational representation.
    - VALIDATION: Cross-reference image results with the monument's architectural description to ensure accuracy (e.g., verify dome shape, material, distinct features).
    - Fields: url, attribution (domain/source), source, license.

    CHANNEL 2: DATA.GOV.IN & INSTITUTIONAL
    - Hunt for "officialRecords" (preservation status, ticket prices, footfall).
    - "institutionalLinks": Official government or UNESCO pages.

    CHANNEL 3: THE RASA (Narrative)
    - Core Story: Historical depth, architectural style (e.g., Nagara, Dravidian).
    - Emotional Hook: Poetic, evocative one-liner.
    - Era Significance: Why it matters in the timeline.
    
    CHANNEL 4: DIGITAL TWIN (Experimental)
    - If a valid .glb or .gltf 3D model URL exists (e.g., from Smithsonian, Sketchfab public links, or institutional repos), include it in "model3dUrl". Otherwise omit.

    JSON SCHEMA (STRICT):
    {
      "name": "string",
      "slug": "string",
      "dynasty": "string",
      "era": "string",
      "location": "string",
      "emotionalHook": "string",
      "coreStory": "string",
      "eraSignificance": "string",
      "experientialAppeal": "string",
      "promotionalAngle": "string",
      "institutionalStats": {
        "protectionStatus": "string",
        "visitorFootfall": "string",
        "bestTimeToVisit": "string"
      },
      "officialRecords": [ { "label": "string", "value": "string" } ],
      "institutionalLinks": [ { "title": "string", "url": "string", "description": "string" } ],
      "socialMedia": {
        "caption": "string",
        "hashtags": ["string"],
        "reelIdeas": ["string"],
        "emojis": "string"
      },
      "archiveGallery": [
        { "url": "string", "attribution": "string", "source": "string", "license": "string" }
      ],
      "model3dUrl": "string"
    }
  `;

  try {
    // STEP 1: Text & Metadata Search with Grounding
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: `Generate a comprehensive profile for: "${query}". 
      Focus on sourcing representative images from Unsplash, Pexels, Pixabay, or verified educational sources via Google Search.
      If no images are found, leave archiveGallery empty.`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }]
      },
    });

    const responseText = response.text;
    if (!responseText) return null;

    let data;
    try {
      data = JSON.parse(responseText.trim());
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return null;
    }

    // Extract grounding sources
    const groundingSources: { title: string; uri: string }[] = [];
    response.candidates?.[0]?.groundingMetadata?.groundingChunks?.forEach(chunk => {
      if (chunk.web?.uri) {
        groundingSources.push({
          title: chunk.web.title || "Reference",
          uri: chunk.web.uri
        });
      }
    });

    // STEP 2: Image Validation & Fallback Generation
    let archiveGallery: MonumentImage[] = [];
    
    // Filter existing valid URLs from the search result
    if (Array.isArray(data.archiveGallery)) {
      archiveGallery = data.archiveGallery.filter((img: any) => 
        img.url && img.url.startsWith('http')
      );
    }

    let mainImageUrl = archiveGallery.length > 0 ? archiveGallery[0].url : null;

    // IF NO IMAGES FOUND: Trigger AI Generation
    if (!mainImageUrl) {
      console.log("No archival images found. Generating AI visualization...");
      const generatedImage = await generateHeritageImage(data.name || query);
      
      if (generatedImage) {
        mainImageUrl = generatedImage;
        // Add generated image to gallery so the UI has something to show
        archiveGallery.unshift({
          url: generatedImage,
          attribution: "Gemini 2.5 Flash Image",
          source: "AI Generated Visualization",
          license: "Generative AI"
        });
      } else {
        // Absolute fallback if AI generation also fails
        mainImageUrl = "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200";
      }
    }

    // Return polished object
    return {
      ...data,
      id: query.toLowerCase().replace(/\s+/g, '-'),
      imageUrl: mainImageUrl,
      archiveGallery: archiveGallery,
      groundingSources
    };

  } catch (error) {
    console.error("Gateway Error:", error);
    return null;
  }
};