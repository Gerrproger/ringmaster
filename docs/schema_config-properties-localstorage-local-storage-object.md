# Local Storage object Schema

```txt
schema_localStorage.json#/properties/localStorage/items
```

Used to set localStorage items before executing a test suit

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_config.json\*](../lib/schemas/schema_config.json "open original schema") |

## items Type

`object` ([Local Storage object](schema_config-properties-localstorage-local-storage-object.md))

# items Properties

| Property        | Type     | Required | Nullable       | Defined by                                                                                                   |
| :-------------- | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------------------- |
| [name](#name)   | `string` | Required | cannot be null | [Local Storage object](schema_localstorage-properties-name.md "schema_localStorage.json#/properties/name")   |
| [value](#value) | `string` | Required | cannot be null | [Local Storage object](schema_localstorage-properties-value.md "schema_localStorage.json#/properties/value") |

## name



`name`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Local Storage object](schema_localstorage-properties-name.md "schema_localStorage.json#/properties/name")

### name Type

`string`

## value



`value`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Local Storage object](schema_localstorage-properties-value.md "schema_localStorage.json#/properties/value")

### value Type

`string`
