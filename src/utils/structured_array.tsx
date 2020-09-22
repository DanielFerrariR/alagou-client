interface Structure {
  [key: string]: string
}

/**
 * Divides an array of strings into a given structure and forms an array of objects of that structure
 * @param structure - An object with any key strings
 * @param parameters - An array of strings
 * @returns An array of objects of the given structure
 * @example
 * The given example: structuredArray({ a: '', b: '', c: '' }, ['test1', 'test2', 'test3', 'test4', 'test5', 'test6'])
 * Results in: [{ a: 'test1', b, 'test2', c: 'test3' }, { a: 'test4', b: 'test5', c: 'test6' }]
 */
const structuredArray = (
  structure: Structure,
  parameters: string[]
): Structure[] => {
  const array = []
  let count = 0
  let object = { ...structure }

  for (const parameter of parameters) {
    const objectKey = Object.keys(structure)[count] as keyof Structure

    object[objectKey] = parameter

    if (count === Object.keys(structure).length - 1) {
      count = 0
      array.push(object)
      object = { ...structure }
    } else {
      count += 1
    }
  }

  return array
}

export default structuredArray
