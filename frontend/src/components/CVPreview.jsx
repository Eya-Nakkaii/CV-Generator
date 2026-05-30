const FONT = "'Inter', system-ui, sans-serif";

const sectionTitle = {
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "#111111",
  fontFamily: FONT,
  fontWeight: 500,
  borderBottom: "0.5px solid #cccccc",
  paddingBottom: "4px",
  marginBottom: "8px",
  marginTop: "16px",
};

export default function CVPreview({ result, form }) {
  console.log("result reçu:", result);

  const cv = result?.cv ?? null;

  // Nom toujours depuis form, en majuscules via CSS
  const prenom = form?.prenom || "";
  const nom = form?.nom || "";

  // Formation : result.cv si result existe, sinon form.formation
  const formation = cv ? (cv.formation || []) : (form?.formation || []);

  // Projets : result.cv si result existe, sinon form.projets
  const projets = cv ? (cv.projets || []) : (form?.projets || []);

  // Compétences : result.cv (tableau) si dispo, sinon form.competences (string)
  const competences = cv?.competences
    ? (Array.isArray(cv.competences) ? cv.competences : cv.competences.split(","))
    : (form?.competences ? form.competences.split(",") : []);

  // Langues : result.cv (tableau) si dispo, sinon form.langues (string)
  const langues = cv?.langues
    ? (Array.isArray(cv.langues) ? cv.langues.join(", ") : cv.langues)
    : (form?.langues || "");

  // Contact toujours depuis form
  const contactParts = [
    form?.email,
    form?.tel,
    form?.adresse,
    form?.github,
    form?.linkedin,
  ].filter(Boolean);

  async function handleDownloadPDF() {
    const html2pdf = (await import("html2pdf.js")).default;
    const el = document.getElementById("cv-preview");
    html2pdf(el, {
      margin: 10,
      filename: `CV_${prenom}_${nom}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      <div
        id="cv-preview"
        style={{
          background: "#ffffff",
          border: "1px solid #e8e8e6",
          padding: "32px",
          fontFamily: FONT,
          fontSize: "13px",
          color: "#111111",
          lineHeight: 1.8,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Header — toujours depuis form */}
        <div>
          <div style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.01em", textTransform: "uppercase" }}>
            {prenom || <span style={{ color: "#cccccc" }}>PRENOM</span>}{" "}
            {nom || <span style={{ color: "#cccccc" }}>NOM</span>}
          </div>
          {form?.statut && (
            <div style={{ fontSize: "13px", fontStyle: "italic", color: "#555555", marginTop: "3px" }}>
              {form.statut}
            </div>
          )}
          {contactParts.length > 0 && (
            <div style={{ fontSize: "12px", color: "#888888", marginTop: "6px" }}>
              {contactParts.join(" · ")}
            </div>
          )}
        </div>

        <div style={{ borderBottom: "1.5px solid #111111", margin: "12px 0" }} />

        {/* Profil — depuis result.cv.profil */}
        {(() => {
          console.log("cv.profil:", cv?.profil);
          return cv?.profil ? (
            <div>
              <div style={sectionTitle}>Profil</div>
              <p style={{ margin: 0, fontSize: "13px", color: "#333333" }}>{cv.profil}</p>
            </div>
          ) : null;
        })()}

        {/* Formation */}
        {formation.filter(f => f.ecole || f.filiere).length > 0 && (
          <div>
            <div style={sectionTitle}>Formation</div>
            {formation.filter(f => f.ecole || f.filiere).map((f, i) => (
              <div key={i} style={{ marginBottom: "7px" }}>
                {f.ecole && <span style={{ fontWeight: 600 }}>{f.ecole}</span>}
                {f.filiere && <span style={{ color: "#555555" }}>{f.ecole ? " — " : ""}{f.filiere}</span>}
                {f.annee && <span style={{ color: "#888888", fontSize: "12px" }}>{" · "}{f.annee}</span>}
              </div>
            ))}
          </div>
        )}

        {/* Projets & Experiences */}
        {projets.filter(p => p.titre || p.description).length > 0 && (
          <div>
            <div style={sectionTitle}>Projets & Experiences</div>
            {projets.filter(p => p.titre || p.description).map((p, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <div>
                  {p.titre && <span style={{ fontWeight: 600 }}>{p.titre}</span>}
                  {p.date && <span style={{ color: "#888888", fontSize: "12px" }}>{" · "}{p.date}</span>}
                </div>
                {p.description && (
                  <div style={{ color: "#444444", fontSize: "13px", marginTop: "3px", paddingLeft: "10px" }}>
                    {p.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Competences */}
        {competences.filter(c => c.trim()).length > 0 && (
          <div>
            <div style={sectionTitle}>Competences</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {competences.filter(c => c.trim()).map((c, i) => (
                <span key={i} style={{
                  border: "0.5px solid #cccccc",
                  padding: "4px 10px",
                  fontSize: "11px",
                  color: "#333333",
                  fontFamily: FONT,
                }}>
                  {c.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Langues */}
        {langues && (
          <div>
            <div style={sectionTitle}>Langues</div>
            <div style={{ fontSize: "13px", color: "#555555" }}>{langues}</div>
          </div>
        )}
      </div>

      <button
        onClick={handleDownloadPDF}
        style={{
          background: "#111111",
          color: "#ffffff",
          border: "1px solid #111111",
          padding: "13px 20px",
          fontSize: "13px",
          fontWeight: 500,
          letterSpacing: "0.1em",
          cursor: "pointer",
          fontFamily: FONT,
          borderRadius: 0,
          width: "100%",
        }}
      >
        TELECHARGER PDF
      </button>
    </div>
  );
}
