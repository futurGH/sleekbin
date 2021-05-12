import { defineStore } from "pinia";

export interface DocumentData {
  id: string;
  background_color: string;
  language: string;
  theme: string;
  font: string;
  font_size: number;
  line_height: number;
  show_line_numbers: boolean;
  first_line_number: number;
}

export interface Document extends DocumentData {
  content: { title: string; body: string };
}

export const useDocument = defineStore({
  id: "document",
  state: (): Document => ({
    id: undefined,
    content: {
      title: "Untitled",
      body: "",
    },
    // Default values for editor configuration
    background_color: "#111827",
    language: "Text",
    theme: "Sleekula",
    font: "JetBrains Mono",
    font_size: 16,
    line_height: 1.2,
    show_line_numbers: true,
    first_line_number: 1,
  }),
});
