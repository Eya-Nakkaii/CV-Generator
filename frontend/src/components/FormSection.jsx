import { useState, useEffect } from "react";
import CVPreview from "./CVPreview";

const FONT = "'Inter', system-ui, sans-serif";

const inputStyle = {
  border: "1px solid #e8e8e6",
  background: "#fafaf8",
  padding: "10px 14px",
  fontSize: "15px",
  fontFamily: FONT,
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  borderRadius: 0,
  color: "#111111",
};

const labelStyle = {
  fontSize: "13px",
  color: "#888888",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "5px",
  fontFamily: FONT,
};

const addBtnStyle = {
  background: "none",
  border: "1px solid #e8e8e6",
  color: "#888888",
  padding: "8px 16px",
  cursor: "pointer",
  fontFamily: FONT,
  fontSize: "13px",
  borderRadius: 0,
};

const STATUTS = [
  "Etudiant(e)",
  "Recherche de stage",
  "PFE",
  "Stage technicien",
  "Jeune diplome(e)",
  "En poste",
];

const STEPPER_LABELS = ["Informations", "Parcours", "Generation", "Telechargement"];

const emptyFormation = () => ({ ecole: "", annee: "", filiere: "" });
const emptyProjet = () => ({ titre: "", date: "", description: "" });

function SectionTitle({ number, label }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "9px",
      fontSize: "13px",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      color: "#aaaaaa",
      marginBottom: "16px",
      marginTop: "26px",
      fontFamily: FONT,
    }}>
      <span style={{
        width: "22px",
        height: "22px",
        borderRadius: "50%",
        background: "#f0f0ee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "11px",
        color: "#888888",
        flexShrink: 0,
        fontFamily: FONT,
      }}>
        {number}
      </span>
      {label}
    </div>
  );
}

function Stepper({ activeStep }) {
  return (
    <div style={{
      background: "#ffffff",
      borderBottom: "1px solid #e8e8e6",
      padding: "20px 48px",
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
    }}>
      {STEPPER_LABELS.map((label, idx) => {
        const n = idx + 1;
        const done = n < activeStep;
        const active = n === activeStep;
        const future = n > activeStep;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "13px",
                fontFamily: FONT,
                fontWeight: 500,
                flexShrink: 0,
                background: done || active ? "#111111" : "#ffffff",
                color: done || active ? "#ffffff" : "#888888",
                border: future ? "1px solid #dddddd" : "none",
              }}>
                {n}
              </div>
              <span style={{
                fontSize: "14px",
                fontFamily: FONT,
                fontWeight: done || active ? 500 : 400,
                color: done || active ? "#111111" : "#888888",
                whiteSpace: "nowrap",
              }}>
                {label}
              </span>
            </div>
            {idx < STEPPER_LABELS.length - 1 && (
              <div style={{ width: "60px", height: "1px", background: "#dddddd", margin: "0 18px" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function FormSection({ onGenerate, result, loading }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    tel: "",
    adresse: "",
    linkedin: "",
    github: "",
    portfolio: "",
    statut: "",
    formation: [emptyFormation()],
    competences: "",
    langues: "",
    projets: [emptyProjet()],
    lettreActive: false,
    entreprise: "",
    poste: "",
    message: "",
  });

  useEffect(() => {
    if (result) setStep(3);
  }, [result]);

  const stepperActive = step === 3 ? 4 : loading ? 3 : step;

  function setField(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function setFormationItem(index, key, value) {
    setForm(f => {
      const arr = [...f.formation];
      arr[index] = { ...arr[index], [key]: value };
      return { ...f, formation: arr };
    });
  }

  function setProjetItem(index, key, value) {
    setForm(f => {
      const arr = [...f.projets];
      arr[index] = { ...arr[index], [key]: value };
      return { ...f, projets: arr };
    });
  }

  function renderStep1() {
    return (
      <div>
        <SectionTitle number="1" label="Identite" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          <div>
            <label style={labelStyle}>Prenom</label>
            <input style={inputStyle} value={form.prenom} onChange={e => setField("prenom", e.target.value)} placeholder="Jean" />
          </div>
          <div>
            <label style={labelStyle}>Nom</label>
            <input style={inputStyle} value={form.nom} onChange={e => setField("nom", e.target.value)} placeholder="Dupont" />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} value={form.email} onChange={e => setField("email", e.target.value)} placeholder="jean@email.com" type="email" />
          </div>
          <div>
            <label style={labelStyle}>Telephone</label>
            <input style={inputStyle} value={form.tel} onChange={e => setField("tel", e.target.value)} placeholder="+33 6 00 00 00 00" />
          </div>
        </div>

        <div style={{ marginBottom: "14px" }}>
          <label style={labelStyle}>Adresse</label>
          <input style={inputStyle} value={form.adresse} onChange={e => setField("adresse", e.target.value)} placeholder="Paris, France" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "6px" }}>
          <div>
            <label style={labelStyle}>LinkedIn</label>
            <input style={inputStyle} value={form.linkedin} onChange={e => setField("linkedin", e.target.value)} placeholder="linkedin.com/in/..." />
          </div>
          <div>
            <label style={labelStyle}>GitHub</label>
            <input style={inputStyle} value={form.github} onChange={e => setField("github", e.target.value)} placeholder="github.com/..." />
          </div>
          <div>
            <label style={labelStyle}>Portfolio</label>
            <input style={inputStyle} value={form.portfolio} onChange={e => setField("portfolio", e.target.value)} placeholder="monsite.com" />
          </div>
        </div>

        <SectionTitle number="2" label="Statut" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {STATUTS.map(s => (
            <button
              key={s}
              onClick={() => setField("statut", form.statut === s ? "" : s)}
              style={{
                padding: "7px 14px",
                fontSize: "13px",
                cursor: "pointer",
                fontFamily: FONT,
                borderRadius: 0,
                border: form.statut === s ? "1px solid #111111" : "1px solid #dddddd",
                background: form.statut === s ? "#111111" : "#ffffff",
                color: form.statut === s ? "#ffffff" : "#888888",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "36px" }}>
          <button
            onClick={() => setStep(2)}
            style={{
              background: "#111111",
              color: "#ffffff",
              border: "1px solid #111111",
              padding: "14px 20px",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              cursor: "pointer",
              fontFamily: FONT,
              borderRadius: 0,
              width: "100%",
            }}
          >
            SUIVANT
          </button>
        </div>
      </div>
    );
  }

  function renderStep2() {
    return (
      <div>
        <SectionTitle number="3" label="Formation" />
        {form.formation.map((f, i) => (
          <div key={i} style={{ marginBottom: "14px", border: "1px solid #e8e8e6", padding: "16px", background: "#fafaf8" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "10px" }}>
              <div>
                <label style={labelStyle}>Ecole / Universite</label>
                <input style={inputStyle} value={f.ecole} onChange={e => setFormationItem(i, "ecole", e.target.value)} placeholder="Universite de Paris" />
              </div>
              <div>
                <label style={labelStyle}>Annee</label>
                <input style={inputStyle} value={f.annee} onChange={e => setFormationItem(i, "annee", e.target.value)} placeholder="2023 - 2025" />
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Filiere / Specialite</label>
                <input style={inputStyle} value={f.filiere} onChange={e => setFormationItem(i, "filiere", e.target.value)} placeholder="Master Informatique" />
              </div>
              {form.formation.length > 1 && (
                <button
                  onClick={() => setForm(prev => ({ ...prev, formation: prev.formation.filter((_, idx) => idx !== i) }))}
                  style={{ ...addBtnStyle, padding: "10px 12px", border: "1px solid #e8e8e6" }}
                >
                  x
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={() => setForm(f => ({ ...f, formation: [...f.formation, emptyFormation()] }))}
          style={addBtnStyle}
        >
          + Ajouter une formation
        </button>

        <SectionTitle number="4" label="Competences" />
        <div style={{ marginBottom: "14px" }}>
          <label style={labelStyle}>Competences techniques (separees par virgule)</label>
          <input
            style={inputStyle}
            value={form.competences}
            onChange={e => setField("competences", e.target.value)}
            placeholder="React, Node.js, Python, SQL..."
          />
        </div>
        <div>
          <label style={labelStyle}>Langues (ex: Arabe natif, Francais courant)</label>
          <input
            style={inputStyle}
            value={form.langues}
            onChange={e => setField("langues", e.target.value)}
            placeholder="Francais (natif), Anglais (B2)..."
          />
        </div>

        <SectionTitle number="5" label="Projets & Experiences" />
        {form.projets.map((p, i) => (
          <div key={i} style={{ marginBottom: "14px", border: "1px solid #e8e8e6", padding: "16px", background: "#fafaf8" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "10px" }}>
              <div>
                <label style={labelStyle}>Titre du projet / Poste</label>
                <input style={inputStyle} value={p.titre} onChange={e => setProjetItem(i, "titre", e.target.value)} placeholder="Projet / Poste" />
              </div>
              <div>
                <label style={labelStyle}>Date</label>
                <input style={inputStyle} value={p.date} onChange={e => setProjetItem(i, "date", e.target.value)} placeholder="Jan 2024 - Mar 2024" />
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  style={{ ...inputStyle, height: "70px", resize: "vertical" }}
                  value={p.description}
                  onChange={e => setProjetItem(i, "description", e.target.value)}
                  placeholder="Description du projet ou des responsabilites..."
                />
              </div>
              {form.projets.length > 1 && (
                <button
                  onClick={() => setForm(prev => ({ ...prev, projets: prev.projets.filter((_, idx) => idx !== i) }))}
                  style={{ ...addBtnStyle, padding: "10px 12px", border: "1px solid #e8e8e6", marginTop: "20px" }}
                >
                  x
                </button>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={() => setForm(f => ({ ...f, projets: [...f.projets, emptyProjet()] }))}
          style={addBtnStyle}
        >
          + Ajouter un projet / experience
        </button>

        <SectionTitle number="6" label="Lettre de motivation" />
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span style={{ fontSize: "14px", color: "#555555", fontFamily: FONT }}>
            Lettre de motivation (optionnel)
          </span>
          <button
            onClick={() => setField("lettreActive", !form.lettreActive)}
            style={{
              width: "28px",
              height: "16px",
              background: form.lettreActive ? "#111111" : "#ffffff",
              border: form.lettreActive ? "none" : "1px solid #cccccc",
              cursor: "pointer",
              position: "relative",
              borderRadius: "20px",
              padding: 0,
              transition: "background 0.2s",
              flexShrink: 0,
            }}
          >
            <span style={{
              position: "absolute",
              top: "2px",
              left: form.lettreActive ? "14px" : "2px",
              width: "12px",
              height: "12px",
              background: form.lettreActive ? "#ffffff" : "#cccccc",
              borderRadius: "50%",
              transition: "left 0.2s",
              display: "block",
            }} />
          </button>
        </div>

        {form.lettreActive && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label style={labelStyle}>Entreprise cible</label>
                <input style={inputStyle} value={form.entreprise} onChange={e => setField("entreprise", e.target.value)} placeholder="Google France" />
              </div>
              <div>
                <label style={labelStyle}>Poste vise</label>
                <input style={inputStyle} value={form.poste} onChange={e => setField("poste", e.target.value)} placeholder="Developpeur fullstack" />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Message personnalise (optionnel)</label>
              <textarea
                style={{ ...inputStyle, height: "90px", resize: "vertical" }}
                value={form.message}
                onChange={e => setField("message", e.target.value)}
                placeholder="Elements a mettre en avant..."
              />
            </div>
          </div>
        )}

        <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setStep(1)}
              style={{
                background: "#ffffff",
                color: "#888888",
                border: "1px solid #e8e8e6",
                padding: "13px 24px",
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: FONT,
                borderRadius: 0,
                letterSpacing: "0.05em",
                whiteSpace: "nowrap",
              }}
            >
              RETOUR
            </button>
            <button
              onClick={() => onGenerate(form, "cv")}
              disabled={loading}
              style={{
                flex: 1,
                background: loading ? "#555555" : "#111111",
                color: "#ffffff",
                border: "1px solid #111111",
                padding: "13px 20px",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: FONT,
                borderRadius: 0,
              }}
            >
              {loading ? "GENERATION EN COURS..." : "GENERER LE CV"}
            </button>
          </div>

          {form.lettreActive && (
            <button
              onClick={() => onGenerate(form, "both")}
              disabled={loading}
              style={{
                background: "transparent",
                color: loading ? "#aaaaaa" : "#888888",
                border: "1px solid #e8e8e6",
                padding: "12px 20px",
                fontSize: "14px",
                letterSpacing: "0.08em",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: FONT,
                borderRadius: 0,
                width: "100%",
              }}
            >
              CV + LETTRE
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: "100vw",
      height: "100vh",
      fontFamily: FONT,
      background: "#f9f9f7",
      overflow: "hidden",
    }}>
      <Stepper activeStep={stepperActive} />

      {step < 3 ? (
        <div style={{ display: "grid", gridTemplateColumns: "50vw 50vw", flex: 1, overflow: "hidden" }}>
          {/* Formulaire */}
          <div style={{
            overflowY: "auto",
            background: "#ffffff",
            borderRight: "1px solid #e8e8e6",
            padding: "32px 48px 56px",
            boxSizing: "border-box",
          }}>
            {step === 1 ? renderStep1() : renderStep2()}
          </div>

          {/* Apercu */}
          <div style={{
            overflowY: "auto",
            background: "#f4f4f2",
            padding: "32px 48px",
            boxSizing: "border-box",
          }}>
            <div style={{
              fontSize: "13px",
              color: "#aaaaaa",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontFamily: FONT,
            }}>
              Apercu
            </div>
            <CVPreview result={result} form={form} />
          </div>
        </div>
      ) : (
        /* Step 3 : apres generation, pleine largeur */
        <div style={{ flex: 1, overflow: "auto", padding: "48px", background: "#f4f4f2" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <CVPreview result={result} form={form} />
          </div>
        </div>
      )}
    </div>
  );
}
