function sum(...numbers) {
  return numbers.reduce((acc, item) => {
    return acc + item
  }, 0)
}

function avg(...numbers) {
  return sum(...numbers) / numbers.length
}

export default avg
