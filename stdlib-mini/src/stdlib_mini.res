// Since [others] depend on this file, its public mli files **should not
// export types** introduced here, otherwise it would cause
// conflicts here.
//
// If the type exported here is also exported in modules from others,
// you will get a type not equivalent.
//
// Types defined here but should not export:
// - ref (make sure not exported in public others/*.mli)

external \"^": (string, string) => string = "#string_append"
external \"=": ('a, 'a) => bool = "%equal"
external \"<>": ('a, 'a) => bool = "%notequal"
external \"==": ('a, 'a) => bool = "%eq"
external \"!=": ('a, 'a) => bool = "%noteq"
external \"<": ('a, 'a) => bool = "%lessthan"
external \">": ('a, 'a) => bool = "%greaterthan"
external \"<=": ('a, 'a) => bool = "%lessequal"
external \">=": ('a, 'a) => bool = "%greaterequal"
external \"+": (int, int) => int = "%addint"
external \"-": (int, int) => int = "%subint"
external \"~-": int => int = "%negint"
external \"*": (int, int) => int = "%mulint"
external \"/": (int, int) => int = "%divint"
external lsl: (int, int) => int = "%lslint"
external lor: (int, int) => int = "%orint"
external land: (int, int) => int = "%andint"
external mod: (int, int) => int = "%modint"
external lsr: (int, int) => int = "%lsrint"
external lxor: (int, int) => int = "%xorint"
external asr: (int, int) => int = "%asrint"
type ref<'a> = {mutable contents: 'a}
external ref: 'a => ref<'a> = "%makemutable"
external \":=": (ref<'a>, 'a) => unit = "%bs_ref_setfield0"

external \"||": (bool, bool) => bool = "%sequor"
external \"&&": (bool, bool) => bool = "%sequand"
external not: bool => bool = "%boolnot"

external raise: exn => 'a = "%raise"
external ignore: 'a => unit = "%ignore"
external \"|>": ('a, 'a => 'b) => 'b = "%revapply"
external \"@@": ('a => 'b, 'a) => 'b = "%apply"

@val @scope("Math") external \"**": (float, float) => float = "pow"
external \"~-.": float => float = "%negfloat"
external \"+.": (float, float) => float = "%addfloat"
external \"-.": (float, float) => float = "%subfloat"
external \"*.": (float, float) => float = "%mulfloat"
external \"/.": (float, float) => float = "%divfloat"

module Obj = {
  type t
  external field: (t, int) => t = "%obj_field"
  external set_field: (t, int, t) => unit = "%obj_set_field"
  external tag: t => int = "?obj_tag"
  external repr: 'a => t = "%identity"
  external obj: t => 'a = "%identity"
  external magic: 'a => 'b = "%identity"
  external size: t => int = "#obj_length"
}

module Pervasives = {
  external compare: ('a, 'a) => int = "%compare"
  external not: bool => bool = "%boolnot"
  external min: ('a, 'a) => 'a = "%bs_min"
  external max: ('a, 'a) => 'a = "%bs_max"
  external \"=": ('a, 'a) => bool = "%equal"
}

module String = {
  external get: (string, int) => char = "%string_safe_get"
}

module Js = {
  // for async
  module Promise = {
    external unsafe_async: 'a => promise<'a> = "%identity"
    external unsafe_await: promise<'a> => 'a = "?await"
  }

  /** JS object type */
  type t<'a> = {..} as 'a

  // module MapperRt = Js_mapperRt

  module Internal = {
    external opaqueFullApply: 'a => 'a = "%uncurried_apply"

    /* Use opaque instead of [._n] to prevent some optimizations happening */
    external run: (unit => 'a) => 'a = "#run"
    external opaque: 'a => 'a = "%opaque"
  }

  /**
  Nullable value of this type can be either null or 'a. This type is equivalent to Js.Null.t.
*/
  type null<+'a> = Js_types.null<'a>

  /**
  A value of this type can be either undefined or 'a. This type is equivalent to Js.Undefined.t.
*/
  type undefined<+'a> = Js_types.undefined<'a>

  type nullable<+'a> = Js_types.nullable<'a>

  module Undefined = {
    external empty: undefined<'a> = "#undefined"

    external return: 'a => undefined<'a> = "%identity"
  }

  /**
  A value of this type can be undefined, null or 'a. This type is equivalent to Js.Null_undefined.t.
*/
  type null_undefined<+'a> = nullable<'a>

  external toOption: nullable<'a> => option<'a> = "#nullable_to_opt"
  external undefinedToOption: undefined<'a> => option<'a> = "#undefined_to_opt"
  external nullToOption: null<'a> => option<'a> = "#null_to_opt"
  external isNullable: nullable<'a> => bool = "#is_nullable"
  external import: 'a => promise<'a> = "#import"

  /** The same as {!test} except that it is more permissive on the types of input */
  external testAny: 'a => bool = "#is_nullable"

  /**
  The promise type, defined here for interoperation across packages.
*/
  type promise<+'a, +'e>

  /**
  The same as empty in `Js.Null`. Compiles to `null`.
*/
  external null: null<'a> = "#null"

  /**
  The same as empty `Js.Undefined`. Compiles to `undefined`.
*/
  external undefined: undefined<'a> = "#undefined"

  /**
`typeof x` will be compiled as `typeof x` in JS. Please consider functions in
`Js.Types` for a type safe way of reflection.
*/
  external typeof: 'a => string = "#typeof"

  /** Equivalent to console.log any value. */
  @val
  @scope("console")
  external log: 'a => unit = "log"

  @val @scope("console") external log2: ('a, 'b) => unit = "log"
  @val @scope("console") external log3: ('a, 'b, 'c) => unit = "log"
  @val @scope("console") external log4: ('a, 'b, 'c, 'd) => unit = "log"

  /** A convenience function to console.log more than 4 arguments */
  @val
  @scope("console")
  @variadic
  external logMany: array<'a> => unit = "log"

  external eqNull: ('a, null<'a>) => bool = "%bs_equal_null"
  external eqUndefined: ('a, undefined<'a>) => bool = "%bs_equal_undefined"
  external eqNullable: ('a, nullable<'a>) => bool = "%bs_equal_nullable"

  /** ## Operators */
  /**
   `unsafe_lt(a, b)` will be compiled as `a < b`.
    It is marked as unsafe, since it is impossible
    to give a proper semantics for comparision which applies to any type
*/
  external unsafe_lt: ('a, 'a) => bool = "#unsafe_lt"

  /**
   `unsafe_le(a, b)` will be compiled as `a <= b`.
   See also `Js.unsafe_lt`.
*/
  external unsafe_le: ('a, 'a) => bool = "#unsafe_le"

  /**
   `unsafe_gt(a, b)` will be compiled as `a > b`.
    See also `Js.unsafe_lt`.
*/
  external unsafe_gt: ('a, 'a) => bool = "#unsafe_gt"

  /**
   `unsafe_ge(a, b)` will be compiled as `a >= b`.
   See also `Js.unsafe_lt`.
*/
  external unsafe_ge: ('a, 'a) => bool = "#unsafe_ge"
}
