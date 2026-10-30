import { useCallback, useEffect, useState } from "react";
import { getHealthProfile, saveHealthProfile } from "../services/healthProfileService";
import "./Profile.css";

const EMPTY_PROFILE = {
  age: "", gender: "", height: "", weight: "",
  activityLevel: "sedentary", goal: "", dietPreferences: [],
  sleepHours: "", waterIntake: "",
};

const ACTIVITY_OPTIONS = [
  ["sedentary", "Sedentary"], ["light", "Lightly active"],
  ["moderate", "Moderately active"], ["active", "Very active"],
  ["very active", "Extra active"],
];
const GOAL_OPTIONS = [
  ["lose_weight", "Lose Weight"], ["maintain_weight", "Maintain Weight"],
  ["gain_weight", "Gain Weight"], ["build_muscle", "Build Muscle"],
];
const DIET_OPTIONS = ["Vegetarian", "Non-vegetarian", "Vegan", "Eggetarian", "Pescatarian"];

function normalizeProfile(data) {
  const p = data?.profile ?? data?.healthProfile ?? data?.data ?? data ?? {};
  return {
    ...EMPTY_PROFILE,
    ...p,
    age: p.age ?? "",
    height: p.height ?? "",
    weight: p.weight ?? "",
    sleepHours: p.sleepHours ?? "",
    waterIntake: p.waterIntake ?? "",
    dietPreferences: Array.isArray(p.dietPreferences)
      ? p.dietPreferences
      : p.dietPreference ? [p.dietPreference] : [],
  };
}

function Field({ label, children }) {
  return <label className="hp-field"><span>{label}</span>{children}</label>;
}

function SectionTitle({ number, title, subtitle }) {
  return <div className="hp-section-title">
    <span className="hp-section-number">{number}</span>
    <div><h2>{title}</h2><p>{subtitle}</p></div>
  </div>;
}

export default function Profile() {
  const [form, setForm] = useState(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [notice, setNotice] = useState({ type: "", text: "" });

  const token = localStorage.getItem("token");

  
const loadProfile = useCallback(async () => {
  setLoading(true);
  setNotice({ type: "", text: "" });

  try {
    const data = await getHealthProfile(token);

    // Backend response ke andar actual profile data hai
    const profileData = data.profile;

    const normalized = normalizeProfile(profileData);

    setForm(normalized);
    setHasProfile(Boolean(profileData));
  } catch (error) {
    if (error.status === 404) {
      // First-time user: profile abhi create nahi hui
      setForm(EMPTY_PROFILE);
      setHasProfile(false);
      setNotice({ type: "", text: "" });
    } else {
      setNotice({
        type: "error",
        text: error.message || "Could not load your profile.",
      });
    }
  } finally {
    setLoading(false);
  }
}, [token]);


  useEffect(() => {
    if (!token) {
      setNotice({ type: "error", text: "Please log in to view your health profile." });
      setLoading(false);
      return;
    }
    loadProfile();
  }, [loadProfile, token]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  }

  function toggleDiet(option) {
    setForm(current => ({
      ...current,
      dietPreferences: current.dietPreferences.includes(option)
        ? current.dietPreferences.filter(item => item !== option)
        : [...current.dietPreferences, option],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setNotice({ type: "", text: "" });
    try {
      const payload = {
        ...form,
        age: Number(form.age),
        height: Number(form.height),
        weight: Number(form.weight),
        sleepHours: Number(form.sleepHours),
        waterIntake: Number(form.waterIntake),
      };
      await saveHealthProfile(payload, token);
      setHasProfile(true);
      setNotice({ type: "success", text: "Your health profile has been saved." });
    } catch (error) {
      setNotice({ type: "error", text: error.message || "Could not save your profile." });
    } finally {
      setSaving(false);
    }
  }

  const display = (value, suffix = "") => value !== "" && value != null ? `${value}${suffix}` : "Not set";
  const activityLabel = ACTIVITY_OPTIONS.find(([value]) => value === form.activityLevel)?.[1] || form.activityLevel || "Not set";

  return <div className="hp-app">
    <aside className="hp-sidebar">
      <div className="hp-brand"><span className="hp-brand-mark">♥</span><div><strong>AI Health Coach</strong><small>Better Health, Brighter You</small></div></div>
      <nav className="hp-nav">
        <a href="/dashboard">⌂ <span>Dashboard</span></a>
        <a className="active" href="/profile">♟ <span>Profile</span></a>
        <a href="/progress">▥ <span>Progress</span></a>
        <a href="/nutrition">♜ <span>Nutrition</span></a>
        <a href="/activity">↗ <span>Activity</span></a>
        <a href="/ai-coach">▣ <span>AI Coach</span></a>
      </nav>
      <button className="hp-logout" onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}>⇥ <span>Logout</span></button>
    </aside>

    <main className="hp-main">
      <header className="hp-topbar">
        <span className="hp-topbar-spacer" />
        <button className="hp-icon-button" aria-label="Notifications">♧</button>
        <div className="hp-user"><span className="hp-avatar-small">SS</span><strong>{localStorage.getItem("name") || "Your Account"}</strong><span>⌄</span></div>
      </header>

      <div className="hp-content">
        <div className="hp-page-heading">
          <div className="hp-heading-icon">♟</div>
          <div><h1>Health Profile</h1><p>Tell us about yourself so we can provide personalized health insights and recommendations.</p></div>
          <div className={`hp-save-status ${hasProfile ? "is-saved" : ""}`}><strong>● {hasProfile ? "Profile Saved" : "Your Profile"}</strong><small>{hasProfile ? "Your details are up to date" : "Complete your details below"}</small></div>
        </div>

        {notice.text && <div className={`hp-notice ${notice.type}`} role="status">{notice.text}</div>}

        <div className="hp-layout">
          <form className="hp-form-card" onSubmit={handleSubmit}>
            {loading ? <div className="hp-loading"><span className="hp-spinner" /><strong>Loading your profile...</strong><p>Please wait while we fetch your health data.</p></div> : <>
              <section className="hp-form-section">
                <SectionTitle number="1" title="Personal Information" subtitle="Your basic details help us calculate your health metrics." />
                <div className="hp-personal-grid">
                  <div className="hp-profile-placeholder"><span>♟</span><small>Health profile</small></div>
                  <div className="hp-fields-grid">
                    <Field label="Age"><input name="age" type="number" min="1" max="120" value={form.age} onChange={updateField} placeholder="Enter age" required /></Field>
                    <Field label="Gender"><select name="gender" value={form.gender} onChange={updateField} required><option value="">Select gender</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option><option value="prefer_not_to_say">Prefer not to say</option></select></Field>
                    <Field label="Height (cm)"><input name="height" type="number" min="30" max="300" value={form.height} onChange={updateField} placeholder="e.g. 175" required /></Field>
                    <Field label="Weight (kg)"><input name="weight" type="number" min="1" max="500" step="0.1" value={form.weight} onChange={updateField} placeholder="e.g. 72" required /></Field>
                  </div>
                </div>
              </section>

              <section className="hp-form-section">
                <SectionTitle number="2" title="Lifestyle & Goals" subtitle="Tell us about your daily lifestyle and health goals." />
                <div className="hp-fields-grid hp-three-columns">
                  <Field label="Activity Level"><select name="activityLevel" value={form.activityLevel} onChange={updateField} required>{ACTIVITY_OPTIONS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></Field>
                  <Field label="Fitness Goal"><select name="goal" value={form.goal} onChange={updateField} required><option value="">Select goal</option>{GOAL_OPTIONS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></Field>
                  <Field label="Diet Preference"><select value={form.dietPreferences[0] || ""} onChange={e => setForm(current => ({ ...current, dietPreferences: e.target.value ? [e.target.value] : [] }))}><option value="">Select diet</option>{DIET_OPTIONS.map(option => <option value={option} key={option}>{option}</option>)}</select></Field>
                </div>
                <div className="hp-diet-options"><span>Additional preferences</span>{DIET_OPTIONS.map(option => <label key={option} className="hp-check"><input type="checkbox" checked={form.dietPreferences.includes(option)} onChange={() => toggleDiet(option)} />{option}</label>)}</div>
              </section>

              <section className="hp-form-section hp-last-section">
                <SectionTitle number="3" title="Daily Habits" subtitle="Your daily habits play a big role in your overall health." />
                <div className="hp-fields-grid">
                  <Field label="Sleep Hours (per night)"><div className="hp-input-with-icon"><span>☾</span><input name="sleepHours" type="number" min="0" max="24" step="0.5" value={form.sleepHours} onChange={updateField} placeholder="e.g. 7" required /></div></Field>
                  <Field label="Water Intake (liters/day)"><div className="hp-input-with-icon"><span>♢</span><input name="waterIntake" type="number" min="0" max="20" step="0.1" value={form.waterIntake} onChange={updateField} placeholder="e.g. 2.5" required /></div></Field>
                </div>
              </section>
              <div className="hp-form-actions">
                <button type="button" className="hp-reset-button" onClick={() => setForm(hasProfile ? form : EMPTY_PROFILE)}>↻ Reset</button>
                <button type="submit" className="hp-save-button" disabled={saving}>{saving ? "Saving..." : "▣  Save Profile"}</button>
              </div>
            </>}
          </form>

          <aside className="hp-summary-card">
            <div className="hp-summary-intro"><div className="hp-summary-icon">♟</div><div><h2>Your Health Profile</h2><p>Complete your profile for better health insights and personalized plans.</p></div></div>
            <div className="hp-summary-list">
              <SummaryRow icon="♟" label="Age" value={display(form.age, " years")} />
              <SummaryRow icon="⚥" label="Gender" value={display(form.gender)} />
              <SummaryRow icon="↕" label="Height" value={display(form.height, " cm")} />
              <SummaryRow icon="▣" label="Weight" value={display(form.weight, " kg")} />
              <SummaryRow icon="↗" label="Activity Level" value={activityLabel} />
              <SummaryRow icon="◎" label="Goal" value={display(form.goal?.replaceAll("_", " "))} />
              <SummaryRow icon="❧" label="Diet Preference" value={display(form.dietPreferences.join(", "))} />
              <SummaryRow icon="☾" label="Sleep Hours" value={display(form.sleepHours, " hours")} />
              <SummaryRow icon="♢" label="Water Intake" value={display(form.waterIntake, " L")} />
            </div>
            <div className="hp-tip"><span>♧</span><div><strong>Complete your profile</strong><p>Accurate information helps us give you better recommendations!</p></div></div>
          </aside>
        </div>
        <p className="hp-footer-note">Your health information is personal. Keep it accurate for more relevant insights.</p>
      </div>
    </main>
  </div>;
}

function SummaryRow({ icon, label, value }) {
  return <div className="hp-summary-row"><span className="hp-row-icon">{icon}</span><span className="hp-row-label">{label}</span><strong>{value}</strong></div>;
}
