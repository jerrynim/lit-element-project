import "./styles.css";
import "./pages/portfolio-detail";
import "./pages/todo-view";
import "./components/portal-component";

import { Router } from "@vaadin/router";

window.addEventListener("load", () => {
  initRouter();
});

function initRouter() {
  const router = new Router(document.querySelector("main"));
  router.setRoutes([
    {
      path: "/",
      component: "todo-view",
    },
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
