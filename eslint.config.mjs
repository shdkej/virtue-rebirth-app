import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// react-hooks v7 introduced `set-state-in-effect` as `error`. Many
// hydration-safe client-mount patterns (`setMounted(true)`, mount-time date
// derivation) trip it intentionally. Keep the signal as `warn` rather than
// silently refactoring mount-time effects.
const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
