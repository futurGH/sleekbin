import { createApp } from "vue";
import { createPinia } from "pinia";
import { ElSelect, ElOption } from "element-plus";
import App from "./App.vue";
import router from "./router";

import "./assets/tailwind.css";

createApp(App)
  .use(router)
  .use(createPinia())
  .component(ElSelect.name, ElSelect)
  .component(ElOption.name, ElOption)
  .mount("#app");
