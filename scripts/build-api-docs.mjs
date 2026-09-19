import fs from "node:fs/promises";
import path from "node:path";

import ts from "typescript";

const registry = JSON.parse(await fs.readFile("src/registry/registry.json", "utf8"));
const config = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, process.cwd());
const program = ts.createProgram(parsed.fileNames, parsed.options);
const checker = program.getTypeChecker();
const common = new Set([
  "children",
  "className",
  "render",
  "ref",
  "id",
  "value",
  "defaultValue",
  "onClick",
  "onKeyDown",
  "onChange",
  "onBlur",
  "onFocus",
  "disabled",
  "required",
  "type",
  "name",
  "placeholder",
  "checked",
  "defaultChecked",
  "htmlFor",
  "src",
  "alt",
  "href",
  "target",
  "multiple",
  "rows",
  "maxLength",
  "min",
  "max",
  "step",
]);
const descriptions = {
  children: "Content rendered inside this component.",
  className: "Additional CSS classes merged with the component styles.",
  render: "Element or render function used to compose a custom root element.",
  ref: "Reference to the underlying element or component handle.",
  id: "Unique identifier used to associate labels and descriptions.",
  value: "The current value when controlled by the application.",
  defaultValue: "Initial value for an uncontrolled component.",
  onChange: "Called when the underlying form control changes; inspect the event for its value.",
  disabled: "Prevents user interaction.",
  required: "Whether the user must provide a value before form submission.",
  type: "The native input or button behavior.",
  name: "Field name used in form data.",
  placeholder: "Hint shown when the control has no value.",
  checked: "Current checked state when controlled.",
  defaultChecked: "Initial checked state for an uncontrolled control.",
  htmlFor: "ID of the associated form control.",
  src: "URL of the displayed resource.",
  alt: "Accessible text alternative for the image.",
  href: "Destination URL for the link.",
  target: "Browsing context in which the link opens.",
  multiple: "Allows more than one value to be selected.",
  rows: "Initial number of visible text rows.",
  maxLength: "Maximum number of input characters.",
  min: "Minimum allowed value.",
  max: "Maximum allowed value.",
  step: "Increment between valid values.",
  variant: "Visual treatment of the component.",
  size: "Visual size of the component.",
  orientation: "Layout axis used by the component.",
  align: "Alignment relative to the anchor or surrounding content.",
  side: "Preferred edge of the anchor for the popup.",
  open: "Controls whether the content is open.",
  defaultOpen: "Whether content starts open when uncontrolled.",
  onOpenChange: "Called when the open state changes. Use it to update controlled state.",
  onValueChange: "Called with the updated value; use this to synchronize controlled state.",
  onCheckedChange: "Called with the new checked state.",
  onPressedChange: "Called when a toggle's pressed state changes.",
  columns: "Column definitions describing how each record is displayed.",
  data: "Records provided to the component.",
  config: "Labels and theme colors keyed by chart series.",
  errors: "Validation errors to present near the field.",
  emptyMessage: "Content displayed when no records are available.",
  isActive: "Marks this item as the current page or selection.",
  label: "Visible or accessible text identifying this element.",
  text: "Text displayed by the component.",
  delay: "Delay in milliseconds before the interaction takes effect.",
  sideOffset: "Distance in pixels between the popup and its anchor.",
  alignOffset: "Offset in pixels along the popup alignment axis.",
  locale: "Locale used for date labels and formatting.",
  mode: "Selection mode supported by the calendar.",
  selected: "Currently selected date, dates, or range.",
  onSelect: "Called when the user selects an item or date.",
  items: "Available options or item definitions.",
  control: "React Hook Form control object for the field.",
  rules: "Validation rules applied to this field.",
  defaultValues: "Initial values of the form fields.",
  asChild: "Composes this component with its child element.",
  pressed: "Current pressed state when controlled.",
  defaultPressed: "Initial pressed state when uncontrolled.",
  loopFocus: "Whether keyboard navigation wraps at the ends.",
  keepMounted: "Keeps content in the DOM while closed.",
  modal: "Whether the popup restricts interaction with the rest of the page.",
  closeOnEscape: "Whether Escape dismisses the popup.",
  messageId: "Stable identifier for this message.",
  scrollAnchor: "Marks a message as a scroll anchor.",
  direction: "Direction applied to layout or scrolling.",
  buttonVariant: "Visual variant used for calendar navigation buttons.",
  showOutsideDays: "Shows dates from adjacent months.",
  captionLayout: "Presentation of the calendar month and year controls.",
  defaultMonth: "Month displayed initially.",
  month: "Displayed month when controlled.",
  onMonthChange: "Called when the displayed month changes.",
  defaultSize: "Initial panel size.",
  minSize: "Smallest size allowed for the panel.",
  maxSize: "Largest size allowed for the panel.",
  withHandle: "Displays a visible grip on the resize handle.",
  collapsed: "Whether the element is collapsed.",
  defaultCollapsed: "Initial collapsed state.",
  collapsible: "Controls how the sidebar collapses.",
  onSubmit:
    "Called when the form is submitted. Prevent the default action when handling it locally.",
  onClick: "Called when the element is activated.",
  tooltip: "Tooltip content shown for the collapsed sidebar item.",
  showCloseButton: "Displays the popup's close button.",
  formatters: "Functions that format date labels.",
  components: "Overrides for the calendar's internal components.",
  classNames: "CSS class overrides for calendar parts.",
  childrenWrapper: "Wrapper used around the rendered children.",
  hideLabel: "Hides the series label in the chart tooltip.",
  hideIndicator: "Hides the chart's series indicator.",
  indicator: "Shape used for the chart's series indicator.",
  nameKey: "Data key used to resolve a series name.",
  labelKey: "Data key used to resolve a series label.",
  labelFormatter: "Formats the chart tooltip heading.",
  formatter: "Formats a chart tooltip value.",
  color: "Color override for the visual indicator.",
  onOpenChangeComplete: "Called after the open or close transition completes.",
  toastManager: "Manager used to create and update notifications.",
  toast: "Toast data to render.",
  viewportRef: "Reference to the scrollable viewport.",
  maxToasts: "Maximum number of visible notifications.",
  timeout: "Time in milliseconds before automatic dismissal.",
  disabledDays: "Dates that cannot be selected.",
  position: "Preferred placement of the notification region.",
  width: "Width of the element.",
  height: "Height of the element.",
  ratio: "Width divided by height for the reserved media area.",
  showTrigger: "Displays a control for opening the choice list.",
  showClear: "Displays a control for clearing the selection.",
  isInvalid: "Marks the value as invalid.",
  error: "Validation error associated with the control.",
  invalid: "Marks this item or value as invalid.",
  onItemChange: "Called when the active question changes.",
  item: "Active question name when controlled.",
  defaultItem: "Question displayed initially.",
  shortcuts: "Keyboard shortcut scheme for questionnaire choices.",
  onStatusChange: "Called when the answer status changes.",
  optional: "Marks this field as optional.",
  sticky: "Controls whether content stays anchored while scrolling.",
  stickyHeader: "Keeps the header visible while scrolling.",
  collisionBoundary: "Element or area used when avoiding popup collisions.",
  collisionPadding: "Space retained between the popup and collision boundaries.",
  anchor: "Element used to position the popup.",
  nativeButton: "Whether the rendered root is a native button.",
  native: "Whether native browser behavior is used.",
  valueFormatter: "Formats the value for display.",
  renderItem: "Render function for each item.",
  onValueCommitted: "Called after the user finishes changing the value.",
  onValueChangeEnd: "Called when the value interaction ends.",
  showValue: "Displays the current progress value.",
  getLabel: "Returns the label for an item.",
  valueLabel: "Text describing the current value.",
  onChangeComplete: "Called after the change is committed.",
  onInputValueChange: "Called when the search input text changes.",
  inputValue: "Current search input text when controlled.",
  defaultInputValue: "Initial search input text.",
  filter: "Function used to match options to the search query.",
  limit: "Maximum number of matching options displayed.",
  autoHighlight: "Highlights the first matching option automatically.",
  highlightItemOnHover: "Highlights an item when the pointer moves over it.",
  selectItemOnHover: "Selects an item when the pointer moves over it.",
  selectionMode: "Determines how multiple values are selected.",
  onHighlightChange: "Called when the highlighted option changes.",
  onItemsChange: "Called when the available items change.",
  loop: "Whether navigation wraps from the last item to the first.",
  api: "API object for controlling the component.",
  setApi: "Receives the carousel API after initialization.",
  opts: "Embla carousel options.",
  plugins: "Embla carousel plugins.",
  chartId: "Identifier used to scope chart styles.",
  shouldFilter: "Enables automatic command list filtering.",
  onEscapeKeyDown: "Called when Escape is pressed while the component is active.",
  onPointerDownOutside: "Called when a pointer interaction occurs outside the popup.",
  onFocusOutside: "Called when focus moves outside the popup.",
  onInteractOutside: "Called for interactions outside the popup.",
  onCloseAutoFocus: "Called when focus is restored after closing.",
  onOpenAutoFocus: "Called when focus is assigned after opening.",
  forceMount: "Keeps content mounted regardless of open state.",
  container: "DOM container used for a portal.",
  viewport: "Viewport element used for scrolling.",
  provider: "Provider configuration used by this component.",
  onDismiss: "Called when the notification is dismissed.",
  onAction: "Called when the action is activated.",
  onCancel: "Called when the operation is canceled.",
  status: "Current status represented by the component.",
  duration: "Duration in milliseconds.",
  loading: "Whether the operation is loading.",
  onLoad: "Called when the resource finishes loading.",
  onError: "Called when the resource fails to load.",
  fallback: "Content used when the primary content is unavailable.",
  icon: "Icon displayed alongside the content.",
  description: "Supporting description for the component.",
  title: "Title presented to the user.",
  alignItemWithTrigger: "Aligns the selected item with the trigger when possible.",
  positionMethod: "CSS positioning strategy used for the popup.",
  trackAnchor: "Tracks the anchor position while the popup is open.",
  initialFocus: "Element or behavior used for initial focus.",
  finalFocus: "Element or behavior used when restoring focus.",
  openOnHover: "Opens the component when its trigger is hovered.",
  delayDuration: "Delay in milliseconds before showing the tooltip.",
  closeDelay: "Delay in milliseconds before closing the popup.",
  openDelay: "Delay in milliseconds before opening the popup.",
  disableHoverableContent: "Prevents the tooltip from remaining open while hovering its content.",
  closeDelayDuration: "Delay before closing the tooltip, in milliseconds.",
  skipDelayDuration: "Time window in which subsequent tooltips open immediately.",
  timeoutDuration: "Time before the notification is dismissed, in milliseconds.",
  tabIndex: "Position in the keyboard focus order.",
  role: "Accessible role of the rendered element.",
  style: "Inline CSS properties applied to the element.",
  hidden: "Hides the element from presentation.",
  srOnly: "Keeps content available to assistive technology without displaying it.",
  border: "Whether a visual border is displayed.",
  wrap: "Whether child content wraps to multiple lines.",
  separator: "Content displayed between items.",
  iconOnly: "Displays only the icon while preserving the accessible label.",
  onResize: "Called when the panel or container is resized.",
  onLayoutChange: "Called when the panel layout changes.",
  onLayoutChanged: "Called when panel resizing finishes.",
  onCollapse: "Called when a panel collapses.",
  onExpand: "Called when a panel expands.",
  onToggle: "Called when the open state is toggled.",
  keyboard: "Controls keyboard interaction behavior.",
  readOnly: "Displays the value without allowing changes.",
  autoFocus: "Moves focus to the control when mounted.",
  autoComplete: "Browser autofill hint for the field.",
  form: "ID of the associated form element.",
  pattern: "Regular expression used by native input validation.",
  accept: "Accepted file types.",
  capture: "Preferred device input source for file capture.",
  download: "Requests that the link target be downloaded.",
  rel: "Relationship and security behavior for a link.",
  controls: "Displays native media playback controls.",
  muted: "Mutes media playback.",
  poster: "Image shown before video playback begins.",
  preload: "Hint controlling media preloading.",
  onInput: "Called when the input receives user changes.",
  spellCheck: "Enables or disables browser spell checking.",
  contentEditable: "Allows the element's content to be edited.",
  draggable: "Whether the element can be dragged.",
  onDrag: "Called while dragging the element.",
  onDrop: "Called when an item is dropped on the element.",
  onKeyDown: "Called when a key is pressed while this element is focused.",
  onKeyUp: "Called when a key is released while this element is focused.",
  onMouseEnter: "Called when the pointer enters the element.",
  onMouseLeave: "Called when the pointer leaves the element.",
  onPointerDown: "Called when a pointer is pressed on the element.",
  onPointerUp: "Called when a pointer is released on the element.",
  onBlur: "Called when the control loses focus.",
  onFocus: "Called when the control receives focus.",
  onDoubleClick: "Called when the element is activated twice in quick succession.",
  onContextMenu: "Called when the user requests a context menu.",
  onScroll: "Called when the scroll position changes.",
  onWheel: "Called when a wheel input occurs over the element.",
};
function normalize(text) {
  return text.replace(/import\("[^"]+"\)\./g, "").replaceAll(process.cwd(), "<project>");
}
function defaultsOf(symbol) {
  const declaration = symbol.valueDeclaration;
  const result = new Map();
  const parameter =
    declaration && "parameters" in declaration ? declaration.parameters[0] : undefined;
  if (parameter && ts.isObjectBindingPattern(parameter.name))
    for (const element of parameter.name.elements) {
      if (element.initializer) result.set(element.name.getText(), element.initializer.getText());
    }
  return result;
}
const output = new Map();
for (const item of registry.items.filter((item) => item.type === "registry:ui")) {
  const source = program.getSourceFile(path.resolve(item.files[0].path));
  const module = checker.getSymbolAtLocation(source);
  const parts = [];
  for (let symbol of checker.getExportsOfModule(module)) {
    if (!/^[A-Z]/.test(symbol.name)) continue;
    const name = symbol.name;
    if (symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
    const type = checker.getTypeOfSymbolAtLocation(symbol, source);
    const signature = type.getCallSignatures()[0];
    if (!signature?.parameters[0]) continue;
    const propsType = checker.getTypeOfSymbolAtLocation(signature.parameters[0], source);
    const defaults = defaultsOf(symbol);
    const props = [];
    const branches = propsType.isUnion() ? propsType.types : [propsType];
    const properties = new Map();
    for (const branch of branches)
      for (const prop of checker.getPropertiesOfType(branch)) {
        const entries = properties.get(prop.name) ?? [];
        entries.push(prop);
        properties.set(prop.name, entries);
      }
    for (const entries of properties.values()) {
      const property = entries[0];
      const declarations = property.declarations ?? [];
      const inherited =
        declarations.length > 0 &&
        declarations.every((node) =>
          /@types\/react|typescript\/lib\/lib\.dom/.test(node.getSourceFile().fileName),
        );
      if (property.name.startsWith("__") || (inherited && !common.has(property.name))) continue;
      const tags = property.getJsDocTags(checker);
      const documentedDefault = tags.find((tag) => ["default", "defaultValue"].includes(tag.name));
      const description = ts
        .displayPartsToString(property.getDocumentationComment(checker))
        .replace(/\{@link\s+([^}|]+)(?:\|([^}]+))?\}/g, "$1");
      props.push({
        name: property.name,
        type: normalize(
          [
            ...new Set(
              entries.map((prop) =>
                checker.typeToString(
                  checker.getTypeOfSymbolAtLocation(prop, source),
                  source,
                  ts.TypeFormatFlags.NoTruncation |
                    ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
                ),
              ),
            ),
          ].join(" | "),
        ),
        required:
          entries.length === branches.length &&
          entries.every((prop) => !(prop.flags & ts.SymbolFlags.Optional)),
        default:
          defaults.get(property.name) ??
          (documentedDefault ? ts.displayPartsToString(documentedDefault.text) : "—"),
        description: normalize(
          description ||
            descriptions[property.name] ||
            (property.name.startsWith("on")
              ? `Callback for ${property.name
                  .slice(2)
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .toLowerCase()} events. See the signature for parameters.`
              : `Configures ${property.name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase()}; see the accepted type.`),
        ),
      });
    }
    if (props.length) parts.push({ name, props });
  }
  output.set(item.name, JSON.stringify(parts, null, 2) + "\n");
}
await fs.mkdir("src/docs/api", { recursive: true });
for (const [name, json] of output) {
  const file = `src/docs/api/${name}.json`;
  if (process.argv.includes("--check")) {
    if ((await fs.readFile(file, "utf8")) !== json)
      throw new Error(`${file} is stale. Run pnpm docs:api.`);
  } else await fs.writeFile(file, json);
}
console.log(
  `API reference ${process.argv.includes("--check") ? "verified" : "generated"} for ${output.size} components.`,
);
