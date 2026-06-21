"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function FreelancerProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");

  useEffect(() => {
    if (!session?.user?.email) return;

    fetch(`http://localhost:5000/user-profile/${session.user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || session.user.name || "");
        setImage(data.image || session.user.image || "");
        setSkillsInput((data.skills || []).join(", "));
        setBio(data.bio || "");
        setHourlyRate(data.hourlyRate || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Profile fetch failed:", err);
        // প্রোফাইল না থাকলেও session info দিয়ে ফর্ম দেখাও
        setName(session.user.name || "");
        setImage(session.user.image || "");
        setLoading(false);
      });
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name) {
      setError("Name is required.");
      return;
    }

    setSaving(true);

    const skillsArray = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const updateData = {
      name,
      image,
      skills: skillsArray,
      bio,
      hourlyRate: hourlyRate ? parseFloat(hourlyRate) : 0,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/user-profile/${session.user.email}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      if (res.ok) {
        setSuccess(true);
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-muted">Loading profile...</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-default p-6 bg-card flex flex-col gap-4"
      >
        {image && (
          <img
            src={image}
            alt="Profile preview"
            className="w-20 h-20 rounded-full object-cover border border-default"
          />
        )}

        <div>
          <label className="text-sm text-muted block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-default bg-background px-4 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-muted block mb-1">
            Profile Photo Link
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-lg border border-default bg-background px-4 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-muted block mb-1">
            Skills (comma separated)
          </label>
          <input
            type="text"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="React, Node.js, UI Design"
            className="w-full rounded-lg border border-default bg-background px-4 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-muted block mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell clients about yourself..."
            className="w-full rounded-lg border border-default bg-background px-4 py-2 text-sm outline-none resize-none"
          />
        </div>

        <div>
          <label className="text-sm text-muted block mb-1">
            Hourly Rate (USD)
          </label>
          <input
            type="number"
            min="0"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            placeholder="e.g. 25"
            className="w-full rounded-lg border border-default bg-background px-4 py-2 text-sm outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {success && (
          <p className="text-sm text-green-400">✓ Profile updated successfully.</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="self-start px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}