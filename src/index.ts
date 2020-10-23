import "./styles.css";
import "./pages/portfolio-detail";
import "./components/portal-component";
import "./components/lit-app";
import { Router } from "@vaadin/router";
async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (e) {
      // console.log("ServiceWorker registration failed. Sorry about that.", e);
    }
  } else {
    // console.log("Your browser does not support ServiceWorker.");
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
      path: "/",
      component: "portfolio-detail",
      action: () => {
        import("./pages/portfolio-detail");
      },
    },
    {
      path: "/portfolio-detail",
      component: "portfolio-detail",
      action: () => {
        import("./pages/portfolio-detail");
      },
    },
    {
      path: "/portfolio-detail/some",
      component: "portfolio-detail",
      action: () => {
        import("./pages/portfolio-detail");
      },
    },
    {
      path: "/portfolio-detail/:id",
      component: "portfolio-detail",
      action: () => {
        import("./pages/portfolio-detail");
      },
    },
  ]);
}
