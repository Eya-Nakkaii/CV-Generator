export default function LetterPreview({ lettre, form }) {
  if (!lettre) return <div style={{ padding: "20px", color: "#aaa", fontSize: "12px" }}>Aucune lettre générée.</div>;
  return (
    <div style={{ background: "#fff", border: "1px solid #e0e0de", padding: "24px", fontFamily: "Georgia, serif", fontSize: "11px", lineHeight: "1.8", color: "#333" }}>
      <div style={{ marginBottom: "16px", fontSize: "10px", color: "#888" }}>
        {form.prenom} {form.nom} · {form.email}<br />
        {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
      </div>
      <div style={{ fontWeight: "700", marginBottom: "12px" }}>Objet : Candidature — {form.poste}</div>
      <div style={{ whiteSpace: "pre-line" }}>{lettre}</div>
    </div>
  );
}