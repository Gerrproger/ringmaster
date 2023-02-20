# Cookie object Schema

```txt
schema_cookie.json#/properties/cookies/items
```

Used to set cookies before executing a test suit

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                                        |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :-------------------------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Forbidden             | none                | [schema\_config.json\*](../lib/schemas/schema_config.json "open original schema") |

## items Type

`object` ([Cookie object](schema_config-properties-cookies-cookie-object.md))

# items Properties

| Property              | Type      | Required | Nullable       | Defined by                                                                                      |
| :-------------------- | :-------- | :------- | :------------- | :---------------------------------------------------------------------------------------------- |
| [name](#name)         | `string`  | Required | cannot be null | [Cookie object](schema_cookie-properties-name.md "schema_cookie.json#/properties/name")         |
| [value](#value)       | `string`  | Required | cannot be null | [Cookie object](schema_cookie-properties-value.md "schema_cookie.json#/properties/value")       |
| [domain](#domain)     | `string`  | Optional | cannot be null | [Cookie object](schema_cookie-properties-domain.md "schema_cookie.json#/properties/domain")     |
| [path](#path)         | `string`  | Optional | cannot be null | [Cookie object](schema_cookie-properties-path.md "schema_cookie.json#/properties/path")         |
| [expires](#expires)   | `number`  | Optional | cannot be null | [Cookie object](schema_cookie-properties-expires.md "schema_cookie.json#/properties/expires")   |
| [httpOnly](#httponly) | `boolean` | Optional | cannot be null | [Cookie object](schema_cookie-properties-httponly.md "schema_cookie.json#/properties/httpOnly") |
| [secure](#secure)     | `boolean` | Optional | cannot be null | [Cookie object](schema_cookie-properties-secure.md "schema_cookie.json#/properties/secure")     |
| [session](#session)   | `boolean` | Optional | cannot be null | [Cookie object](schema_cookie-properties-session.md "schema_cookie.json#/properties/session")   |

## name



`name`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Cookie object](schema_cookie-properties-name.md "schema_cookie.json#/properties/name")

### name Type

`string`

## value



`value`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Cookie object](schema_cookie-properties-value.md "schema_cookie.json#/properties/value")

### value Type

`string`

## domain



`domain`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Cookie object](schema_cookie-properties-domain.md "schema_cookie.json#/properties/domain")

### domain Type

`string`

## path



`path`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Cookie object](schema_cookie-properties-path.md "schema_cookie.json#/properties/path")

### path Type

`string`

## expires



`expires`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Cookie object](schema_cookie-properties-expires.md "schema_cookie.json#/properties/expires")

### expires Type

`number`

## httpOnly



`httpOnly`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Cookie object](schema_cookie-properties-httponly.md "schema_cookie.json#/properties/httpOnly")

### httpOnly Type

`boolean`

## secure



`secure`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Cookie object](schema_cookie-properties-secure.md "schema_cookie.json#/properties/secure")

### secure Type

`boolean`

## session



`session`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Cookie object](schema_cookie-properties-session.md "schema_cookie.json#/properties/session")

### session Type

`boolean`
