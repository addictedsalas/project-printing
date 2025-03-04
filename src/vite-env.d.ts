/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SMTP_USER: string;
  readonly VITE_SMTP_PASS: string;
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
