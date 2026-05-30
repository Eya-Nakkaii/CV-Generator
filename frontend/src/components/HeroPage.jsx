const FONT = "'Inter', system-ui, sans-serif";

export default function HeroPage({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f9f9f7", fontFamily: FONT }}>
      <nav style={{
        background: "#ffffff",
        borderBottom: "1px solid #e8e8e6",
        padding: "18px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: FONT, fontWeight: 500, fontSize: "14px", color: "#111111" }}>
          CV.gen
        </span>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Accueil", "Comment ca marche", "Modeles"].map(link => (
            <a key={link} href="#" style={{
              fontFamily: FONT,
              fontSize: "12px",
              color: "#888888",
              textDecoration: "none",
            }}>
              {link}
            </a>
          ))}
        </div>
      </nav>

      <div style={{
        minHeight: "calc(100vh - 57px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}>
        <h1 style={{
          fontFamily: FONT,
          fontWeight: 300,
          fontSize: "40px",
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          color: "#111111",
          margin: 0,
        }}>
          {"Creez votre "}
          <em style={{ fontStyle: "italic", fontWeight: 400 }}>CV professionnel</em>
          <br />
          {"en quelques minutes."}
        </h1>

        <p style={{
          fontFamily: FONT,
          fontSize: "13px",
          color: "#888888",
          fontWeight: 300,
          marginTop: "12px",
          margin: "12px 0 0 0",
        }}>
          Remplissez le formulaire, choisissez un modele et telechargez votre CV.
        </p>

        <button
          onClick={onStart}
          style={{
            fontFamily: FONT,
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            padding: "12px 36px",
            background: "#111111",
            color: "#ffffff",
            border: "1px solid #111111",
            borderRadius: 0,
            cursor: "pointer",
            marginTop: "32px",
          }}
        >
          COMMENCER
        </button>
      </div>
    </div>
  );
}
