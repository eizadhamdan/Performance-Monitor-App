import { BrowserWindow, Menu, Tray, app } from "electron";
import path from "path";
import { getAssetPath } from "./pathResolver.js";

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(
    path.join(
      getAssetPath(),
      process.platform === "darwin" ? "trayIconTemplate.png" : "trayIcon.png"
    )
  );

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Show Performance Monitor",
        click: () => {
          mainWindow.show();

          //for macos
          if (app.dock) {
            app.dock.show();
          }
        },
        type: "normal",
      },
      {
        label: "Quit Performance Monitor",
        click: () => app.quit(),
        type: "normal",
      },
    ])
  );
}
