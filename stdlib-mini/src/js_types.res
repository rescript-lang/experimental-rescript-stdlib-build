@unboxed
type nullable<+'a> =
  | Value('a)
  | @as(null) Null
  | @as(undefined) Undefined

@unboxed
type null<+'a> =
  | Value('a)
  | @as(null) Null

type undefined<+'a>
