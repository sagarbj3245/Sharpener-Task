
class Student{
    constructor(name,age,marks){
      this.name=name;
      this.age=age;
      this.marks=marks;
    }
    setPlacementAge(minPlacementAge) {
      return (minMarks) => {
        return this.age >= minPlacementAge && this.marks >= minMarks;
      };
    }
  }
  
  
  
  //Do not touching anything below this line
  
  function createNewStudents(name, age, marks){
    const Riya=new Student(name, age, marks);
    
    console.log(Riya.setPlacementAge(18)(40))
  
  }
  
  async function readInput() {
  
      let inputString = '';
  
      var output=[];
  
      process.stdin.on('data', inputStdin => {
  
        inputString += inputStdin;
  
        const inputArr = inputString.split(/(?:\r\n|\r|\n)/g)
  
        const argumentsArr = inputArr[0].split(',');
  
        createNewStudents(argumentsArr[0], Number(argumentsArr[1]), Number(argumentsArr[2]))
  
        process.exit();
  
      })
  
  }
  
  readInput();
