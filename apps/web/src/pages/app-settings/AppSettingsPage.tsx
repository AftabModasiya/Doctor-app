import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppSettingsTab } from "@enum/app-settings-tab.enum";
import CategoryTab from "@components/app-settings/CategoryTab";
import SpecializationTab from "@components/app-settings/SpecializationTab";
import DegreeTab from "@components/app-settings/DegreeTab";

const TABS = [
  { key: AppSettingsTab.CATEGORY, labelKey: "appSettings.tabs.category" },
  {
    key: AppSettingsTab.SPECIALIZATION,
    labelKey: "appSettings.tabs.specialization",
  },
  { key: AppSettingsTab.DEGREE, labelKey: "appSettings.tabs.degree" },
] as const;

export default function AppSettingsPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get("tab") as AppSettingsTab | null;
  const activeTab: AppSettingsTab =
    tabFromUrl && Object.values(AppSettingsTab).includes(tabFromUrl)
      ? tabFromUrl
      : AppSettingsTab.CATEGORY;

  // Keep URL in sync on first render if tab param is missing
  useEffect(() => {
    if (!tabFromUrl) {
      setSearchParams({ tab: AppSettingsTab.CATEGORY }, { replace: true });
    }
  }, [tabFromUrl, setSearchParams]);

  const handleTabSelect = (tab: AppSettingsTab) => {
    setSearchParams({ tab }, { replace: true });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {t("appSettings.title")}
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {t("appSettings.subtitle")}
        </p>
      </div>

      {/* Tab Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card">
        {/* Tab Bar */}
        <div className="flex items-center gap-1 px-4 pt-4 border-b border-gray-100">
          {TABS.map(({ key, labelKey }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleTabSelect(key)}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors rounded-t-lg ${
                activeTab === key
                  ? "text-primary-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t(labelKey)}
              {activeTab === key && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {activeTab === AppSettingsTab.CATEGORY && <CategoryTab />}
          {activeTab === AppSettingsTab.SPECIALIZATION && <SpecializationTab />}
          {activeTab === AppSettingsTab.DEGREE && <DegreeTab />}
        </div>
      </div>
    </div>
  );
}
