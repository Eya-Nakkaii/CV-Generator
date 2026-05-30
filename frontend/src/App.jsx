import { useState, useRef } from "react";
import HeroPage from "./components/HeroPage";
import FormSection from "./components/FormSection";
import ResultPage from "./components/ResultPage";

export default function App() {
  const [page, setPage] = useState("hero");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const lastForm = useRef(null);

  const handleGenerate = async (formData, mode) => {
    setLoading(true);
    lastForm.current = formData;
    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          entreprise: mode === "cv" ? null : formData.entreprise,
          poste: mode === "cv" ? null : formData.poste,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      alert("Erreur serveur");
    }
    setLoading(false);
  };

  if (page === "hero") {
    return <HeroPage onStart={() => setPage("form")} />;
  }

  if (result !== null) {
    return (
      <ResultPage
        result={result}
        form={lastForm.current}
        onRestart={() => { setResult(null); setPage("form"); }}
      />
    );
  }

  return (
    <FormSection
      onGenerate={handleGenerate}
      result={result}
      loading={loading}
    />
  );
}
