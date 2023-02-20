# focus Schema

```txt
schema_before.json#/oneOf/2
```

Focus the element

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_before.json\*](../lib/schemas/schema_before.json "open original schema") |

## 2 Type

`object` ([focus](schema_before-oneof-focus.md))

# 2 Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                           |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------- |
| [event](#event)       | `string` | Required | cannot be null | [Before section](schema_before-oneof-focus-properties-event.md "schema_before.json#/oneOf/2/properties/event")       |
| [selector](#selector) | `string` | Required | cannot be null | [Before section](schema_before-oneof-focus-properties-selector.md "schema_before.json#/oneOf/2/properties/selector") |

## event



`event`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Before section](schema_before-oneof-focus-properties-event.md "schema_before.json#/oneOf/2/properties/event")

### event Type

`string`

### event Constraints

**constant**: the value of this property must be equal to:

```json
"focus"
```

## selector



`selector`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Before section](schema_before-oneof-focus-properties-selector.md "schema_before.json#/oneOf/2/properties/selector")

### selector Type

`string`
