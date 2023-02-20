# Untitled string in Config file Schema

```txt
schema_config.json#/properties/host
```

Website hostname for this test suite (only one)

| Abstract            | Extensible | Status         | Identifiable            | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :---------------------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | Unknown identifiability | Forbidden         | Allowed               | none                | [schema\_config.json\*](../lib/schemas/schema_config.json "open original schema") |

## host Type

`string`

## host Constraints

**pattern**: the string must match the following regular expression:&#x20;

```regexp
^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$
```

[try pattern](https://regexr.com/?expression=%5E\(\(%5Ba-zA-Z0-9%5D%7C%5Ba-zA-Z0-9%5D%5Ba-zA-Z0-9%5C-%5D*%5Ba-zA-Z0-9%5D\)%5C.\)*\(%5BA-Za-z0-9%5D%7C%5BA-Za-z0-9%5D%5BA-Za-z0-9%5C-%5D*%5BA-Za-z0-9%5D\)%24 "try regular expression with regexr.com")
