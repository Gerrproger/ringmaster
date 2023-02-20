# Viewport object Schema

```txt
schema_viewport.json
```

Used to set the viewport before executing a test suit

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                          |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :---------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_viewport.json](../lib/schemas/schema_viewport.json "open original schema") |

## Viewport object Type

`object` ([Viewport object](schema_viewport.md))

# Viewport object Properties

| Property          | Type     | Required | Nullable       | Defined by                                                                                        |
| :---------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------ |
| [width](#width)   | `number` | Required | cannot be null | [Viewport object](schema_viewport-properties-width.md "schema_viewport.json#/properties/width")   |
| [height](#height) | `number` | Required | cannot be null | [Viewport object](schema_viewport-properties-height.md "schema_viewport.json#/properties/height") |

## width



`width`

*   is required

*   Type: `number`

*   cannot be null

*   defined in: [Viewport object](schema_viewport-properties-width.md "schema_viewport.json#/properties/width")

### width Type

`number`

### width Constraints

**minimum**: the value of this number must greater than or equal to: `0`

### width Default Value

The default value is:

```json
800
```

## height



`height`

*   is required

*   Type: `number`

*   cannot be null

*   defined in: [Viewport object](schema_viewport-properties-height.md "schema_viewport.json#/properties/height")

### height Type

`number`

### height Constraints

**minimum**: the value of this number must greater than or equal to: `0`

### height Default Value

The default value is:

```json
400
```
