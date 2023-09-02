# Untitled number in Visual config file Schema

```txt
schema_visual.json#/items/properties/sensitivity
```

Comparison sensitivity threshold (in float between 0 and 1, smaller more sensitive)

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [schema\_visual.json\*](../lib/schemas/schema_visual.json "open original schema") |

## sensitivity Type

`number`

## sensitivity Constraints

**maximum**: the value of this number must smaller than or equal to: `1`

**minimum**: the value of this number must greater than or equal to: `0`

## sensitivity Default Value

The default value is:

```json
0.1
```
