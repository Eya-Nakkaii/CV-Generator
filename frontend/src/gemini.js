import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateCV(formData) {
  const { prenom, nom, email, tel, adresse, statut,
          linkedin, github, portfolio, formation,
          competences, langues, projets,
          entreprise, poste, messagePerso } = formData;

  const prompt = `Tu es un expert RH tunisien. Genere en francais.

Donnees du candidat :
- Nom complet : ${prenom} ${nom}
- Contact : ${email} | ${tel} | ${adresse}
- Statut : ${statut}
- Formation : ${JSON.stringify(formation)}
- Competences : ${competences}
- Langues : ${langues}
- Projets : ${JSON.stringify(projets)}
- Reseaux : LinkedIn: ${linkedin} | GitHub: ${github} | Portfolio: ${portfolio}
${entreprise ? `- Lettre pour : ${entreprise}, poste : ${poste}` : ""}
${messagePerso ? `- Message perso : ${messagePerso}` : ""}

Reponds UNIQUEMENT en JSON valide sans texte avant ou apres :
{
  "cv": {
    "profil": "3 phrases max percutantes",
    "formation": [{"ecole":"","filiere":"","annee":""}],
    "projets": [{"titre":"","date":"","description":"2-3 phrases professionnelles"}],
    "competences": [""],
    "langues": [""]
  },
  "lettre": "lettre complete ou null"
}`;

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text);
}
