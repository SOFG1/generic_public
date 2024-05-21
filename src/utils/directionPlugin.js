import { composeSignature } from "./composeSignature";

var rtl_plugin = {
  // @Required @Unique
  // plugin name
  name: "rtl_plugin",
  // @Required
  // data display
  display: "command",

  // @Options
  title: "Right to left",
  buttonClass: "",
  innerHTML: '<i class="fas fa-carrot"></i>',

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add: function (core, targetElement) {
    const context = core.context;

    // @Required
    // Registering a namespace for caching as a plugin name in the context object
    context.rtl_plugin = {
      targetButton: targetElement,
    };
  },

  // @Override core
  // Plugins with active methods load immediately when the editor loads.
  // Called each time the selection is moved.
  active: function (element) {
    const isRtl = this.options.rtl;
    if (isRtl) {
      this.util.addClass(this.context.rtl_plugin.targetButton, "active");
    }
    return isRtl;
  },

  // @Required, @Override core
  // The behavior of the "command plugin" must be defined in the "action" method.
  action: function () {
    this.util.addClass(this.context.rtl_plugin.targetButton, "active");
    this.util.removeClass(this.context.ltr_plugin.targetButton, "active");
    this.setDir("rtl");
    let content = this.getContents();
    if (this.context.ltrSign && this.context.rtlSign) {
      content = content.replace(this.context.ltrSign, this.context.rtlSign);
      this.setContents(content);
    }
    if (this.context.rtlSign && !this.context.ltrSign) {
      content = content + composeSignature(this.context.rtlSign);
      this.setContents(content);
    }
    if (!this.context.rtlSign && this.context.ltrSign) {
      var htmlObject = document.createElement("div");
      htmlObject.innerHTML = content;
      const signature = htmlObject.querySelector("img[alt='signature']");
      signature.remove();
      this.setContents(htmlObject.innerHTML);
    }
  },
};

var ltr_plugin = {
  // @Required @Unique
  // plugin name
  name: "ltr_plugin",
  // @Required
  // data display
  display: "command",

  // @Options
  title: "Left to right",
  buttonClass: "",
  innerHTML: '<i class="fas fa-carrot"></i>',

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add: function (core, targetElement) {
    const context = core.context;
    // @Required
    // Registering a namespace for caching as a plugin name in the context object
    context.ltr_plugin = {
      targetButton: targetElement,
    };
  },

  // @Override core
  // Plugins with active methods load immediately when the editor loads.
  // Called each time the selection is moved.
  active: function (element) {
    const isRtl = this.options.rtl;
    if (!isRtl) {
      this.util.addClass(this.context.ltr_plugin.targetButton, "active");
    }
    return isRtl;
  },

  // @Required, @Override core
  // The behavior of the "command plugin" must be defined in the "action" method.
  action: function () {
    this.util.addClass(this.context.ltr_plugin.targetButton, "active");
    this.util.removeClass(this.context.rtl_plugin.targetButton, "active");
    this.setDir("ltr");
    let content = this.getContents();
    if (this.context.rtlSign && this.context.ltrSign) {
      content = content.replace(this.context.rtlSign, this.context.ltrSign);
      this.setContents(content);
    }
    if (!this.context.rtlSign && this.context.ltrSign) {
      content += composeSignature(this.context.ltrSign);
      this.setContents(content);
    }
    if (!this.context.ltrSign && this.context.rtlSign) {
      var htmlObject = document.createElement("div");
      htmlObject.innerHTML = content;
      const signature = htmlObject.querySelector("img[alt='signature']");
      signature.remove();
      this.setContents(htmlObject.innerHTML);
    }
  },
};

export { rtl_plugin, ltr_plugin };
