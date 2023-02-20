# offline Schema

```txt
schema_before.json#/oneOf/8
```

Set current page network status as offline

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_before.json\*](../lib/schemas/schema_before.json "open original schema") |

## 8 Type

`object` ([offline](schema_before-oneof-offline.md))

# 8 Properties

| Property        | Type     | Required | Nullable       | Defined by                                                                                                       |
| :-------------- | :------- | :------- | :------------- | :--------------------------------------------------------------------------------------------------------------- |
| [event](#event) | `string` | Required | cannot be null | [Before section](schema_before-oneof-offline-properties-event.md "schema_before.json#/oneOf/8/properties/event") |

## event



`event`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Before section](schema_before-oneof-offline-properties-event.md "schema_before.json#/oneOf/8/properties/event")

### event Type

`string`

### event Constraints

**constant**: the value of this property must be equal to:

```json
"offline"
```
