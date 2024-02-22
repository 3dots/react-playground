export function assignArrayDirectlyIfTyped<T>(
  constructorListParameter: T[] | undefined,
  constructor: { new (init: Partial<T>): T },
): T[] {
  if (constructorListParameter) {
    const newArray = [];
    let isOkToAssignDirectly = true;
    for (const p of constructorListParameter) {
      if (p instanceof constructor) {
        //console.log("instance");
        newArray.push(p);
      } else {
        //console.log("constructed");
        isOkToAssignDirectly = false;
        newArray.push(new constructor(p));
      }
    }
    if (isOkToAssignDirectly) return constructorListParameter;
    else return newArray;
  } else {
    return [];
  }
}

export function nameof<TObject>(obj: TObject, key: keyof TObject): string;
export function nameof<TObject>(key: keyof TObject): string;
export function nameof(key1: any, key2?: any): any {
  return key2 ?? key1;
}
