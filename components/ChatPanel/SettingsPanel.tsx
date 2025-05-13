// V2, getting there!!
import React from "react";

interface SettingsPanelObjects {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelObjects> = ({ onClose }) => {
  return (
    <div className="fixed top-20 right-10 w-[400px] bg-surface shadow-2xl rounded-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center bg-primary text-white px-4 py-3 rounded-t-xl">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-bold">Innstillinger</h2>
          <img
            src="/images/Settings-icon.png"
            alt="Settings"
            className="w-8 h-8"
          />
        </div>
        <button onClick={onClose}>
          <img src="/images/Close-icon.png" alt="Close" className="w-8 h-8" />
        </button>
      </div>

      {/* Settings objects */}
      <div className="p-4 space-y-6 text-black">
        {/* Color-scheme */}
        <div>
          <label className="block font-semibold mb-1 text-darkestGray">
            Fargetema
          </label>
          <select className="w-full px-3 py-2 border border-darkestGray bg-lightGray text-darkestGray rounded">
            <option>Trikromasi (Standard)</option>
            <option>Protanopi (Rød-sensitiv)</option>
            <option>Deuteranopi (Grønn-sensitiv)</option>
            <option>Tritanopi (Blå-sensitiv)</option>
            <option>Achromatopsia (Total Fargeblindhet)</option>
          </select>
        </div>

        {/* Text size */}
        <div>
          <label className="block font-semibold mb-1 text-darkestGray">
            Tekststørrelse
          </label>
          <input
            type="range"
            min="0.25"
            max="1.5"
            step="0.25"
            defaultValue="1"
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-darkGray mt-1">
            <span>0.25x</span>
            <span>0.5x</span>
            <span>0.75x</span>
            <span>1x</span>
            <span>1.25x</span>
            <span>1.5x</span>
          </div>
        </div>

        {/* Light/Dark Mode */}
        <div className="flex items-center justify-between">
          <span className="font-semibold text-darkestGray">Lys modus</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />

            {/* Pill-thing */}
            <div className="w-11 h-6 bg-muted peer-checked:bg-primary rounded-full transition-colors"></div>

            {/* Ball in pill */}
            <div className="absolute left-1 top-1 bg-primary peer-checked:bg-muted w-4 h-4 rounded-full transition-transform transition-colors peer-checked:translate-x-5" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
