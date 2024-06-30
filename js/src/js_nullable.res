@unboxed
type t<+'a> = Runtime_types.nullable<'a> =
  | Value('a)
  | @as(null) Null
  | @as(undefined) Undefined
