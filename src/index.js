import './styles/main.less'

const myArray = new Array('foo', 'bar', 'baz',)
myArray.forEach((item, index) => {
  console.log(`myArray[${index}] = ${item}`)
})
