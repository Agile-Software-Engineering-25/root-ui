import { CircularProgress } from "@mui/joy";
import type { ReactNode } from "react";

type StatusViewProps = {
  title?: string;
  message?: ReactNode;
  showSpinner?: boolean;
  children?: ReactNode; // actions (e.g., buttons)
};

const StatusView = ({ title, message, showSpinner, children }: StatusViewProps) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: 16,
      }}
    >
      <div style={{ display: "grid", justifyItems: "center", gap: 12 }}>
        {showSpinner ? <CircularProgress size="lg" color="primary" /> : null}
        {title ? (
          <h2 style={{ fontWeight: 600, marginBottom: 8 }}>{title}</h2>
        ) : null}
        {message ? (
          <div style={{ marginBottom: 24, color: "inherit" }}>{message}</div>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default StatusView;
