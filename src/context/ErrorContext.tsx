import React, { createContext, useContext, useState, ReactNode } from "react";

type ErrorContextType = {
    error: string;
    setError: (msg: string) => void;
    clearError: () => void;
};

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState("");

    const clearError = () => setError("");

    return (
        <ErrorContext.Provider value={{ error, setError, clearError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error("useError must be used within an ErrorProvider");
    }
    return context;
};
