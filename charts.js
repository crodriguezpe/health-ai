/*
=========================================
Health AI Chart Engine
Sprint 1
=========================================
*/

function drawHealthChart(currentHealthAge){

    const canvas=document.getElementById("healthChart");

    if(!canvas) return;

    const ctx=canvas.getContext("2d");

    const w=canvas.width;
    const h=canvas.height;

    ctx.clearRect(0,0,w,h);

    // Background

    ctx.fillStyle="#2C2C2E";
    ctx.fillRect(0,0,w,h);

    // Grid

    ctx.strokeStyle="#3A3A3C";
    ctx.lineWidth=1;

    for(let i=0;i<5;i++){

        const y=(h/4)*i;

        ctx.beginPath();
        ctx.moveTo(60,y);
        ctx.lineTo(w-20,y);
        ctx.stroke();

    }

    // Load history

    const history=getHistory();

    let data=[];

    if(history.length===0){

        data=[currentHealthAge];

    }else{

        data=history.map(x=>x.healthAge);

    }

    while(data.length<7){

        data.unshift(data[0]);

    }

    data=data.slice(-7);

    const min=Math.min(...data)-1;
    const max=Math.max(...data)+1;

    function yPos(value){

        return h-40-
        ((value-min)/(max-min||1))*(h-80);

    }

    // Gradient

    const gradient=ctx.createLinearGradient(0,0,0,h);

    gradient.addColorStop(0,"#30D158");
    gradient.addColorStop(1,"#0A84FF");

    // Draw line

    ctx.strokeStyle=gradient;
    ctx.lineWidth=5;
    ctx.lineCap="round";

    ctx.beginPath();

    data.forEach((value,index)=>{

        const x=60+(index*((w-100)/6));
        const y=yPos(value);

        if(index===0){

            ctx.moveTo(x,y);

        }else{

            ctx.lineTo(x,y);

        }

    });

    ctx.stroke();

    // Draw points

    data.forEach((value,index)=>{

        const x=60+(index*((w-100)/6));
        const y=yPos(value);

        ctx.beginPath();
        ctx.arc(x,y,7,0,Math.PI*2);

        ctx.fillStyle="#30D158";
        ctx.fill();

        ctx.strokeStyle="#FFFFFF";
        ctx.lineWidth=2;
        ctx.stroke();

    });

    // Labels

    ctx.fillStyle="#8E8E93";
    ctx.font="18px -apple-system";

    const labels=["M","T","W","T","F","S","S"];

    labels.forEach((d,index)=>{

        const x=50+(index*((w-100)/6));

        ctx.fillText(d,x,h-10);

    });

    // Current value

    ctx.fillStyle="#FFFFFF";

    ctx.font="bold 22px -apple-system";

    ctx.fillText(

        "Health Age: "+currentHealthAge,

        60,

        30

    );

}
