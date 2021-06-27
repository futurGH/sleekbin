import ace from "ace-builds/src-min-noconflict/ace";

ace.define(
  "ace/theme/sleekula",
  ["require", "exports", "module", "ace/lib/dom"],
  (require, exports) => {
    exports.isDark = true;
    exports.cssClass = "ace-sleekula";
    exports.cssText = `
.ace-sleekula .ace_gutter {
  background: #374151;
  color: rgb(132,140,154)
}

.ace-sleekula .ace_print-margin {
  width: 1px;
  background: #e8e8e8
}

.ace-sleekula {
  background-color: #374151;
  color: #D0D7E2
}

.ace-sleekula .ace_cursor {
  color: #F8F8F0
}

.ace-sleekula .ace_marker-layer .ace_selection {
  background: #6B7280
}

.ace-sleekula.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #374151;
  border-radius: 2px
}

.ace-sleekula .ace_marker-layer .ace_step {
  background: rgb(198, 219, 174)
}

.ace-sleekula .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid #3B3A32
}

.ace-sleekula .ace_marker-layer .ace_active-line {
  background: #4B5563
}

.ace-sleekula .ace_gutter-active-line {
  background-color: #4B5563
}

.ace-sleekula .ace_marker-layer .ace_selected-word {
  border: 1px solid #6B7280
}

.ace-sleekula .ace_fold {
  background-color: rgba(255, 218, 160, 1.0);
  border-color: #D0D7E2
}

.ace-sleekula .ace_keyword {
  color: rgba(255, 143, 50, 1.0)
}

.ace-sleekula .ace_constant.ace_language {
  color: rgba(255, 143, 50, 1.0)
}

.ace-sleekula .ace_constant.ace_numeric {
  color: rgba(106, 180, 236, 1.0)
}

.ace-sleekula .ace_constant.ace_character {
  color: rgba(186, 115, 224, 1.0)
}

.ace-sleekula .ace_constant.ace_other {
  color: rgba(186, 115, 224, 1.0)
}

.ace-sleekula .ace_support.ace_function {
  color: rgba(137, 236, 255, 1.0)
}

.ace-sleekula .ace_support.ace_constant {
  color: rgba(137, 236, 255, 1.0)
}

.ace-sleekula .ace_support.ace_class {
  font-style: italic;
  color: rgba(137, 236, 255, 1.0)
}

.ace-sleekula .ace_support.ace_type {
  font-style: italic;
  color: rgba(137, 236, 255, 1.0)
}

.ace-sleekula .ace_storage {
  color: rgba(255, 143, 50, 1.0)
}

.ace-sleekula .ace_storage.ace_type {
  font-style: italic;
  color: rgba(181, 208, 237, 1.0)
}

.ace-sleekula .ace_invalid {
  color: rgba(255, 255, 255, 1.0);
  background-color: rgba(255, 83, 145, 1.0)
}

.ace-sleekula .ace_invalid.ace_deprecated {
  color: rgba(255, 255, 255, 1.0);
  background-color: rgba(207, 180, 255, 1.0)
}

.ace-sleekula .ace_string {
  color: rgba(200, 242, 94, 1.0)
}

.ace-sleekula .ace_comment {
  color: #9CA3AF
}

.ace-sleekula .ace_variable {
  color: rgba(255, 218, 160, 1.0)
}

.ace-sleekula .ace_variable.ace_parameter {
  font-style: italic;
  color: rgba(255, 175, 80, 1.0)
}

.ace-sleekula .ace_entity.ace_other.ace_attribute-name {
  color: rgba(193, 255, 68, 1.0)
}

.ace-sleekula .ace_entity.ace_name.ace_function {
  color: rgba(255, 218, 160, 1.0)
}

.ace-sleekula .ace_entity.ace_name.ace_tag {
  color: rgba(255, 143, 50, 1.0)
}`;
    const dom = require("ace/lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
  }
);
