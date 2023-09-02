# Config file Schema

```txt
schema_config.json
```

This is the main configuration for a test

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                      |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_config.json](../lib/schemas/schema_config.json "open original schema") |

## Config file Type

`object` ([Config file](schema_config.md))

# Config file Properties

| Property                      | Type      | Required | Nullable       | Defined by                                                                                             |
| :---------------------------- | :-------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------- |
| [name](#name)                 | `string`  | Required | cannot be null | [Config file](schema_config-properties-name.md "schema_config.json#/properties/name")                  |
| [host](#host)                 | `string`  | Required | cannot be null | [Config file](schema_config-properties-host.md "schema_config.json#/properties/host")                  |
| [headless](#headless)         | `boolean` | Optional | cannot be null | [Config file](schema_config-properties-headless.md "schema_config.json#/properties/headless")          |
| [muted](#muted)               | `boolean` | Optional | cannot be null | [Config file](schema_config-properties-muted.md "schema_config.json#/properties/muted")                |
| [timeout](#timeout)           | `number`  | Optional | cannot be null | [Config file](schema_config-properties-timeout.md "schema_config.json#/properties/timeout")            |
| [close](#close)               | `boolean` | Optional | cannot be null | [Config file](schema_config-properties-close.md "schema_config.json#/properties/close")                |
| [executable](#executable)     | `string`  | Optional | cannot be null | [Config file](schema_config-properties-executable.md "schema_config.json#/properties/executable")      |
| [output](#output)             | Merged    | Optional | cannot be null | [Config file](schema_config-properties-output.md "schema_config.json#/properties/output")              |
| [view](#view)                 | `boolean` | Optional | cannot be null | [Config file](schema_config-properties-view.md "schema_config.json#/properties/view")                  |
| [viewport](#viewport)         | `object`  | Optional | cannot be null | [Config file](schema_config-properties-viewport-object.md "schema_viewport.json#/properties/viewport") |
| [cookies](#cookies)           | `array`   | Optional | cannot be null | [Config file](schema_config-properties-cookies.md "schema_config.json#/properties/cookies")            |
| [localStorage](#localstorage) | `array`   | Optional | cannot be null | [Config file](schema_config-properties-localstorage.md "schema_config.json#/properties/localStorage")  |

## name

Test suit name

`name`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Config file](schema_config-properties-name.md "schema_config.json#/properties/name")

### name Type

`string`

## host

Website hostname for this test suite (only one)

`host`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Config file](schema_config-properties-host.md "schema_config.json#/properties/host")

### host Type

`string`

### host Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$
```

[try pattern](https://regexr.com/?expression=%5E\(\(%5Ba-zA-Z0-9%5D%7C%5Ba-zA-Z0-9%5D%5Ba-zA-Z0-9%5C-%5D*%5Ba-zA-Z0-9%5D\)%5C.\)*\(%5BA-Za-z0-9%5D%7C%5BA-Za-z0-9%5D%5BA-Za-z0-9%5C-%5D*%5BA-Za-z0-9%5D\)%24 "try regular expression with regexr.com")

## headless

Run Chrome in headless (hidden) mode

`headless`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Config file](schema_config-properties-headless.md "schema_config.json#/properties/headless")

### headless Type

`boolean`

### headless Default Value

The default value is:

```json
true
```

## muted

Mute Chrome entirely (only when not headless)

`muted`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Config file](schema_config-properties-muted.md "schema_config.json#/properties/muted")

### muted Type

`boolean`

### muted Default Value

The default value is:

```json
true
```

## timeout

Default timeout (ms) used in all tests

`timeout`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Config file](schema_config-properties-timeout.md "schema_config.json#/properties/timeout")

### timeout Type

`number`

### timeout Constraints

**minimum**: the value of this number must greater than or equal to: `0`

### timeout Default Value

The default value is:

```json
30000
```

## close

Automatically close Chrome after finish (only when not headless)

`close`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Config file](schema_config-properties-close.md "schema_config.json#/properties/close")

### close Type

`boolean`

### close Default Value

The default value is:

```json
true
```

## executable

Path to Chrome executable

`executable`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Config file](schema_config-properties-executable.md "schema_config.json#/properties/executable")

### executable Type

`string`

## output

Path to the output dir or disabling output (if false)

`output`

*   is optional

*   Type: merged type ([Details](schema_config-properties-output.md))

*   cannot be null

*   defined in: [Config file](schema_config-properties-output.md "schema_config.json#/properties/output")

### output Type

merged type ([Details](schema_config-properties-output.md))

one (and only one) of

*   [Untitled string in Config file](schema_config-properties-output-oneof-0.md "check type definition")

*   [Untitled boolean in Config file](schema_config-properties-output-oneof-1.md "check type definition")

## view

Open generated Viewer file in a browser after finish (if output is enabled)

`view`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Config file](schema_config-properties-view.md "schema_config.json#/properties/view")

### view Type

`boolean`

## viewport

Used to set the viewport before executing a test suit

`viewport`

*   is optional

*   Type: `object` ([Viewport object](schema_config-properties-viewport-object.md))

*   cannot be null

*   defined in: [Config file](schema_config-properties-viewport-object.md "schema_viewport.json#/properties/viewport")

### viewport Type

`object` ([Viewport object](schema_config-properties-viewport-object.md))

## cookies

Cookies to set before running test cases

`cookies`

*   is optional

*   Type: `object[]` ([Cookie object](schema_config-properties-cookies-cookie-object.md))

*   cannot be null

*   defined in: [Config file](schema_config-properties-cookies.md "schema_config.json#/properties/cookies")

### cookies Type

`object[]` ([Cookie object](schema_config-properties-cookies-cookie-object.md))

## localStorage

Local Storage items to set before running test cases

`localStorage`

*   is optional

*   Type: `object[]` ([Local Storage object](schema_config-properties-localstorage-local-storage-object.md))

*   cannot be null

*   defined in: [Config file](schema_config-properties-localstorage.md "schema_config.json#/properties/localStorage")

### localStorage Type

`object[]` ([Local Storage object](schema_config-properties-localstorage-local-storage-object.md))
