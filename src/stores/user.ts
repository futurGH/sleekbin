import { defineStore } from "pinia";
import { DocumentData } from "@/stores/document";

export interface User {
  id: string;
  username: string;
  email: string;
  bins: DocumentData[];
}

export const useUser = defineStore({
  id: "user",
  state: (): User => ({
    id: undefined,
    username: undefined,
    email: undefined,
    bins: [],
  }),
});
