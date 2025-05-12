(module
 (type $0 (func (result i32)))
 (type $1 (func (param f32 f32) (result f32)))
 (type $2 (func (param i32 i32) (result i32)))
 (type $3 (func (param i32 i32)))
 (type $4 (func (param i32)))
 (type $5 (func (param i32) (result i32)))
 (type $6 (func))
 (type $7 (func (param i32 f32 f32 f32) (result f32)))
 (global $greenova/static/as/assembly/index/ERROR_NONE i32 (i32.const 0))
 (global $greenova/static/as/assembly/index/ERROR_GENERAL i32 (i32.const 1))
 (global $greenova/static/as/assembly/index/ERROR_THEME i32 (i32.const 2))
 (global $greenova/static/as/assembly/index/ERROR_ANIMATION i32 (i32.const 3))
 (global $greenova/static/as/assembly/index/THEME_LIGHT i32 (i32.const 0))
 (global $greenova/static/as/assembly/index/THEME_DARK i32 (i32.const 1))
 (global $greenova/static/as/assembly/index/THEME_AUTO i32 (i32.const 2))
 (memory $0 1)
 (export "ERROR_NONE" (global $greenova/static/as/assembly/index/ERROR_NONE))
 (export "ERROR_GENERAL" (global $greenova/static/as/assembly/index/ERROR_GENERAL))
 (export "ERROR_THEME" (global $greenova/static/as/assembly/index/ERROR_THEME))
 (export "ERROR_ANIMATION" (global $greenova/static/as/assembly/index/ERROR_ANIMATION))
 (export "THEME_LIGHT" (global $greenova/static/as/assembly/index/THEME_LIGHT))
 (export "THEME_DARK" (global $greenova/static/as/assembly/index/THEME_DARK))
 (export "THEME_AUTO" (global $greenova/static/as/assembly/index/THEME_AUTO))
 (export "setTheme" (func $greenova/static/as/assembly/index/setTheme))
 (export "getTheme" (func $greenova/static/as/assembly/index/getTheme))
 (export "resolveTheme" (func $greenova/static/as/assembly/index/resolveTheme))
 (export "recordError" (func $greenova/static/as/assembly/index/recordError))
 (export "getLastErrorCode" (func $greenova/static/as/assembly/index/getLastErrorCode))
 (export "getLastErrorDetails" (func $greenova/static/as/assembly/index/getLastErrorDetails))
 (export "clearError" (func $greenova/static/as/assembly/index/clearError))
 (export "linearEasing" (func $greenova/static/as/assembly/index/linearEasing))
 (export "easeInOutEasing" (func $greenova/static/as/assembly/index/easeInOutEasing))
 (export "calculateAnimationHeight" (func $greenova/static/as/assembly/index/calculateAnimationHeight))
 (export "add" (func $greenova/static/as/assembly/index/add))
 (export "subtract" (func $greenova/static/as/assembly/index/subtract))
 (export "memory" (memory $0))
 (func $greenova/static/as/assembly/index/recordError (param $0 i32) (param $1 i32)
  i32.const 8
  local.get $0
  i32.store8
  i32.const 9
  local.get $1
  i32.store
 )
 (func $greenova/static/as/assembly/index/setTheme (param $0 i32)
  local.get $0
  i32.const 255
  i32.and
  i32.const 2
  i32.gt_u
  if
   i32.const 2
   i32.const 0
   call $greenova/static/as/assembly/index/recordError
   return
  end
  i32.const 0
  local.get $0
  i32.store8
 )
 (func $greenova/static/as/assembly/index/getTheme (result i32)
  i32.const 0
  i32.load8_u
 )
 (func $greenova/static/as/assembly/index/resolveTheme (param $0 i32) (result i32)
  (local $1 i32)
  i32.const 0
  i32.load8_u
  local.tee $1
  i32.const 2
  i32.eq
  if
   local.get $0
   i32.eqz
   i32.eqz
   return
  end
  local.get $1
 )
 (func $greenova/static/as/assembly/index/getLastErrorCode (result i32)
  i32.const 8
  i32.load8_u
 )
 (func $greenova/static/as/assembly/index/getLastErrorDetails (result i32)
  i32.const 9
  i32.load
 )
 (func $greenova/static/as/assembly/index/clearError
  i32.const 8
  i32.const 0
  i32.store8
  i32.const 9
  i32.const 0
  i32.store
 )
 (func $greenova/static/as/assembly/index/linearEasing (param $0 f32) (param $1 f32) (result f32)
  local.get $0
  local.get $1
  f32.ge
  if
   f32.const 1
   return
  end
  local.get $0
  f32.const 0
  f32.le
  if
   f32.const 0
   return
  end
  local.get $0
  local.get $1
  f32.div
 )
 (func $greenova/static/as/assembly/index/easeInOutEasing (param $0 f32) (param $1 f32) (result f32)
  (local $2 f64)
  local.get $0
  local.get $1
  f32.ge
  if
   f32.const 1
   return
  end
  local.get $0
  f32.const 0
  f32.le
  if
   f32.const 0
   return
  end
  local.get $0
  local.get $1
  f32.div
  local.tee $0
  f32.const 0.5
  f32.lt
  if (result f32)
   local.get $0
   local.get $0
   f32.add
   local.get $0
   f32.mul
  else
   f32.const 1
   local.get $0
   f64.promote_f32
   f64.const -2
   f64.mul
   f64.const 2
   f64.add
   local.tee $2
   local.get $2
   f64.mul
   f32.demote_f64
   f32.const 0.5
   f32.mul
   f32.sub
  end
 )
 (func $greenova/static/as/assembly/index/calculateAnimationHeight (param $0 i32) (param $1 f32) (param $2 f32) (param $3 f32) (result f32)
  local.get $1
  f32.const 1
  f32.ge
  if
   local.get $3
   return
  end
  local.get $1
  f32.const 0
  f32.le
  if
   local.get $2
   return
  end
  local.get $2
  local.get $3
  local.get $2
  f32.sub
  local.get $1
  f32.mul
  f32.add
 )
 (func $greenova/static/as/assembly/index/add (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
 (func $greenova/static/as/assembly/index/subtract (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.sub
 )
)
