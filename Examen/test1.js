function solution(S, T) {
    let s1 = S.toLowerCase();
    let s2 = T.toLowerCase();

    if(s1.length !== s2.length || s1 === s2) {
        return false;
    }   

    let r1 = s1.split('').sort().join();
    let r2 = s2.split('').sort().join();

    return r1 === r2;
}

function solution2(A) {
    let filter = A.filter((el) => el % 2 == 0).sort((a,b) => b-a);
    
    let noDuplicate = [];

    for(let i=0; i < filter.length; i++) {
        if(!noDuplicate.includes(filter[i])) {
            noDuplicate.push(filter[i]);
        }
    }
    

    return noDuplicate;
}



var fullname = 'A'
var obj = {
    fullname: 'B',
    prop: {
        fullname: 'C',
        getFullName: function() {
            return this.fullname;
        }
    }
};
//console.log(obj.prop.getFullName.call(obj));


/* setTimeout(() => {
    console.log('A');
}, 100)

setTimeout(() => {
    console.log('B');
}, 1)


    console.log('Z');


setTimeout(() => {
    console.log('C');
}, 0) */

const hola = {
    result: true,
    count: 42
}
console.log(`count:${hola.count}-avg:${hola.avg}-result:${hola.result}`);