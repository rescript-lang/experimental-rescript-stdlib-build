@unboxed
type nullable<+'a> =
  | Value('a)
  | @as(null) Null
  | @as(undefined) Undefined

@unboxed
type null<+'a> =
  | Value('a)
  | @as(null) Null

@unboxed
type rec json =
  | Boolean(bool)
  | @as(null) Null
  | String(string)
  | Number(float)
  | Object(dict<json>)
  | Array(array<json>)

type undefined<+'a>

type date

type regExp

type jsExn = unknown

type timeoutId

type intervalId

type symbol

type arrayLike<'a>

type set<'a>

type map<'k, 'v>

type weakSet<'a>

type weakMap<'k, 'v>

type arrayBuffer

type window

type document
