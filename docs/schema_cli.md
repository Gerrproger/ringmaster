# CLI arguments and options Schema

```txt
schema_cli.json
```



| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :------------------------------------------------------------------------ |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_cli.json](../lib/schemas/schema_cli.json "open original schema") |

## CLI arguments and options Type

`object` ([CLI arguments and options](schema_cli.md))

# CLI arguments and options Properties

| Property      | Type     | Required | Nullable       | Defined by                                                                                       |
| :------------ | :------- | :------- | :------------- | :----------------------------------------------------------------------------------------------- |
| [dirs](#dirs) | `array`  | Optional | cannot be null | [CLI arguments and options](schema_cli-properties-dirs.md "schema_cli.json#/properties/dirs")    |
| [opts](#opts) | `object` | Optional | cannot be null | [CLI arguments and options](schema_cli-properties-options.md "schema_cli.json#/properties/opts") |

## dirs



`dirs`

*   is optional

*   Type: `string[]`

*   cannot be null

*   defined in: [CLI arguments and options](schema_cli-properties-dirs.md "schema_cli.json#/properties/dirs")

### dirs Type

`string[]`

## opts



`opts`

*   is optional

*   Type: `object` ([Options](schema_cli-properties-options.md))

*   cannot be null

*   defined in: [CLI arguments and options](schema_cli-properties-options.md "schema_cli.json#/properties/opts")

### opts Type

`object` ([Options](schema_cli-properties-options.md))
