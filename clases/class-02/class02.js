/*
## Scenario
I have a collection of students with different results each. 
You should create three different implementations that iterate on the entire list and only return the approved 
students with a score of 4 (included) using for, while, and do/while.

Example:

```
students = [
  {
    name: 'JOHN'
    lastname: 'DOE',
    score: 4
  },
  {
    name: 'EVELYN'
    lastname: 'JACKSON',
    score: 8
  },
  {
    name: 'JAMES'
    lastname: 'SHAW',
    score: 2
  }
];
```

Each student approved should be print in the console.
Plus:
* To add more complexity, you can sort array ascending using a score
* Minimum score should be parametrizable
* Convert name and last name to capitalize
*/

students = [
    {
      name: "JOHN",
      lastname: "DOE",
      score: 4,
    },
    {
      name: "EVELYN",
      lastname: "JACKSON",
      score: 8,
    },
    {
      name: "JAMES",
      lastname: "SHAW",
      score: 2,
    },
  ];
  
  
  function students_ApprovedAtLeast_WithForLoop(students = [], minScore = 0) {
      let studentsApproved = [];
  
      for(let i=0; i < students.length; i++) {
  
          if(students[i].score >= minScore) {
              studentsApproved.push({
                  name: capitalizeTheFirstLetterOf_(students[i].name),
                  lastname: capitalizeTheFirstLetterOf_(students[i].lastname),
                  score: students[i].score
              })
          }
  
      }
      return studentsApproved.sort(studentWithHigherScore);
  }
  
  /**
   * @param  {} studentA
   * @param  {} studentB
   */
  function studentWithHigherScore(studentA, studentB) {
      // This function can sort an array ASC
      if(studentA.score < studentB.score) {
          return 1
      } else if(studentA.score > studentB.score) {
          return -1
      }
      return 0;
  }
  
  function capitalizeTheFirstLetterOf_(name) {
      // This function can capitalize the first letter and lower case the string
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }
  
  //console.log(students_ApprovedAtLeast_WithForLoop(students, 4));




  
/*
    Clase 2:
    1. Crear una función asíncrona que demore unos segundos en completarse, pero que por dentro no tenga ninguna lógica, es decir, no vale usar bucles ni crear requests http, ni leer o escribir archivos.
    2. Transformar el código que hicieron ayer de filtro de alumnos a una promesa
    3. Utilizar ambos puntos anteriores de forma simultánea, e imprimir un texto en consola una vez que se terminen ambos procesos
*/



// 1  
  async function testingAsyncFunction() {

    //Next in the queue
    setTimeout(() => {
      console.log('Next in the queue!');
  }, 3000)
    

    //Promesa de que va a pasar
    const result = new Promise(resolve => {
        setTimeout(() => {
          resolve('Now, come my friend');
        }, 3000);
      });

    //No puede pasar aun
    console.log(`You cant't pass right now.. \n`);

    //El tipo ya puede pasar
    console.log(await result);
  }
  
 //testingAsyncFunction();







 // 2
async function students_ApprovedAtLeast_(students = [], minScore = 0) {
    
    //Inicia el examen
    console.log(`Boys and girls, if any of you want to pass the test the min score is ${minScore}.`);

    //El profesor inicia su correccion
    setTimeout(() => {
        console.log(`The teacher is correcting... \n`);
    }, 3000)

    setTimeout(() => {

      //Loop para corregir cada examen de cada alumno
        for(let i=0; i < students.length; i++) {
        
            // Agarra el test del estudiante
            let studentTest = students[i].score;

            const promise = new Promise((resolve, reject) => {
              //Mira si el alumno supero el score minimo
                setTimeout(
                    () => studentTest >= minScore
                        ? resolve(`${capitalizeTheFirstLetterOf_(students[i].name)} ${capitalizeTheFirstLetterOf_(students[i].lastname)} has pass the test with an score of ${students[i].score}`)
                        : reject(`${capitalizeTheFirstLetterOf_(students[i].name)} ${capitalizeTheFirstLetterOf_(students[i].lastname)} hasn't pass the test with an score of ${students[i].score}`),
                    3000
                );
            });            
    
            //Los estudiantes esperan la promesa del profesor
            promise
                .then(studentsThatAreApproved => console.log(studentsThatAreApproved))
                .catch(thisStudentsDidntPassTheTest => console.error(thisStudentsDidntPassTheTest));
        }
    }, 3000)
    
    
}

//students_ApprovedAtLeast_(students, 4);


//3. PROMISE ALL
Promise.all([students_ApprovedAtLeast_(students, 4), testingAsyncFunction()])
    .then(values => {
        console.log('The process has end or not... \n');
    });