# Selector test object Schema

```txt
schema_selectors.json#/items
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                              |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_selectors.json\*](../lib/schemas/schema_selectors.json "open original schema") |

## items Type

`object` ([Selector test object](schema_selectors-selector-test-object.md))

# items Properties

| Property              | Type      | Required | Nullable       | Defined by                                                                                                                        |
| :-------------------- | :-------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [name](#name)         | `string`  | Required | cannot be null | [Selectors file](schema_selectors-selector-test-object-properties-name.md "schema_selectors.json#/items/properties/name")         |
| [path](#path)         | `string`  | Required | cannot be null | [Selectors file](schema_selectors-selector-test-object-properties-path.md "schema_selectors.json#/items/properties/path")         |
| [selector](#selector) | `string`  | Required | cannot be null | [Selectors file](schema_selectors-selector-test-object-properties-selector.md "schema_selectors.json#/items/properties/selector") |
| [visible](#visible)   | `boolean` | Optional | cannot be null | [Selectors file](schema_selectors-selector-test-object-properties-visible.md "schema_selectors.json#/items/properties/visible")   |
| [timeout](#timeout)   | `number`  | Optional | cannot be null | [Selectors file](schema_selectors-selector-test-object-properties-timeout.md "schema_selectors.json#/items/properties/timeout")   |
| [before](#before)     | `array`   | Optional | cannot be null | [Selectors file](schema_selectors-selector-test-object-properties-before.md "schema_selectors.json#/items/properties/before")     |

## name

Name of the test case

`name`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Selectors file](schema_selectors-selector-test-object-properties-name.md "schema_selectors.json#/items/properties/name")

### name Type

`string`

## path

Paathname to the website page (relative to hostname)

`path`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Selectors file](schema_selectors-selector-test-object-properties-path.md "schema_selectors.json#/items/properties/path")

### path Type

`string`

### path Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^/
```

[try pattern](https://regexr.com/?expression=%5E%2F "try regular expression with regexr.com")

## selector

Selector for the element

`selector`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Selectors file](schema_selectors-selector-test-object-properties-selector.md "schema_selectors.json#/items/properties/selector")

### selector Type

`string`

## visible

The element should be visible

`visible`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Selectors file](schema_selectors-selector-test-object-properties-visible.md "schema_selectors.json#/items/properties/visible")

### visible Type

`boolean`

## timeout

Timeout (in ms) to wait for the elemnt until test fails

`timeout`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Selectors file](schema_selectors-selector-test-object-properties-timeout.md "schema_selectors.json#/items/properties/timeout")

### timeout Type

`number`

### timeout Constraints

**minimum**: the value of this number must greater than or equal to: `0`

## before

Execute actions before performing the check

`before`

*   is optional

*   Type: an array of merged types ([Before section](schema_selectors-selector-test-object-properties-before-before-section.md))

*   cannot be null

*   defined in: [Selectors file](schema_selectors-selector-test-object-properties-before.md "schema_selectors.json#/items/properties/before")

### before Type

an array of merged types ([Before section](schema_selectors-selector-test-object-properties-before-before-section.md))
