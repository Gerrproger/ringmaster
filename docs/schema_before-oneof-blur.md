# blur Schema

```txt
schema_before.json#/oneOf/3
```

Blur the element

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_before.json\*](../lib/schemas/schema_before.json "open original schema") |

## 3 Type

`object` ([blur](schema_before-oneof-blur.md))

# 3 Properties

| Property              | Type     | Required | Nullable       | Defined by                                                                                                          |
| :-------------------- | :------- | :------- | :------------- | :------------------------------------------------------------------------------------------------------------------ |
| [event](#event)       | `string` | Required | cannot be null | [Before section](schema_before-oneof-blur-properties-event.md "schema_before.json#/oneOf/3/properties/event")       |
| [selector](#selector) | `string` | Required | cannot be null | [Before section](schema_before-oneof-blur-properties-selector.md "schema_before.json#/oneOf/3/properties/selector") |

## event



`event`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Before section](schema_before-oneof-blur-properties-event.md "schema_before.json#/oneOf/3/properties/event")

### event Type

`string`

### event Constraints

**constant**: the value of this property must be equal to:

```json
"blur"
```

## selector



`selector`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Before section](schema_before-oneof-blur-properties-selector.md "schema_before.json#/oneOf/3/properties/selector")

### selector Type

`string`
