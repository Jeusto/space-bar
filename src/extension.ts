import { KeyBindings } from "services/KeyBindings";
import { ScrollHandler } from "services/ScrollHandler";
import { Settings } from "services/Settings";
import { showActivities } from "services/showActivities";
import { Workspaces } from "services/Workspaces";
import { WorkspacesBar } from "ui/WorkspacesBar";

// To hide the workspace switcher popup
const WorkspaceSwitcherPopup = imports.ui.workspaceSwitcherPopup.WorkspaceSwitcherPopup;

class Extension {
    private workspacesBar: WorkspacesBar | null = null;
    private scrollHandler: ScrollHandler | null = null;
    private originalWorkspaceSwitcherPopup_display = WorkspaceSwitcherPopup.prototype.display;

    enable() {
        Settings.init();
        showActivities(false);
        Workspaces.init();
        KeyBindings.init();
        this.workspacesBar = new WorkspacesBar();
        this.workspacesBar.init();
        this.scrollHandler = new ScrollHandler();
        this.scrollHandler.init(this.workspacesBar.button);

        WorkspaceSwitcherPopup.prototype.display = () => {};
    }

    disable() {
        Settings.destroy();
        Workspaces.destroy();
        KeyBindings.destroy();
        this.scrollHandler?.destroy();
        this.scrollHandler = null;
        this.workspacesBar?.destroy();
        this.workspacesBar = null;
        showActivities(true);

        WorkspaceSwitcherPopup.prototype.display = this.originalWorkspaceSwitcherPopup_display;
    }
}

function init() {
    return new Extension();
}
