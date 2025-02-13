'use client'
import React, { useState } from "react";
import Image from "next/image";
import im from '../../../../public/images/logo/2025.png';
import { StrategicObjective } from "../../dtos/baseinfo-dtos";
interface StrategicTheme {
  id: number;
  themeName: string;
}

interface Props {
  themes: StrategicTheme[];
  objectives: StrategicObjective[];
  selectedTheme: string | null;
  setSelectedTheme: (setSelect: string) => void;
  selectedObjective: string | null;
  setSelectedObjective: (setSelect: string | null) => void;
  objectiveCompanyCode: string;
  setObjectiveCompanyCode: (setSelect: string) => void;
}

const StrategicThemesDropdown = ({
  themes,
  objectives,
  selectedTheme,
  setSelectedTheme,
  selectedObjective,
  setSelectedObjective,

  setObjectiveCompanyCode,
}: Props) => {
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ThemeId = e.target.value;
    setSelectedTheme(ThemeId);
    setSelectedObjective(null);
  };
  const handleObjectiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedObjective(e.target.value);
    let selectO = objectives.find((x) => x.id === e.target.value);
    setObjectiveCompanyCode(selectO?.companyCode!); //010110
  };
  const filteredObjectives = selectedTheme
    ? objectives.filter((objective) => objective.parentId === selectedTheme)
    : [];

  const handleMapClick=()=>{
    
    window.open( `${window.location.origin}/map`, '_blank');
  }
  return (
    <div className="flex items-center">
      <div className="block">
        <div className="flex">
          <label className="block pb-3 text-sm font-medium  text-black dark:text-white">
            戰略主題
          </label>
          <button className="ml-2 pb-3" onClick={handleMapClick}>
            <svg width="18px" height="18px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns-xlink="http://www.w3.org/1999/xlink" xmlns-sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000">
              <g id="SVGRepo_bgCarrier" stroke-width="0"/>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
              <g id="SVGRepo_iconCarrier"> <title>map</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch-type="MSPage"> <g id="Icon-Set" sketch-type="MSLayerGroup" transform="translate(-204.000000, -411.000000)" fill="#000000"> <path d="M228,428 C228,428.553 228.448,429 229,429 C229.552,429 230,428.553 230,428 L230,420 C230,419.448 229.552,419 229,419 C228.448,419 228,419.448 228,420 L228,428 L228,428 Z M234,437.5 L228,433 L220,439 L212,436 L206,439.75 L206,419.75 L212,416 L220,419 L228,413 L234,417.5 L234,437.5 L234,437.5 Z M228,411 L220,417 L212,414 L204,419 L204,443 L212,438 L220,441 L228,435 L236,441 L236,417 L228,411 L228,411 Z M221,424 C220.448,424 220,424.448 220,425 L220,431 C220,431.553 220.448,432 221,432 C221.552,432 222,431.553 222,431 L222,425 C222,424.448 221.552,424 221,424 L221,424 Z M213,421 C212.448,421 212,421.448 212,422 L212,432 C212,432.553 212.448,433 213,433 C213.552,433 214,432.553 214,432 L214,422 C214,421.448 213.552,421 213,421 L213,421 Z" id="map" sketch-type="MSShapeGroup"> </path> </g> </g> </g>
            </svg>
          </button>
        </div>
    
        <select
          onChange={handleThemeChange}
          defaultValue={
            selectedTheme === undefined || selectedTheme === null
              ? ""
              : selectedTheme
          }
          className="mr-3 h-12 w-54 border-2 border-slate-200 p-1.5"
        >
          <option value="">選擇戰略主題</option>
          {themes.map((theme) => (
            <option key={theme.id} value={theme.id}>
              {theme.themeName}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        {selectedTheme && selectedTheme !== undefined && (
          <>
            <label className="block pb-3 text-sm font-medium  text-black dark:text-white">
              戰略目標
            </label>
            <select
              defaultValue={
                selectedObjective === undefined || selectedObjective === null
                  ? ""
                  : selectedObjective
              }
              onChange={handleObjectiveChange}
              className="mr-3 h-12 border-2  border-slate-200 p-1.5"
            >
              <option value="">選擇戰略目標</option>
              {filteredObjectives.map((objective) => (
                <option key={objective.id} value={objective.id}>
                  {objective.objectiveName}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
};

export default StrategicThemesDropdown;


