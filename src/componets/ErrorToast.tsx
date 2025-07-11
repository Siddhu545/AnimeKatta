import React, { useEffect } from "react";
import { useError } from "../context/ErrorContext";

export const ErrorToast = () => {
  const { error, clearError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (!error) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in bg-mhaRed text-white font-hero text-lg px-6 py-3 rounded-xl shadow-xl border-2 border-mhaYellow">
      ⚠️ {error}
    </div>
  );
};
