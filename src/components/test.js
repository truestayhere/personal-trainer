
var flag = true;


console.log(1);
for (let i = 3; i < 18; i += 2) {
    flag = true;
    for (let j = 3; j < Math.pow(i, 0.5); j++) {
        if (i % j === 0) {
            flag = false;
            break;
        }
    }
    if (flag) {
        console.log(i);
    }
};