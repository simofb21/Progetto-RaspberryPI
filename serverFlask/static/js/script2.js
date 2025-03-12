let x = 0;
let y = 0;
async function fetchJoystickData(){
    const response = await fetch('/getPosition');
    const data = await response.json();
    x+=data.x;
    y= data.y;
    console.log(x,y);
}