const input = document.querySelector( 'input' );
const def =  document.getElementById('def')
const debouncetext = document.getElementById('deb')
const throttletext = document.getElementById( "thr" )

console.log(input)

const debounce = ( cb, delay = 1000)  => {
    let timer;
    return (...args)=> {
        clearTimeout(timer);
        timer = setTimeout( ()=>{ cb(...args) }, delay);
    }
}

const throttle = ( cb, delay = 1000)  => {
    let shouldWait = false;
    let waitingArgs 

    const timeOutFunc = () => {
        if(waitingArgs == null ) 
        { 
            shouldWait = false 
        } 
        else {
            cb(...waitingArgs)
            waitingArgs=null
            setTimeout(timeOutFunc, delay);
         }
    }

    return (...args) => {
        if(shouldWait){
            waitingArgs = args
            return;
        }

        cb(...args)
        shouldWait = true
        setTimeout(timeOutFunc, delay);
    }
}


const updateDebouncetext = debounce((text) => {
    debouncetext.innerHTML= text;
},1000)// print  the value after 1 seconds of inactivity

const updateThrottletext = throttle((text) => {
    throttletext.innerHTML= text;
},800)// print  the value after 8 millisecond of interval

input.addEventListener("input", (event) => {
    def.innerHTML= event.target.value;
    updateDebouncetext(event.target.value)
    updateThrottletext(event.target.value)
});