
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const PROFILE_PATH = "/api/health/profile";

async function request(path, options = {}) {
  const url = `${API_URL}${path}`;

  console.log("API URL:", url);
  console.log("HTTP Method:", options.method);

  const response = await fetch(url, options);

  console.log("HTTP Status:", response.status);

  let data = {};

  try {
    data = await response.json();
  } catch {
    console.log("Response is not JSON");
  }

  console.log("Backend Response:", data);

  if (!response.ok) {
    const error = new Error(
      data.message || `Request failed (${response.status})`
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

export function getHealthProfile(token) {
  return request(PROFILE_PATH, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function saveHealthProfile(profile, token) {
  return request(PROFILE_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });
}
