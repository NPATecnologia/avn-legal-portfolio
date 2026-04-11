import fs from "node:fs/promises";
import path from "node:path";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY ausente.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const root = process.cwd();

const prompts = [
  {
    file: "assets/images/generated/hero-frame.jpg",
    prompt: "Use case: photorealistic-natural. Asset type: luxury law firm website hero image. Primary request: Create a cinematic wide editorial photograph of a premium corporate law firm interior in Sao Paulo, Brazil, dusk city light beyond tall windows, warm brass details, dark wood, travertine stone, no people in foreground, rich atmosphere, premium but believable, no text, no watermark. Composition/framing: wide 16:9 with clean negative space on the left for website headline. Lighting/mood: moody golden hour, elegant, polished, discreet. Avoid: logo, watermark, distorted furniture, visible text."
  },
  {
    file: "assets/images/generated/reuniao-estrategica.jpg",
    prompt: "Use case: photorealistic-natural. Asset type: editorial split-section image for legal website. Primary request: Create an editorial photo of a strategic legal meeting in a luxury boardroom, one woman lawyer leading a discussion with two executives, refined Brazilian corporate setting, warm walnut table, brass accents, subtle city skyline, no papers with legible text, no watermark. Composition/framing: medium wide, candid but composed, cinematic. Lighting/mood: warm, expensive, intelligent."
  },
  {
    file: "assets/images/generated/fachada-noturna.jpg",
    prompt: "Use case: photorealistic-natural. Asset type: institutional architecture image. Primary request: Photoreal nighttime exterior of a high-end law office building entrance in Sao Paulo, understated signage area with no text, polished stone facade, brass lighting, luxury but realistic urban atmosphere, wet pavement reflections, no watermark. Composition/framing: vertical-friendly wide crop, editorial architecture photography."
  },
  {
    file: "assets/images/generated/recepcao.jpg",
    prompt: "Use case: photorealistic-natural. Asset type: reception image for premium law firm website. Primary request: Refined empty reception area of a boutique corporate law office, curved travertine desk, dark oak panels, brass details, sculptural seating, Brazilian modernist influence, no brand text, no watermark. Composition/framing: symmetrical but organic, high-end editorial interior photo."
  },
  {
    file: "assets/images/generated/escritorio-detalhe.jpg",
    prompt: "Use case: photorealistic-natural. Asset type: detail image for inner page hero. Primary request: Luxurious close editorial photograph of legal office details: leather-bound materials, brass edge, textured stone, soft amber light, abstract sophistication, no readable text, no watermark. Composition/framing: close crop with strong texture and depth."
  },
  {
    file: "assets/images/generated/boardroom.jpg",
    prompt: "Use case: photorealistic-natural. Asset type: results section image. Primary request: Wide premium boardroom at dusk prepared for a high-stakes legal strategy meeting, empty chairs, polished table, subtle screens with no readable content, sophisticated Sao Paulo skyline, no watermark. Lighting/mood: cinematic and restrained."
  },
  {
    file: "assets/images/team/helena-althaus.jpg",
    prompt: "Use case: photorealistic-natural. Asset type: law firm partner portrait. Primary request: Create a premium editorial portrait of a Brazilian woman in her early 40s, senior corporate lawyer, dark tailored suit, elegant but restrained styling, warm brown eyes, intelligent expression, neutral luxury background, no text, no watermark. Composition/framing: waist-up portrait, magazine-quality, soft cinematic lighting."
  },
  {
    file: "assets/images/team/ricardo-vale.jpg",
    prompt: "Use case: photorealistic-natural. Asset type: law firm partner portrait. Primary request: Create a premium editorial portrait of a Brazilian man in his mid 40s, litigation partner, charcoal suit, poised and serious, subtle confidence, luxury office backdrop, no text, no watermark. Composition/framing: waist-up portrait, realistic, refined lighting."
  },
  {
    file: "assets/images/team/marina-nogueira.jpg",
    prompt: "Use case: photorealistic-natural. Asset type: law firm partner portrait. Primary request: Create a premium editorial portrait of a Brazilian woman in her late 30s, compliance and contracts partner, dark silk blouse and blazer, direct and composed expression, sophisticated interior background, no text, no watermark. Composition/framing: waist-up portrait, soft cinematic lighting, believable corporate fashion."
  },
  {
    file: "assets/images/team/tomas-queiroz.jpg",
    prompt: "Use case: photorealistic-natural. Asset type: law firm counsel portrait. Primary request: Create a premium editorial portrait of a Brazilian man in his early 50s, family business and succession counsel, elegant navy suit, calm expression, luxurious but quiet background, no text, no watermark. Composition/framing: waist-up portrait, natural posture, polished magazine feel."
  }
];

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(path.join(root, filePath)), { recursive: true });
}

async function generateImage(filePath, prompt) {
  const response = await ai.models.generateContent({
    model: "nano-banana-pro-preview",
    contents: prompt,
    config: { responseModalities: ["TEXT", "IMAGE"] }
  });

  const part = response.candidates?.[0]?.content?.parts?.find((item) => item.inlineData?.data);
  if (!part) throw new Error(`Nenhuma imagem retornada para ${filePath}`);

  await ensureDir(filePath);
  await fs.writeFile(path.join(root, filePath), Buffer.from(part.inlineData.data, "base64"));
  console.log(`Imagem salva: ${filePath}`);
}

async function generateVideoFromImage(imageFile, outputFile) {
  try {
    const imageBytes = await fs.readFile(path.join(root, imageFile), { encoding: "base64" });
    let operation = await ai.models.generateVideos({
      model: "veo-3.1-lite-generate-preview",
      source: {
        prompt: "Slow cinematic dolly movement through a luxury Brazilian corporate law office at dusk, subtle light shifts, quiet premium atmosphere, no people moving close to camera, polished architectural motion, elegant and believable, suitable for a website hero background.",
        image: {
          imageBytes,
          mimeType: "image/jpeg"
        }
      },
      config: {
        numberOfVideos: 1,
        durationSeconds: 8,
        aspectRatio: "16:9",
        resolution: "720p"
      }
    });

    while (!operation.done) {
      console.log("Aguardando vídeo...");
      await new Promise((resolve) => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation });
    }

    const file = operation.response?.generatedVideos?.[0]?.video;
    if (!file) throw new Error("Resposta de vídeo sem arquivo.");

    await ensureDir(outputFile);
    await ai.files.download({ file, downloadPath: path.join(root, outputFile) });
    console.log(`Vídeo salvo: ${outputFile}`);
  } catch (error) {
    console.warn(`Vídeo não gerado: ${error.message}`);
  }
}

for (const item of prompts) {
  await generateImage(item.file, item.prompt);
}

await generateVideoFromImage("assets/images/generated/hero-frame.jpg", "assets/video/hero-loop.mp4");
