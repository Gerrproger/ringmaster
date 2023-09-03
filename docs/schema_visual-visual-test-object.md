# Visual test object Schema

```txt
schema_visual.json#/items
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_visual.json\*](../lib/schemas/schema_visual.json "open original schema") |

## items Type

`object` ([Visual test object](schema_visual-visual-test-object.md))

# items Properties

| Property                                | Type      | Required | Nullable       | Defined by                                                                                                                                      |
| :-------------------------------------- | :-------- | :------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| [name](#name)                           | `string`  | Required | cannot be null | [Visual config file](schema_visual-visual-test-object-properties-name.md "schema_visual.json#/items/properties/name")                           |
| [path](#path)                           | `string`  | Required | cannot be null | [Visual config file](schema_visual-visual-test-object-properties-path.md "schema_visual.json#/items/properties/path")                           |
| [directory](#directory)                 | `string`  | Optional | cannot be null | [Visual config file](schema_visual-visual-test-object-properties-directory.md "schema_visual.json#/items/properties/directory")                 |
| [sensitivity](#sensitivity)             | `number`  | Optional | cannot be null | [Visual config file](schema_visual-visual-test-object-properties-sensitivity.md "schema_visual.json#/items/properties/sensitivity")             |
| [allowedDifference](#alloweddifference) | `number`  | Optional | cannot be null | [Visual config file](schema_visual-visual-test-object-properties-alloweddifference.md "schema_visual.json#/items/properties/allowedDifference") |
| [delay](#delay)                         | `number`  | Optional | cannot be null | [Visual config file](schema_visual-visual-test-object-properties-delay.md "schema_visual.json#/items/properties/delay")                         |
| [maxScreenshots](#maxscreenshots)       | Merged    | Optional | cannot be null | [Visual config file](schema_visual-visual-test-object-properties-maxscreenshots.md "schema_visual.json#/items/properties/maxScreenshots")       |
| [scrollPage](#scrollpage)               | `boolean` | Optional | cannot be null | [Visual config file](schema_visual-visual-test-object-properties-scrollpage.md "schema_visual.json#/items/properties/scrollPage")               |
| [createDiffImg](#creatediffimg)         | `boolean` | Optional | cannot be null | [Visual config file](schema_visual-visual-test-object-properties-creatediffimg.md "schema_visual.json#/items/properties/createDiffImg")         |
| [before](#before)                       | `array`   | Optional | cannot be null | [Visual config file](schema_visual-visual-test-object-properties-before.md "schema_visual.json#/items/properties/before")                       |

## name

Name of the test case

`name`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Visual config file](schema_visual-visual-test-object-properties-name.md "schema_visual.json#/items/properties/name")

### name Type

`string`

## path

Pathname to the website page (relative to hostname)

`path`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Visual config file](schema_visual-visual-test-object-properties-path.md "schema_visual.json#/items/properties/path")

### path Type

`string`

### path Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^/
```

[try pattern](https://regexr.com/?expression=%5E%2F "try regular expression with regexr.com")

## directory

Path to the screenshot dir

`directory`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Visual config file](schema_visual-visual-test-object-properties-directory.md "schema_visual.json#/items/properties/directory")

### directory Type

`string`

### directory Default Value

The default value is:

```json
"./_results/screenshots"
```

## sensitivity

Comparison sensitivity threshold (in float between 0 and 1, larger is more sensitive)

`sensitivity`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Visual config file](schema_visual-visual-test-object-properties-sensitivity.md "schema_visual.json#/items/properties/sensitivity")

### sensitivity Type

`number`

### sensitivity Constraints

**maximum**: the value of this number must smaller than or equal to: `1`

**minimum**: the value of this number must greater than or equal to: `0`

### sensitivity Default Value

The default value is:

```json
0.9
```

## allowedDifference

Allowed number of different pixels for images to be considered similar (in px)

`allowedDifference`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Visual config file](schema_visual-visual-test-object-properties-alloweddifference.md "schema_visual.json#/items/properties/allowedDifference")

### allowedDifference Type

`number`

### allowedDifference Constraints

**minimum**: the value of this number must greater than or equal to: `0`

## delay

Delay (in ms) to wait after page load and before making the screenshot

`delay`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Visual config file](schema_visual-visual-test-object-properties-delay.md "schema_visual.json#/items/properties/delay")

### delay Type

`number`

### delay Constraints

**minimum**: the value of this number must greater than or equal to: `0`

## maxScreenshots

Number of recent screenshots to store. If false, old screenshots will not be deleted

`maxScreenshots`

*   is optional

*   Type: merged type ([Details](schema_visual-visual-test-object-properties-maxscreenshots.md))

*   cannot be null

*   defined in: [Visual config file](schema_visual-visual-test-object-properties-maxscreenshots.md "schema_visual.json#/items/properties/maxScreenshots")

### maxScreenshots Type

merged type ([Details](schema_visual-visual-test-object-properties-maxscreenshots.md))

one (and only one) of

*   [Untitled number in Visual config file](schema_visual-visual-test-object-properties-maxscreenshots-oneof-0.md "check type definition")

*   [Untitled boolean in Visual config file](schema_visual-visual-test-object-properties-maxscreenshots-oneof-1.md "check type definition")

## scrollPage

Whether to automatically scroll to the bottom of the page

`scrollPage`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Visual config file](schema_visual-visual-test-object-properties-scrollpage.md "schema_visual.json#/items/properties/scrollPage")

### scrollPage Type

`boolean`

### scrollPage Default Value

The default value is:

```json
true
```

## createDiffImg

Whether to place the differential png file in the screenshots folder

`createDiffImg`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Visual config file](schema_visual-visual-test-object-properties-creatediffimg.md "schema_visual.json#/items/properties/createDiffImg")

### createDiffImg Type

`boolean`

## before

Execute actions before performing the check

`before`

*   is optional

*   Type: an array of merged types ([Before section](schema_selectors-selector-test-object-properties-before-before-section.md))

*   cannot be null

*   defined in: [Visual config file](schema_visual-visual-test-object-properties-before.md "schema_visual.json#/items/properties/before")

### before Type

an array of merged types ([Before section](schema_selectors-selector-test-object-properties-before-before-section.md))
