# reload Schema

```txt
schema_before.json#/oneOf/6
```

Reload current page

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_before.json\*](../lib/schemas/schema_before.json "open original schema") |

## 6 Type

`object` ([reload](schema_before-oneof-reload.md))

# 6 Properties

| Property        | Type     | Required | Nullable       | Defined by                                                                                                      |
| :-------------- | :------- | :------- | :------------- | :-------------------------------------------------------------------------------------------------------------- |
| [event](#event) | `string` | Required | cannot be null | [Before section](schema_before-oneof-reload-properties-event.md "schema_before.json#/oneOf/6/properties/event") |

## event



`event`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Before section](schema_before-oneof-reload-properties-event.md "schema_before.json#/oneOf/6/properties/event")

### event Type

`string`

### event Constraints

**constant**: the value of this property must be equal to:

```json
"reload"
```
