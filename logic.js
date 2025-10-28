// Funciones puras: siempre que les des los mismos inputs, devuelven el mismo output.
export function sumar(a,b){ return a + b; }
export function restar(a,b){ return a - b; }
export function multiplicar(a,b){ return a * b; }
export function dividir(a,b){
  if (b === 0) throw new Error("No se puede dividir por cero");
  return a / b;
}

// Pequeñas pruebas (abre la consola del navegador para ver resultados)
export function _tests(){
  const assert = (cond, msg) => { if(!cond) throw new Error("Test falló: "+msg); };
  assert(sumar(2,3)===5, "2+3=5");
  assert(restar(10,4)===6, "10-4=6");
  assert(multiplicar(3,4)===12, "3*4=12");
  let ok = false;
  try{ dividir(1,0); }catch{ ok = true; }
  assert(ok, "dividir por cero lanza error");
  console.log("✅ Tests básicos OK");
}
