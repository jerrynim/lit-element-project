import "./styles.css";
import "./pages/portfolio-detail";
import "./components/portal-component";

import { Router } from "@vaadin/router";
async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
      console.log("registered");
    } catch (e) {
      console.log("ServiceWorker registration failed. Sorry about that.", e);
    }
  } else {
    console.log("Your browser does not support ServiceWorker.");
  }
}
window.addEventListener("load", () => {
  initRouter();

  registerSW();
});

function initRouter() {
  const router = new Router(document.querySelector("main"));
  router.setRoutes([
    {
      path: "/portfolio-detail",
      component: "portfolio-detail",
      action: () => {
        import("./pages/portfolio-detail");
      },
    },
    {
      path: "(.*)",
      component: "page-404",
      action: () => import("./pages/page-404"),
    },
  ]);
}
