/** Tab keys for the App Settings page */
const AppSettingsTab = {
  CATEGORY: "category",
  SPECIALIZATION: "specialization",
  DEGREE: "degree",
} as const;

type AppSettingsTab = (typeof AppSettingsTab)[keyof typeof AppSettingsTab];

export { AppSettingsTab };
