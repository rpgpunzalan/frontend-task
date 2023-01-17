import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faPowerOff, faUser, faCog, faGripVertical, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faCog);
  library.add(faGripVertical);
  library.add(faTrash);
  library.add(faPlus);
}

export default initFontAwesome;
