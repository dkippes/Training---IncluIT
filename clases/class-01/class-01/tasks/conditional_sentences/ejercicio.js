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




/* FOR */
/**
 * @param  {} students=[]
 * @param  {} minScore=0
 */
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

/* WHILE */
function students_ApprovedAtLeast_WithWhileLoop(students = [], minScore = 0) {
    let studentsApproved = [], i = 0;

    while(i <= students.length && students[i] != undefined) {

        if(students[i].score >= minScore) {
            studentsApproved.push({
                name: capitalizeTheFirstLetterOf_(students[i].name),
                lastname: capitalizeTheFirstLetterOf_(students[i].lastname),
                score: students[i].score
            })
        }

        i++;
    }

    return studentsApproved.sort(studentWithHigherScore);
}

//console.log(students_ApprovedAtLeast_WithWhileLoop(students, 10));

/* DO WHILE */
function students_ApprovedAtLeast_WithDoWhileLoop(students = [], minScore = 0) {
    let studentsApproved = [], i = 0;

    do {
        if(students[i].score >= minScore) {
            studentsApproved.push({
                name: capitalizeTheFirstLetterOf_(students[i].name),
                lastname: capitalizeTheFirstLetterOf_(students[i].lastname),
                score: students[i].score
            })
        }

        i++;
    }
    while(i <= students.length && students[i] != undefined);
    
    return studentsApproved.sort(studentWithHigherScore);
}

//console.log(students_ApprovedAtLeast_WithDoWhileLoop(students, 10));


/* FILTER */
function students_ApprovedAtLeast_WithFilter(students = [], minScore = 0) {
    let studentsApproved = students.filter((student) => {
        if(student.score >= minScore) {
            return {
                name: capitalizeTheFirstLetterOf_(student.name),
                lastname: capitalizeTheFirstLetterOf_(student.lastname),
                score: student.score
            }
        }
        
    })
    
    return studentsApproved.sort(studentWithHigherScore);
}

console.log(students_ApprovedAtLeast_WithFilter(students, 4));