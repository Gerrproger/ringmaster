# select Schema

```txt
schema_before.json#/oneOf/4
```

Select options in the selector element

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_before.json\*](../lib/schemas/schema_before.json "open original schema") |

## 4 Type

`object` ([select](schema_before-oneof-select.md))

# 4 Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                                  |
| :-------------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| [event](#event)       | `string` | Required | cannot be null | [Before section](schema_before-oneof-select-properties-event.md "schema_before.json#/oneOf/4/properties/event")             |
| [selector](#selector) | `string` | Required | cannot be null | [Before section](schema_before-oneof-select-properties-selector.md "schema_before.json#/oneOf/4/properties/selector")       |
| [values](#values)     | `array`  | Required | cannot be null | [Before section](schema_before-oneof-select-properties-values-to-select.md "schema_before.json#/oneOf/4/properties/values") |

## event



`event`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Before section](schema_before-oneof-select-properties-event.md "schema_before.json#/oneOf/4/properties/event")

### event Type

`string`

### event Constraints

**constant**: the value of this property must be equal to:

```json
"select"
```

## selector



`selector`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Before section](schema_before-oneof-select-properties-selector.md "schema_before.json#/oneOf/4/properties/selector")

### selector Type

`string`

## values



`values`

*   is required

*   Type: `string[]`

*   cannot be null

*   defined in: [Before section](schema_before-oneof-select-properties-values-to-select.md "schema_before.json#/oneOf/4/properties/values")

### values Type

`string[]`
