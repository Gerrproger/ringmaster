# README

## Top-level Schemas

*   [Before section](./schema_before.md "Executes events from list (one by one) before running checks (selectors)") – `schema_before.json`

*   [CLI arguments and options](./schema_cli.md) – `schema_cli.json`

*   [Config file](./schema_config.md "This is the main configuration for a test") – `schema_config.json`

*   [Cookie object](./schema_cookie.md "Used to set cookies before executing a test suit") – `schema_cookie.json`

*   [Local Storage object](./schema_localstorage.md "Used to set localStorage items before executing a test suit") – `schema_localStorage.json`

*   [Selectors config file](./schema_selectors.md "Contains checks for the existence of selectors") – `schema_selectors.json`

*   [Viewport object](./schema_viewport.md "Used to set the viewport before executing a test suit") – `schema_viewport.json`

*   [Visual config file](./schema_visual.md "Contains checks for visual changes by comparing screenshots") – `schema_visual.json`

## Other Schemas

### Objects

*   [Options](./schema_cli-properties-options.md) – `schema_cli.json#/properties/opts`

*   [Selector test object](./schema_selectors-selector-test-object.md) – `schema_selectors.json#/items`

*   [Visual test object](./schema_visual-visual-test-object.md) – `schema_visual.json#/items`

*   [back](./schema_before-oneof-back.md "Go back in history") – `schema_before.json#/oneOf/7`

*   [blur](./schema_before-oneof-blur.md "Blur the element") – `schema_before.json#/oneOf/3`

*   [click](./schema_before-oneof-click.md "Click the element") – `schema_before.json#/oneOf/0`

*   [focus](./schema_before-oneof-focus.md "Focus the element") – `schema_before.json#/oneOf/2`

*   [hover](./schema_before-oneof-hover.md "Hover over the element") – `schema_before.json#/oneOf/1`

*   [offline](./schema_before-oneof-offline.md "Set current page network status as offline") – `schema_before.json#/oneOf/8`

*   [reload](./schema_before-oneof-reload.md "Reload current page") – `schema_before.json#/oneOf/6`

*   [select](./schema_before-oneof-select.md "Select options in the selector element") – `schema_before.json#/oneOf/4`

*   [type](./schema_before-oneof-type.md "Tyoe text in the input/form element") – `schema_before.json#/oneOf/5`

### Arrays

*   [Dirs](./schema_cli-properties-dirs.md) – `schema_cli.json#/properties/dirs`

*   [Untitled array in Config file](./schema_config-properties-cookies.md "Cookies to set before running test cases") – `schema_config.json#/properties/cookies`

*   [Untitled array in Config file](./schema_config-properties-localstorage.md "Local Storage items to set before running test cases") – `schema_config.json#/properties/localStorage`

*   [Untitled array in Selectors config file](./schema_selectors-selector-test-object-properties-before.md "Execute actions before performing the check") – `schema_selectors.json#/items/properties/before`

*   [Untitled array in Visual config file](./schema_visual-visual-test-object-properties-before.md "Execute actions before performing the check") – `schema_visual.json#/items/properties/before`

*   [Values to select](./schema_before-oneof-select-properties-values-to-select.md) – `schema_before.json#/oneOf/4/properties/values`
