const checkDependency = (control, valuePool)=>{
    let controlActive = [true];
    if(control.dependency){
        control.dependency.forEach(dependency=>{
            if(valuePool && valuePool.hasOwnProperty(dependency.field)) {
                controlActive.push(checkDependencyValue(dependency.operator, valuePool[dependency.field], dependency.value));
            } else {
                controlActive.push(false);
            }
        });
    }
    return !controlActive.includes(false);
};

const checkDependencyValue = (operator, independentValue, expectedValue) => {
    if ('===' === operator || '==' === operator){
        return independentValue === expectedValue;
    } else if('!==' === operator || '!=' === operator){
        return independentValue !== expectedValue;
    } else if('in' === operator){
        if(Array.isArray(expectedValue) && typeof independentValue === 'string'){
            return expectedValue.includes(independentValue);
        } else if ( Array.isArray(expectedValue) && Array.isArray(independentValue) ) {
            const values = expectedValue.map(value => {
                return independentValue.includes(value);
            });
            return values.includes(true);
        } else {
            console.warn('Warning: wrong dependency data type');
        }
    }
};

export {checkDependency};