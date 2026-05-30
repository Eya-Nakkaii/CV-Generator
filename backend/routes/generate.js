import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generate(req, res) {
  const { prenom, nom, email, tel, adresse, statut,
          linkedin, github, portfolio, formation,
          competences, langues, projets,
          entreprise, poste, messagePerso } = req.body;

  const prompt = `Tu es un expert RH. RÉÉCRIS et AMÉLIORE ce contenu pour un CV professionnel. Ne copie JAMAIS les données brutes.

Candidat :
- Nom : ${prenom} ${nom}
- Statut : ${statut}
- Formation : ${JSON.stringify(formation)}
- Compétences : ${competences}
- Langues : ${langues}
- Projets : ${JSON.stringify(projets)}
${entreprise ? `- Lettre pour : ${entreprise}, poste : ${poste}` : ""}
${messagePerso ? `- Motivation : ${messagePerso}` : ""}

Réponds UNIQUEMENT en JSON valide sans texte avant ou après :
{
  "cv": {
    "profil": "3 phrases percutantes",
    "formation": [{"ecole":"","filiere":"","annee":""}],
    "projets": [{"titre":"","date":"","description":"2-3 phrases professionnelles"}],
    "competences": [""],
    "langues": [""]
  },
  "lettre": "3 paragraphes complets ou null"
}`;

  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const text = response.choices[0].message.content;
    res.json(JSON.parse(text));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur génération" });
  }
}
