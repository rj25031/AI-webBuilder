import axios from "axios";
const API_KEY = "AIzaSyB97nxnap94C7zkM_5PVcMrjprX6FGru_k";

export async function generateWebsite(req, res) {
  try {
    const {
      businessName,
      description,
      category,
      year,
      legalStatus,
      templateCat,
      layoutStyle,
      contentTone,
      primaryColor,
      secondaryColor,
      typography,
      primaryCTA,
      targetAudience,
      desiredSections,
    } = req.body;
    const prompt = `
### Role
You are an expert frontend web developer and visual designer. Your task is to generate a beautiful, responsive HTML5 website using Tailwind CSS.

### Output Requirements
- Return **only the complete HTML5 document** (from <!DOCTYPE html> to </html>).
- **Do not** include explanations, markdown, comments, or code block wrappers.
- Use **Tailwind CSS only** for styling — no inline styles or external libraries.
- Use images/icons/hero sections where appropriate.

### Business Information
- Business Name: ${businessName}
- Description: ${description}
- Category: ${category}
- Year Established: ${year}
- Legal Status: ${legalStatus}

### Web Design Parameters
- Template Category: ${templateCat}
- Layout Style: ${layoutStyle}
- Content Tone: ${contentTone}
- Primary Color: ${primaryColor}
- Secondary Color: ${secondaryColor}
- Typography: ${typography}
- Primary Call-To-Action (CTA): ${primaryCTA}
- Target Audience: ${targetAudience}
- Desired Sections: ${desiredSections.join(", ")}

### Design Guidelines
- Use the **primary color** for buttons, headings, and hero elements.
- Use the **secondary color** for backgrounds, accents, or borders.
- Match all fonts and text styling to this typography: **${typography}**.
- Design the layout and spacing to match a **${contentTone}** tone.
- Implement all **desired sections** using Tailwind-based blocks.
- Ensure full responsiveness using Tailwind's grid and flex utilities.
- Insert placeholders for images, icons, or logos where suitable.

Now generate the final HTML5 page.
Only return valid HTML. No markdown. No explanation.
`;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        "contents": [{
          "parts": [{
            "text": prompt,
          }]
        }]
      },
      { headers: { "Content-Type": "application/json" } }
    );
    const data = response.data;
    
    const html = data.candidates[0].content.parts[0].text;
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send("AI generation failed");
  }
}
