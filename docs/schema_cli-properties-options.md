# Options Schema

```txt
schema_cli.json#/properties/opts
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                  |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_cli.json\*](../lib/schemas/schema_cli.json "open original schema") |

## opts Type

`object` ([Options](schema_cli-properties-options.md))

# opts Properties

| Property                  | Type      | Required | Nullable       | Defined by                                                                                                                                   |
| :------------------------ | :-------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| [headless](#headless)     | `boolean` | Optional | cannot be null | [CLI arguments and options](schema_cli-properties-options-properties-headless.md "schema_cli.json#/properties/opts/properties/headless")     |
| [muted](#muted)           | `boolean` | Optional | cannot be null | [CLI arguments and options](schema_cli-properties-options-properties-muted.md "schema_cli.json#/properties/opts/properties/muted")           |
| [timeout](#timeout)       | `number`  | Optional | cannot be null | [CLI arguments and options](schema_cli-properties-options-properties-timeout.md "schema_cli.json#/properties/opts/properties/timeout")       |
| [close](#close)           | `boolean` | Optional | cannot be null | [CLI arguments and options](schema_cli-properties-options-properties-close.md "schema_cli.json#/properties/opts/properties/close")           |
| [executable](#executable) | `string`  | Optional | cannot be null | [CLI arguments and options](schema_cli-properties-options-properties-executable.md "schema_cli.json#/properties/opts/properties/executable") |
| [output](#output)         | Merged    | Optional | cannot be null | [CLI arguments and options](schema_cli-properties-options-properties-output.md "schema_cli.json#/properties/opts/properties/output")         |
| [view](#view)             | `boolean` | Optional | cannot be null | [CLI arguments and options](schema_cli-properties-options-properties-view.md "schema_cli.json#/properties/opts/properties/view")             |

## headless

Run Chrome in headless (hidden) mode

`headless`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [CLI arguments and options](schema_cli-properties-options-properties-headless.md "schema_cli.json#/properties/opts/properties/headless")

### headless Type

`boolean`

## muted

Mute Chrome entirely (only when not headless)

`muted`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [CLI arguments and options](schema_cli-properties-options-properties-muted.md "schema_cli.json#/properties/opts/properties/muted")

### muted Type

`boolean`

## timeout

Default timeot (ms) used in all tests

`timeout`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [CLI arguments and options](schema_cli-properties-options-properties-timeout.md "schema_cli.json#/properties/opts/properties/timeout")

### timeout Type

`number`

### timeout Constraints

**minimum**: the value of this number must greater than or equal to: `0`

## close

Automatically close Chrome after finish (only when not headless)

`close`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [CLI arguments and options](schema_cli-properties-options-properties-close.md "schema_cli.json#/properties/opts/properties/close")

### close Type

`boolean`

## executable

Path to Chrome executable

`executable`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [CLI arguments and options](schema_cli-properties-options-properties-executable.md "schema_cli.json#/properties/opts/properties/executable")

### executable Type

`string`

## output

Path to the output dir or disabling output (if false)

`output`

*   is optional

*   Type: merged type ([Details](schema_cli-properties-options-properties-output.md))

*   cannot be null

*   defined in: [CLI arguments and options](schema_cli-properties-options-properties-output.md "schema_cli.json#/properties/opts/properties/output")

### output Type

merged type ([Details](schema_cli-properties-options-properties-output.md))

one (and only one) of

*   [Untitled string in CLI arguments and options](schema_cli-properties-options-properties-output-oneof-0.md "check type definition")

*   [Untitled boolean in CLI arguments and options](schema_cli-properties-options-properties-output-oneof-1.md "check type definition")

## view

Open generated Viewer file in a browser after finish (if output is enabled)

`view`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [CLI arguments and options](schema_cli-properties-options-properties-view.md "schema_cli.json#/properties/opts/properties/view")

### view Type

`boolean`
