import { useState } from "react";
import HeroPage from "./components/HeroPage";
import FormSection from "./components/FormSection";

export default function App() {
  const [page, setPage] = useState("hero");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate(formData, mode) {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: formData, mode }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Erreur generation:", err);
    } finally {
      setLoading(false);
    }
  }

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
