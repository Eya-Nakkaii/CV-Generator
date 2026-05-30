import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generate(req, res) {
  const { prenom, nom, email, tel, adresse, statut,
          linkedin, github, portfolio, formation,
          competences, langues, projets,
          entreprise, poste, messagePerso } = req.body;

  const prompt = `Tu es un expert RH tunisien. Génère en français :

Données du candidat :
- Nom complet : ${prenom} ${nom}
- Contact : ${email} | ${tel} | ${adresse}
- Statut : ${statut}
- Formation : ${JSON.stringify(formation)}
- Compétences : ${competences}
- Langues : ${langues}
- Projets/Expériences : ${JSON.stringify(projets)}
- Réseaux : LinkedIn: ${linkedin} | GitHub: ${github} | Portfolio: ${portfolio}
${entreprise ? `- Lettre pour : ${entreprise}, poste : ${poste}` : ""}
${messagePerso ? `- Message perso : ${messagePerso}` : ""}

Réponds UNIQUEMENT en JSON valide sans texte avant ou après :
{
  "cv": {
    "profil": "3 phrases max",
    "formation": [{"ecole":"","filiere":"","annee":""}],
    "projets": [{"titre":"","date":"","description":""}],
    "competences": [""],
    "langues": [""]
  },
  "lettre": "texte lettre complet ou null si pas d'entreprise"
}`;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    res.json(JSON.parse(text));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur génération Gemini" });
  }
}