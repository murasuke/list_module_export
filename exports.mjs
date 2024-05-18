// 関数、変数、classをexport(確認用)

export function func1(args) {
  console.log(`called func1(${args})`);
}

export const func2 = (args) => {
  console.log(`called func2(${args})`);
};

export const CONST_VAL = 'const text';

export class export_class {}

let default_value = 123;

export default default_value;
