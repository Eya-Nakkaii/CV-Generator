import CVPreview from "./CVPreview";

const FONT = "'Inter', system-ui, sans-serif";

const dlBtnStyle = {
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
  marginTop: "12px",
};

const colLabelStyle = {
  fontSize: "11px",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  color: "#aaaaaa",
  marginBottom: "16px",
  fontFamily: FONT,
};

async function exportPDF(elementId, filename) {
  const { default: html2pdf } = await import("html2pdf.js");
  html2pdf().set({
    margin: 10,
    filename: filename + ".pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4" }
  }).from(document.getElementById(elementId)).save();
}

export default function ResultPage({ result, form, onRestart }) {
  const hasLettre = !!(result?.lettre && result.lettre !== "null" && result.lettre !== null);
  const prenom = form?.prenom || "";
  const nom = form?.nom || "";
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric"
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f4f2",
      fontFamily: FONT,
      padding: "48px",
      boxSizing: "border-box",
    }}>
      {/* Titre */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{
          fontSize: "22px",
          fontWeight: 500,
          color: "#111111",
          letterSpacing: "-0.01em",
          margin: 0,
        }}>
          Vos documents generés
        </h1>
        <p style={{ fontSize: "13px", color: "#888888", marginTop: "8px" }}>
          Téléchargez vos documents au format PDF
        </p>
      </div>

      {/* Colonnes */}
      <div style={{
        display: "grid",
        gridTemplateColumns: hasLettre ? "1fr 1fr" : "1fr",
        gap: "40px",
        maxWidth: hasLettre ? "1200px" : "760px",
        margin: "0 auto",
      }}>
        {/* Colonne CV */}
        <div>
          <div style={colLabelStyle}>Curriculum Vitae</div>
          <CVPreview result={result} form={form} />
          <button
            onClick={() => exportPDF("cv-preview", "CV_" + prenom + "_" + nom)}
            style={dlBtnStyle}
          >
            TELECHARGER CV PDF
          </button>
        </div>

        {/* Colonne Lettre */}
        {hasLettre && (
          <div>
            <div style={colLabelStyle}>Lettre de motivation</div>
            <div
              id="lettre-preview"
              style={{
                background: "#ffffff",
                border: "1px solid #e8e8e6",
                padding: "32px",
                fontFamily: FONT,
                fontSize: "13px",
                color: "#111111",
                lineHeight: 1.8,
                boxSizing: "border-box",
              }}
            >
              {/* En-tête */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontWeight: 600 }}>{prenom} {nom}</div>
                {form?.email && <div style={{ color: "#555555" }}>{form.email}</div>}
                <div style={{ color: "#888888", fontSize: "12px", marginTop: "4px" }}>{today}</div>
              </div>

              {/* Objet */}
              {form?.poste && (
                <div style={{ marginBottom: "24px", fontWeight: 500 }}>
                  Objet : Candidature — {form.poste}
                </div>
              )}

              {/* Corps */}
              <div style={{ whiteSpace: "pre-line", color: "#333333" }}>
                {result.lettre}
              </div>
            </div>
            <button
              onClick={() => exportPDF("lettre-preview", "Lettre_" + prenom + "_" + nom)}
              style={dlBtnStyle}
            >
              TELECHARGER LETTRE PDF
            </button>
          </div>
        )}
      </div>

      {/* Bouton Recommencer */}
      <div style={{ textAlign: "center", marginTop: "48px" }}>
        <button
          onClick={onRestart}
          style={{
            background: "#ffffff",
            color: "#111111",
            border: "1px solid #111111",
            padding: "13px 40px",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            cursor: "pointer",
            fontFamily: FONT,
            borderRadius: 0,
          }}
        >
          RECOMMENCER
        </button>
      </div>
    </div>
  );
}
