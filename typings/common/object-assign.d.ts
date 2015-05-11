declare var oa: ObjectAssign;

declare module 'object-assign' {
  export = oa;
}

interface ObjectAssign {
  (target: Object, ...source: Object[]): any;
}
