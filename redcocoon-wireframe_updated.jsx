import { useState } from "react";

const COLORS = {
  bg: "#F5F0EB",
  dark: "#1A1612",
  accent: "#C4440A",
  accentLight: "#E8652B",
  warm: "#D4A574",
  cream: "#FAF7F3",
  muted: "#8A7D72",
  whatsapp: "#25D366",
  igPurple: "#833AB4",
  igRed: "#FD1D1D",
  igOrange: "#F77737",
};

const Section = ({ title, children, dark, accent }) => (
  <div style={{
    padding: "12px 16px",
    background: dark ? COLORS.dark : accent ? COLORS.accent : "transparent",
    color: dark || accent ? "#fff" : COLORS.dark,
    borderBottom: `1px solid ${dark || accent ? "transparent" : "#e0d8cf"}`,
  }}>
    {title && <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6, opacity: 0.6 }}>{title}</div>}
    {children}
  </div>
);

const Placeholder = ({ h, label, color, dashed, radius }) => (
  <div style={{
    height: h || 60,
    background: color || "rgba(0,0,0,0.06)",
    borderRadius: radius || 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 8,
    color: COLORS.muted,
    border: dashed ? `1.5px dashed ${COLORS.muted}` : "none",
    fontWeight: 500,
    letterSpacing: 0.5,
  }}>{label}</div>
);

const Button = ({ children, green, instagram, outline, small, full }) => (
  <div style={{
    padding: small ? "4px 10px" : "6px 14px",
    background: instagram ? `linear-gradient(135deg, ${COLORS.igPurple}, ${COLORS.igRed}, ${COLORS.igOrange})` : green ? COLORS.whatsapp : outline ? "transparent" : COLORS.accent,
    color: outline ? COLORS.dark : "#fff",
    border: outline ? `1.5px solid ${COLORS.dark}` : "none",
    borderRadius: 3,
    fontSize: small ? 7 : 8,
    fontWeight: 600,
    textAlign: "center",
    letterSpacing: 0.5,
    width: full ? "100%" : "auto",
    display: "inline-block",
  }}>{children}</div>
);

const NavBar = ({ isMobile }) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: isMobile ? "10px 16px" : "12px 32px",
    background: COLORS.bg,
    borderBottom: `1px solid #e0d8cf`,
    position: "sticky",
    top: 0,
    zIndex: 10,
  }}>
    <div style={{ fontWeight: 800, fontSize: isMobile ? 13 : 15, color: COLORS.dark, letterSpacing: -0.5 }}>
      RED<span style={{ color: COLORS.accent }}>COCOON</span>
    </div>
    {isMobile ? (
      <div style={{ fontSize: 14, cursor: "pointer" }}>☰</div>
    ) : (
      <div style={{ display: "flex", gap: 20, fontSize: 9, fontWeight: 500, color: COLORS.muted, letterSpacing: 1, textTransform: "uppercase" }}>
        <span>Shop</span>
        <span>Collections</span>
        <span>Hospitality</span>
        <span>Studio</span>
        <span>Contact</span>
      </div>
    )}
  </div>
);

const HeroSection = ({ isMobile }) => (
  <div style={{ position: "relative", background: COLORS.dark, overflow: "hidden" }}>
    <div style={{
      height: isMobile ? 180 : 240,
      background: `linear-gradient(135deg, ${COLORS.dark} 0%, #2a2118 40%, ${COLORS.accent}44 100%)`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: isMobile ? 16 : 32,
    }}>
      <div style={{
        position: "absolute",
        top: isMobile ? 12 : 20,
        right: isMobile ? 12 : 20,
        width: isMobile ? 80 : 160,
        height: isMobile ? 80 : 160,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.warm}55, transparent)`,
        opacity: 0.5,
      }} />
      <div style={{
        position: "absolute",
        top: isMobile ? 20 : 30,
        right: isMobile ? 20 : 40,
        width: isMobile ? 100 : 200,
        height: isMobile ? 100 : 180,
        borderRadius: 8,
        background: `linear-gradient(145deg, ${COLORS.warm}33, ${COLORS.accent}22)`,
        border: `1px solid ${COLORS.warm}33`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 7,
        color: COLORS.warm,
        letterSpacing: 1,
      }}>HERO IMAGE</div>
      <div style={{ color: COLORS.warm, fontSize: 8, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
        Handmade in Sri Lanka
      </div>
      <div style={{ color: "#fff", fontSize: isMobile ? 18 : 28, fontWeight: 800, lineHeight: 1.1, maxWidth: isMobile ? 160 : 300, letterSpacing: -0.5 }}>
        Clay, Fire &<br />Bold Expression
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <Button>Browse Pieces</Button>
        <Button outline><span style={{ color: "#fff" }}>Our Story</span></Button>
      </div>
    </div>
  </div>
);

const LatestPieces = ({ isMobile }) => {
  const cols = isMobile ? 2 : 4;
  const items = [
    { name: "Espresso Cup — Ember", code: "RC-EM-042" },
    { name: "Dinner Plate — Ocean", code: "RC-OC-018" },
    { name: "Sake Set — Ash", code: "RC-AS-007" },
    { name: "Bowl — Terracotta", code: "RC-TC-031" },
    { name: "Mug — Midnight", code: "RC-MN-055" },
    { name: "Vase — Sand", code: "RC-SD-023" },
  ];
  return (
    <Section title="Latest Pieces">
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 8,
        marginTop: 4,
      }}>
        {items.slice(0, isMobile ? 4 : 6).map((item, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              height: isMobile ? 70 : 90,
              background: `linear-gradient(${120 + i * 30}deg, ${COLORS.warm}33, ${["#c4440a22", "#d4a57433", "#8a7d7222", "#1a161222", "#e8652b22"][i % 5]})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 7,
              color: COLORS.muted,
            }}>Photo</div>
            <div style={{ padding: "6px 8px" }}>
              <div style={{ fontSize: 7.5, fontWeight: 600, color: COLORS.dark, lineHeight: 1.3 }}>{item.name}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                <span style={{ fontSize: 7, color: COLORS.accent, fontWeight: 600 }}>LKR 2,500</span>
                <span style={{ fontSize: 5.5, color: COLORS.muted, fontFamily: "monospace", background: COLORS.bg, padding: "1px 3px", borderRadius: 2 }}>{item.code}</span>
              </div>
              <div style={{ fontSize: 6.5, color: COLORS.muted, marginTop: 1 }}>3 remaining</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <Button outline small>View All Pieces →</Button>
      </div>
    </Section>
  );
};

const CollectionBanner = ({ isMobile }) => (
  <div style={{
    margin: isMobile ? "0 16px" : "0 16px",
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 6,
    overflow: "hidden",
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentLight})`,
    padding: isMobile ? 16 : 20,
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "space-between",
    gap: 12,
  }}>
    <div>
      <div style={{ color: "#ffffff99", fontSize: 7, letterSpacing: 2, fontWeight: 600, textTransform: "uppercase" }}>Current Collection</div>
      <div style={{ color: "#fff", fontSize: isMobile ? 14 : 18, fontWeight: 800, marginTop: 2 }}>Monsoon Series</div>
      <div style={{ color: "#ffffffcc", fontSize: 8, marginTop: 3, maxWidth: 240, lineHeight: 1.4 }}>Inspired by the raw energy of Sri Lanka's southwest monsoon — deep blues, storm greys, and explosive copper glazes.</div>
    </div>
    {!isMobile && <Placeholder h={80} label="Collection Photo" color="#ffffff22" radius={4} />}
    <div style={{ marginTop: isMobile ? 4 : 0 }}>
      <Button><span style={{ color: "#fff" }}>Explore Collection</span></Button>
    </div>
  </div>
);

const HospitalitySection = ({ isMobile }) => (
  <Section title="For Hotels, Cafés & Restaurants" dark>
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: 12,
      marginTop: 4,
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>
          Tableware as unique as your venue
        </div>
        <div style={{ fontSize: 8, lineHeight: 1.5, opacity: 0.8, marginBottom: 10 }}>
          Custom collections designed for your brand. From concept to table — personalized glazes, forms, and branding for boutique hospitality.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button>View Hospitality Portfolio</Button>
          <Button outline><span style={{ color: "#fff" }}>Request a Quote</span></Button>
        </div>
      </div>
      {!isMobile && (
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2].map(i => (
            <Placeholder key={i} h={80} label={`Project ${i}`} color="rgba(255,255,255,0.08)" radius={4} />
          ))}
        </div>
      )}
    </div>
    {isMobile && (
      <div style={{ display: "flex", gap: 6, marginTop: 8, overflowX: "auto" }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ minWidth: 100, height: 60, background: "rgba(255,255,255,0.06)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: "#ffffff55" }}>
            Project {i}
          </div>
        ))}
      </div>
    )}
  </Section>
);

const ProcessSection = ({ isMobile }) => (
  <Section title="The Process">
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: 10,
      marginTop: 4,
    }}>
      {["Shaping", "Glazing", "Firing", "Finishing"].map((step, i) => (
        <div key={i} style={{ flex: 1, textAlign: "center" }}>
          <div style={{
            height: isMobile ? 50 : 60,
            background: `linear-gradient(${180 + i * 45}deg, ${COLORS.warm}22, ${COLORS.accent}11)`,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 7,
            color: COLORS.muted,
            marginBottom: 4,
          }}>BTS Photo</div>
          <div style={{ fontSize: 8, fontWeight: 700, color: COLORS.dark }}>{step}</div>
          <div style={{ fontSize: 7, color: COLORS.muted, marginTop: 2, lineHeight: 1.3 }}>Brief description of this stage</div>
        </div>
      ))}
    </div>
  </Section>
);

const InstagramFeedHome = ({ isMobile }) => {
  const cols = isMobile ? 3 : 6;
  const posts = [
    { type: "photo", label: "Glazing close-up" },
    { type: "reel", label: "Throwing a bowl" },
    { type: "photo", label: "Kiln unloading" },
    { type: "photo", label: "New mugs lined up" },
    { type: "reel", label: "Glaze mixing" },
    { type: "photo", label: "Studio morning light" },
  ];
  return (
    <Section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", opacity: 0.6 }}>From the Studio</div>
          <div style={{ fontSize: 7.5, color: COLORS.muted, marginTop: 2 }}>Live from Instagram — auto-updated</div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          padding: "4px 10px", borderRadius: 20,
          background: `linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)`,
          color: "#fff", fontSize: 7, fontWeight: 600,
        }}>
          <span style={{ fontSize: 10 }}>📷</span> @redcocoon
        </div>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 3,
        borderRadius: 4,
        overflow: "hidden",
      }}>
        {posts.slice(0, cols).map((post, i) => (
          <div key={i} style={{
            position: "relative",
            aspectRatio: "1",
            background: `linear-gradient(${140 + i * 35}deg, ${COLORS.warm}33, ${["#833AB422", "#FD1D1D22", "#F7773722", "#833AB422", "#C4440A22", "#d4a57422"][i]})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 6.5,
            color: COLORS.muted,
            cursor: "pointer",
          }}>
            {post.type === "reel" && (
              <div style={{
                position: "absolute", top: 3, right: 3,
                background: "rgba(0,0,0,0.5)", color: "#fff",
                padding: "1px 4px", borderRadius: 2, fontSize: 5.5, fontWeight: 700,
              }}>▶ REEL</div>
            )}
            <div style={{ fontSize: 12, marginBottom: 2, opacity: 0.4 }}>📷</div>
            <span style={{ textAlign: "center", padding: "0 2px", lineHeight: 1.2 }}>{post.label}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 8, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
        <Button instagram small>📩 DM Us to Order</Button>
        <Button outline small>Follow @redcocoon →</Button>
      </div>
    </Section>
  );
};

const StudioPage = ({ isMobile }) => {
  const cols = isMobile ? 3 : 4;
  const highlights = [
    { label: "Process", emoji: "🔥" },
    { label: "Glazes", emoji: "🎨" },
    { label: "Hotels", emoji: "🏨" },
    { label: "Packing", emoji: "📦" },
    { label: "Studio", emoji: "🏠" },
  ];
  const gridPosts = Array.from({ length: isMobile ? 9 : 12 }).map((_, i) => ({
    type: i % 4 === 1 ? "reel" : "photo",
    label: ["Throwing", "Trimming", "Glazing", "Firing", "New piece", "Studio cat", "Clay prep", "Kiln day", "Packing orders", "Morning light", "Glaze test", "Finished set"][i % 12],
  }));
  return (
    <>
      <div style={{ background: "#fff", margin: "0", overflow: "hidden" }}>
        <div style={{ padding: "6px 12px", background: COLORS.dark, color: COLORS.warm, fontSize: 7, fontWeight: 600, letterSpacing: 1 }}>
          ← STUDIO PAGE
        </div>
        {/* Artist intro */}
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 12,
          padding: isMobile ? 12 : 16,
          alignItems: isMobile ? "center" : "flex-start",
        }}>
          <div style={{
            width: isMobile ? 60 : 80, height: isMobile ? 60 : 80,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.warm}44, ${COLORS.accent}33)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 8, color: COLORS.muted, flexShrink: 0,
          }}>Portrait</div>
          <div style={{ textAlign: isMobile ? "center" : "left" }}>
            <div style={{ fontSize: isMobile ? 13 : 16, fontWeight: 800, color: COLORS.dark }}>The Potter Behind Redcocoon</div>
            <div style={{ fontSize: 8, color: COLORS.muted, lineHeight: 1.5, marginTop: 4, maxWidth: 360 }}>
              Artist statement goes here — your story of how Redcocoon began, your philosophy on handmade ceramics, and what drives your bold aesthetic.
            </div>
          </div>
        </div>

        {/* Story Highlights — repurposed as video/image sections */}
        <div style={{ padding: "0 12px 10px" }}>
          <div style={{ fontSize: 8, fontWeight: 700, color: COLORS.dark, marginBottom: 6, letterSpacing: 0.5 }}>
            Story Highlights
            <span style={{ fontWeight: 400, color: COLORS.muted, fontSize: 7, marginLeft: 6 }}>Saved from Instagram Stories</span>
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {highlights.map((h, i) => (
              <div key={i} style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{
                  width: isMobile ? 40 : 48, height: isMobile ? 40 : 48,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)`,
                  padding: 2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{
                    width: "100%", height: "100%",
                    borderRadius: "50%",
                    background: "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: isMobile ? 14 : 16,
                  }}>{h.emoji}</div>
                </div>
                <div style={{ fontSize: 6.5, color: COLORS.muted, marginTop: 3, fontWeight: 600 }}>{h.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Instagram Grid */}
        <div style={{ padding: "0 12px 12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <div style={{ fontSize: 8, fontWeight: 700, color: COLORS.dark, letterSpacing: 0.5 }}>
              Instagram Feed
              <span style={{ fontWeight: 400, color: COLORS.muted, fontSize: 7, marginLeft: 6 }}>Auto-synced</span>
            </div>
            <div style={{
              padding: "3px 8px", borderRadius: 12,
              background: `linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)`,
              color: "#fff", fontSize: 6.5, fontWeight: 600,
            }}>@redcocoon</div>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: 3,
          }}>
            {gridPosts.map((post, i) => (
              <div key={i} style={{
                position: "relative",
                aspectRatio: "1",
                background: `linear-gradient(${100 + i * 28}deg, ${COLORS.warm}${20 + (i % 3) * 10}, ${["#833AB4", "#FD1D1D", "#F77737", "#C4440A"][i % 4]}22)`,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 6,
                color: COLORS.muted,
              }}>
                {post.type === "reel" && (
                  <div style={{
                    position: "absolute", top: 2, right: 2,
                    background: "rgba(0,0,0,0.5)", color: "#fff",
                    padding: "1px 3px", borderRadius: 2, fontSize: 5, fontWeight: 700,
                  }}>▶</div>
                )}
                <span style={{ textAlign: "center", lineHeight: 1.2, padding: "0 2px" }}>{post.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process section still lives here on studio page too */}
      <ProcessSection isMobile={isMobile} />
    </>
  );
};

const ReservationFlow = ({ isMobile }) => (
  <Section title="How to Reserve">
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: 10,
      marginTop: 4,
      marginBottom: 4,
    }}>
      {[
        { num: "1", title: "Browse & Choose", desc: "Find a piece you love — note the piece code" },
        { num: "2", title: "Message Us", desc: "Send us the piece code via:", channels: true },
        { num: "3", title: "Bank Transfer", desc: "We'll confirm availability & send bank details" },
        { num: "4", title: "Collect or Deliver", desc: "Pick up from studio or we'll ship island-wide" },
      ].map((step, i) => (
        <div key={i} style={{ flex: 1, display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div style={{
            width: 20, height: 20, borderRadius: "50%",
            background: COLORS.accent, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, fontWeight: 700, flexShrink: 0,
          }}>{step.num}</div>
          <div>
            <div style={{ fontSize: 8, fontWeight: 700, color: COLORS.dark }}>{step.title}</div>
            <div style={{ fontSize: 7, color: COLORS.muted, lineHeight: 1.3, marginTop: 1 }}>{step.desc}</div>
            {step.channels && (
              <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                <div style={{
                  padding: "2px 6px", borderRadius: 3,
                  background: `linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)`,
                  color: "#fff", fontSize: 6, fontWeight: 600,
                }}>📩 Instagram</div>
                <div style={{
                  padding: "2px 6px", borderRadius: 3,
                  background: COLORS.whatsapp,
                  color: "#fff", fontSize: 6, fontWeight: 600,
                }}>💬 WhatsApp</div>
                <div style={{
                  padding: "2px 6px", borderRadius: 3,
                  background: COLORS.bg,
                  color: COLORS.muted, fontSize: 6, fontWeight: 600,
                }}>📋 Form</div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const PieceDetail = ({ isMobile }) => (
  <div style={{ background: "#fff", margin: "8px 0", borderRadius: 4, overflow: "hidden" }}>
    <div style={{ padding: "6px 12px", background: COLORS.dark, color: COLORS.warm, fontSize: 7, fontWeight: 600, letterSpacing: 1 }}>
      ← PIECE DETAIL VIEW
    </div>
    <div style={{
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: 12,
    }}>
      <div style={{ flex: isMobile ? "none" : 1 }}>
        <div style={{
          height: isMobile ? 120 : 150,
          background: `linear-gradient(135deg, ${COLORS.warm}33, ${COLORS.accent}22)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 8,
          color: COLORS.muted,
        }}>Main Product Photo</div>
        {!isMobile && (
          <div style={{ display: "flex", gap: 4, padding: "4px 8px" }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ flex: 1, height: 35, background: `${COLORS.warm}${15 + i * 8}`, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 6, color: COLORS.muted }}>
                {i}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ flex: isMobile ? "none" : 1, padding: isMobile ? "8px 12px" : "12px 16px 12px 0" }}>
        <div style={{ fontSize: 7, color: COLORS.accent, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Monsoon Series</div>
        <div style={{ fontSize: isMobile ? 13 : 16, fontWeight: 800, color: COLORS.dark, marginTop: 2 }}>Espresso Cup — Ember</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, marginTop: 4 }}>LKR 2,500</div>
        <div style={{ fontSize: 7.5, color: COLORS.muted, marginTop: 6, lineHeight: 1.5 }}>
          Hand-thrown stoneware espresso cup with a copper-red glaze inspired by monsoon sunsets. Each piece is unique — slight variations in glaze are part of the character.
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 4, fontSize: 7, color: COLORS.muted }}>
          <span>⊙ 80ml</span>
          <span>⊙ Stoneware</span>
          <span>⊙ Food safe</span>
          <span>⊙ 5 remaining</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
          <Button instagram full>📩 Reserve via Instagram DM</Button>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ flex: 1 }}><Button green full>💬 WhatsApp</Button></div>
            <div style={{ flex: 1 }}><Button outline full>📋 Reservation Form</Button></div>
          </div>
          <div style={{
            fontSize: 6.5, color: COLORS.muted, textAlign: "center", marginTop: 2,
            padding: "4px 8px", background: COLORS.bg, borderRadius: 3, lineHeight: 1.4,
          }}>
            Mention piece code <span style={{ fontWeight: 700, color: COLORS.dark }}>RC-EM-042</span> when you message us
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Footer = ({ isMobile }) => (
  <div style={{ background: COLORS.dark, color: "#ffffff88", fontSize: 7 }}>
    {/* Reserve CTA banner */}
    <div style={{
      padding: isMobile ? "10px 16px" : "12px 32px",
      background: `linear-gradient(135deg, #1A161200, #833AB422)`,
      borderTop: `1px solid #ffffff11`,
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: 8,
      alignItems: isMobile ? "stretch" : "center",
      justifyContent: "center",
    }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: "#fff", textAlign: isMobile ? "center" : "left" }}>
        Ready to reserve a piece?
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        <div style={{
          padding: "5px 12px", borderRadius: 4,
          background: `linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)`,
          color: "#fff", fontSize: 7.5, fontWeight: 600, textAlign: "center",
        }}>📩 Instagram DM</div>
        <div style={{
          padding: "5px 12px", borderRadius: 4,
          background: COLORS.whatsapp,
          color: "#fff", fontSize: 7.5, fontWeight: 600, textAlign: "center",
        }}>💬 WhatsApp</div>
        <div style={{
          padding: "5px 12px", borderRadius: 4,
          border: "1px solid #ffffff33",
          color: "#ffffff99", fontSize: 7.5, fontWeight: 600, textAlign: "center",
        }}>📋 Form</div>
      </div>
    </div>
    {/* Main footer */}
    <div style={{
      padding: isMobile ? "12px 16px" : "16px 32px",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: 12,
      justifyContent: "space-between",
      borderTop: `1px solid #ffffff11`,
    }}>
      <div>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: 11, marginBottom: 4 }}>
          RED<span style={{ color: COLORS.accent }}>COCOON</span>
        </div>
        <div style={{ lineHeight: 1.5 }}>Handmade ceramics studio<br />Colombo, Sri Lanka</div>
      </div>
      <div style={{ display: "flex", gap: isMobile ? 16 : 32 }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 600, marginBottom: 3, fontSize: 7.5 }}>Browse</div>
          <div style={{ lineHeight: 1.8 }}>All Pieces<br />Collections<br />Hospitality</div>
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: 600, marginBottom: 3, fontSize: 7.5 }}>Connect</div>
          <div style={{ lineHeight: 2 }}>
            <span style={{ color: "#F77737" }}>●</span> Instagram<br />
            <span style={{ color: COLORS.whatsapp }}>●</span> WhatsApp<br />
            <span style={{ color: COLORS.warm }}>●</span> Email
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 140 }}>
        <div style={{ color: "#fff", fontWeight: 600, marginBottom: 3, fontSize: 7.5 }}>Stay Updated</div>
        <div style={{ lineHeight: 1.5, marginBottom: 6 }}>New pieces & collections straight to your inbox</div>
        <Placeholder h={22} label="Email signup" dashed color="rgba(255,255,255,0.06)" />
      </div>
    </div>
  </div>
);

const ShopBrowse = ({ isMobile }) => {
  const cols = isMobile ? 2 : 3;
  const categories = ["All", "Cups", "Plates", "Bowls", "Vases", "Sets"];
  return (
    <div style={{ background: "#fff", margin: "8px 0", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ padding: "6px 12px", background: COLORS.dark, color: COLORS.warm, fontSize: 7, fontWeight: 600, letterSpacing: 1 }}>
        ← SHOP / BROWSE VIEW
      </div>
      <div style={{ padding: "8px 12px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
          {categories.map((cat, i) => (
            <div key={i} style={{
              padding: "3px 10px",
              borderRadius: 20,
              fontSize: 7,
              fontWeight: 600,
              background: i === 0 ? COLORS.dark : "transparent",
              color: i === 0 ? "#fff" : COLORS.muted,
              border: `1px solid ${i === 0 ? COLORS.dark : "#ddd"}`,
            }}>{cat}</div>
          ))}
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 8,
        }}>
          {Array.from({ length: isMobile ? 6 : 9 }).map((_, i) => (
            <div key={i} style={{ background: COLORS.bg, borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                height: isMobile ? 60 : 70,
                background: `linear-gradient(${100 + i * 25}deg, ${COLORS.warm}22, ${COLORS.accent}${10 + i * 3})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 7,
                color: COLORS.muted,
              }}>Photo</div>
              <div style={{ padding: "4px 6px" }}>
                <div style={{ fontSize: 7, fontWeight: 600, color: COLORS.dark }}>Piece Name</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
                  <span style={{ fontSize: 7, color: COLORS.accent, fontWeight: 600 }}>LKR 2,500</span>
                  <span style={{ fontSize: 5.5, color: COLORS.muted, fontFamily: "monospace", background: COLORS.bg, padding: "1px 3px", borderRadius: 2 }}>RC-{String(i).padStart(3,"0")}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 1 }}>
                  <span style={{ fontSize: 6, color: COLORS.muted }}>{Math.floor(Math.random() * 5) + 1} left</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      position: "fixed",
      bottom: 52,
      right: 12,
      zIndex: 30,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 6,
    }}>
      {open && (
        <div style={{
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          padding: 10,
          width: 160,
          animation: "fadeIn 0.15s ease",
        }}>
          <div style={{ fontSize: 7.5, fontWeight: 700, color: COLORS.dark, marginBottom: 6 }}>Reserve a piece</div>
          <div style={{
            padding: "7px 10px",
            background: `linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)`,
            borderRadius: 4,
            color: "#fff",
            fontSize: 8,
            fontWeight: 600,
            textAlign: "center",
            marginBottom: 5,
            cursor: "pointer",
          }}>📩 Instagram DM</div>
          <div style={{
            padding: "7px 10px",
            background: COLORS.whatsapp,
            borderRadius: 4,
            color: "#fff",
            fontSize: 8,
            fontWeight: 600,
            textAlign: "center",
            marginBottom: 5,
            cursor: "pointer",
          }}>💬 WhatsApp</div>
          <div style={{
            padding: "5px 10px",
            background: COLORS.bg,
            borderRadius: 4,
            color: COLORS.muted,
            fontSize: 7,
            fontWeight: 500,
            textAlign: "center",
            cursor: "pointer",
          }}>📋 Reservation Form</div>
        </div>
      )}
      <div
        onClick={() => setOpen(!open)}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: `linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          cursor: "pointer",
          boxShadow: "0 3px 12px rgba(131,58,180,0.4)",
          transition: "transform 0.2s",
          transform: open ? "rotate(45deg)" : "none",
        }}
      >{open ? "✕" : "📩"}</div>
    </div>
  );
};

const MobileNav = () => (
  <div style={{
    position: "sticky",
    bottom: 0,
    background: "#fff",
    borderTop: `1px solid #e0d8cf`,
    display: "flex",
    justifyContent: "space-around",
    padding: "6px 0 8px",
    zIndex: 10,
  }}>
    {[
      { icon: "🏠", label: "Home" },
      { icon: "🍶", label: "Shop" },
      { icon: "🏨", label: "Trade" },
      { icon: "📖", label: "Studio" },
      { icon: "📩", label: "DM Us" },
    ].map((item, i) => (
      <div key={i} style={{ textAlign: "center", fontSize: 6.5, color: i === 0 ? COLORS.accent : COLORS.muted, fontWeight: 600 }}>
        <div style={{ fontSize: 12, marginBottom: 1 }}>{item.icon}</div>
        {item.label}
      </div>
    ))}
  </div>
);

const AnnotationBadge = ({ text, color }) => (
  <div style={{
    display: "inline-block",
    padding: "3px 8px",
    background: color || "#FF6B3520",
    color: color ? "#fff" : "#FF6B35",
    borderRadius: 3,
    fontSize: 7,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginBottom: 6,
  }}>{text}</div>
);

export default function RedcocoonWireframe() {
  const [view, setView] = useState("mobile");
  const [page, setPage] = useState("home");
  const isMobile = view === "mobile";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#2C2825",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: COLORS.dark,
      padding: "20px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>
          RED<span style={{ color: COLORS.accent }}>COCOON</span>
          <span style={{ fontSize: 13, fontWeight: 400, color: COLORS.muted, marginLeft: 8 }}>Website Layout</span>
        </h1>
        <p style={{ color: COLORS.muted, fontSize: 11, margin: "6px 0 16px", lineHeight: 1.4 }}>
          Interactive wireframe — toggle between views and pages
        </p>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
          <div style={{
            display: "inline-flex",
            background: "#1A1612",
            borderRadius: 6,
            padding: 3,
            gap: 2,
          }}>
            {["mobile", "desktop"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "6px 16px",
                borderRadius: 4,
                border: "none",
                background: view === v ? COLORS.accent : "transparent",
                color: view === v ? "#fff" : COLORS.muted,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.2s",
              }}>{v === "mobile" ? "📱 Mobile" : "🖥 Desktop"}</button>
            ))}
          </div>
          <div style={{
            display: "inline-flex",
            background: "#1A1612",
            borderRadius: 6,
            padding: 3,
            gap: 2,
          }}>
            {["home", "shop", "piece", "studio"].map(p => (
              <button key={p} onClick={() => setPage(p)} style={{
                padding: "6px 14px",
                borderRadius: 4,
                border: "none",
                background: page === p ? COLORS.warm : "transparent",
                color: page === p ? COLORS.dark : COLORS.muted,
                fontSize: 10,
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.2s",
              }}>{p === "piece" ? "Piece Detail" : p === "home" ? "Homepage" : p === "studio" ? "Studio" : "Shop"}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Device Frame */}
      <div style={{
        maxWidth: isMobile ? 320 : 720,
        margin: "0 auto",
        background: COLORS.bg,
        borderRadius: isMobile ? 24 : 8,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        border: isMobile ? "8px solid #111" : "3px solid #333",
        position: "relative",
      }}>
        {/* Notch for mobile */}
        {isMobile && (
          <div style={{
            width: 80,
            height: 18,
            background: "#111",
            borderRadius: "0 0 12px 12px",
            margin: "0 auto",
            position: "relative",
            zIndex: 20,
          }} />
        )}

        {/* Scrollable content */}
        <div style={{
          height: isMobile ? 540 : 480,
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
        }}>
          <NavBar isMobile={isMobile} />

          {page === "home" && (
            <>
              <HeroSection isMobile={isMobile} />
              <LatestPieces isMobile={isMobile} />
              <CollectionBanner isMobile={isMobile} />
              <HospitalitySection isMobile={isMobile} />
              <ProcessSection isMobile={isMobile} />
              <InstagramFeedHome isMobile={isMobile} />
              <ReservationFlow isMobile={isMobile} />
              <Footer isMobile={isMobile} />
            </>
          )}

          {page === "shop" && (
            <>
              <ShopBrowse isMobile={isMobile} />
              <Footer isMobile={isMobile} />
            </>
          )}

          {page === "piece" && (
            <>
              <PieceDetail isMobile={isMobile} />
              <Section title="You might also like">
                <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} style={{ minWidth: isMobile ? 100 : 120, background: "#fff", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: 60, background: `${COLORS.warm}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: COLORS.muted }}>Photo</div>
                      <div style={{ padding: "4px 6px" }}>
                        <div style={{ fontSize: 7, fontWeight: 600 }}>Related Piece {i}</div>
                        <div style={{ fontSize: 7, color: COLORS.accent }}>LKR 2,500</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
              <Footer isMobile={isMobile} />
            </>
          )}

          {page === "studio" && (
            <>
              <StudioPage isMobile={isMobile} />
              <Footer isMobile={isMobile} />
            </>
          )}
        </div>

        {/* Mobile bottom nav */}
        {isMobile && <MobileNav />}
        {isMobile && <FloatingContact />}
      </div>

      {/* Annotations */}
      <div style={{
        maxWidth: 720,
        margin: "24px auto 0",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12,
      }}>
        {[
          { badge: "LAYOUT", title: "Mobile-First, Image-Led", desc: "Single column on mobile, expanding to multi-column grid on desktop. Photography is the hero — every section leads with visuals." },
          { badge: "RESERVATION", title: "Instagram DM-First, WhatsApp Always Available", desc: "Three tiers everywhere: Instagram DM (primary — where orders already happen), WhatsApp (secondary — for non-IG users), reservation form (fallback for international). Floating button on mobile gives instant access from any page." },
          { badge: "INSTAGRAM", title: "Auto-Synced Feed", desc: "Homepage 'From the Studio' section auto-pulls latest posts via Squarespace's native Instagram block. Zero maintenance — post to IG and your site updates." },
          { badge: "B2B", title: "Hospitality Section", desc: "Same brand experience, dedicated section with portfolio of past hotel/restaurant projects and custom inquiry form." },
          { badge: "STUDIO PAGE", title: "Instagram as Content Engine", desc: "Full IG grid becomes your process documentation. Story Highlights repurposed as categorized video/photo sections (Process, Glazes, Hotels, etc.)." },
          { badge: "CATALOG", title: "50+ Piece Grid", desc: "Filterable by category and collection. Stock count creates urgency. Product photos uploaded directly — not dependent on Instagram." },
        ].map((note, i) => (
          <div key={i} style={{
            background: "#1A1612",
            borderRadius: 6,
            padding: 12,
            borderLeft: `3px solid ${COLORS.accent}`,
          }}>
            <AnnotationBadge text={note.badge} />
            <div style={{ color: "#fff", fontSize: 11, fontWeight: 700, marginBottom: 3 }}>{note.title}</div>
            <div style={{ color: COLORS.muted, fontSize: 9, lineHeight: 1.5 }}>{note.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
