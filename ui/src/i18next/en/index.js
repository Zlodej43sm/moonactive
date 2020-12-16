import { default as common_dialog } from "./common_dialog.json";
import { default as common_table } from "./common_table.json";
import { default as common_menu } from "./common_menu.json";

import { default as promotions_generate_button } from "./promotions_generate_button.json";
import { default as promotions_list_wrapper } from "./promotions_list_wrapper.json";
import { default as promotions_edit_dialog } from "./promotions_edit_dialog.json";

export default {
  translation: {
    ...common_dialog,
    ...common_table,
    ...common_menu,
    ...promotions_generate_button,
    ...promotions_list_wrapper,
    ...promotions_edit_dialog
  }
};
