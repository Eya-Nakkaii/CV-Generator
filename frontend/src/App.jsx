import { useState } from "react";
import HeroPage from "./components/HeroPage";
import FormSection from "./components/FormSection";
import { generateCV } from "./gemini";

export default function App() {
  const [page, setPage] = useState("hero");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (formData, mode) => {
    setLoading(true);
    try {
      const data = await generateCV({
        ...formData,
        entreprise: mode === "cv" ? null : formData.entreprise,
        poste: mode === "cv" ? null : formData.poste,
      });
      setResult(data);
    } catch (e) {
      alert("Erreur generation : " + e.message);
    }
    setLoading(false);
  };

  if (page === "hero") {
    return <HeroPage onStart={() => setPage("form")} />;
  }

  return (
    <FormSection
      onGenerate={handleGenerate}
      result={result}
      loading={loading}
    />
  );
}
