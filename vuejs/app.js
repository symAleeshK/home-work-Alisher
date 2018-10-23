const car = (name, model, owner, year, phone, image) => ({
  name,
  model,
  owner,
  year,
  phone,
  image
})

const log = (text, type, date = new Date()) => ({text, type, date})

const cars = [
  car('lambo', 'aventador', 'Alish', 2017, '+7 705 205 78 25', 'img/lambo.jpg'),
  car('porshe', 'boxter', 'Pasha', 2015, '+7 705 401 16 50', 'img/porshe.png'),
  car('shevy', 'shelby', 'Ruslan', 1978, '+7 747 651 03 46', 'img/shevy.png')
]

new Vue({
  el: '#app',
  data: {
    cars: cars,
    car: cars[0],
    logs: [],
    selectedCarIndex: 0,
    phoneVisibility: false,
    search: '',
    modalVisibility: false
  },
  methods: {
    selectCar(index) {
      this.car = cars[index]
      this.selectedCarIndex = index
    },
    newOrder() {
      this.modalVisibility = false
      this.logs.push(
        log(`Success order: ${this.car.name} - ${this.car.model}`, 'ok')
      )
    },
    cancelOrder() {
      this.modalVisibility = false
      this.logs.push(
        log(`Cancelled order: ${this.car.name} - ${this.car.model}`, 'cnl')
      )
    }
  },
  computed: {
    phoneBtnText() {
      return this.phoneVisibility ? 'Hide phone' : 'Show phone'
    },
    filteredCars() {
      return this.cars.filter(car => {
        return car.name.indexOf(this.search) > -1 || car.model.indexOf(this.search) > -1
      })
    }
  },
   filters: {
     date(value) {
       return value.toLocaleString()
     }
   }
})