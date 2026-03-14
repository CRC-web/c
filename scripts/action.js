let curpg = 1;
const nextbuttons = document.getElementsByName("nextbut");
const prevbuttons = document.getElementsByName("prevbut");
const pg1 = document.getElementById("pg1");
const pg2 = document.getElementById("pg2");
const pg3 = document.getElementById("pg3");

const nameinp = document.getElementById("nameinp");
const cityinp = document.getElementById("cityinp");
const zipinp = document.getElementById("zipinp");
const bodyinp = document.getElementById("bodyinp");
let bodymsg = "";

const wordsleft = document.getElementById("wordsleft");

const final = document.getElementById("final");
const gmaillink = document.getElementById("emailsend");

LoadPage();

nextbuttons.forEach(element => {
    let increment = 1;
    element.addEventListener("click", () => {
        ChangePage(increment);
    });
});

prevbuttons.forEach(element => {
    let decrement = -1;
    element.addEventListener("click", () => {
        ChangePage(decrement);
    });
});

bodyinp.addEventListener("input", (inp) => {
    const words = inp.target.value.split(" ").length-1;
    const left = 70 - words;

    if (left <= 0) bodyinp.value = bodymsg;
    else 
    {
        bodymsg = inp.target.value;
        wordsleft.innerText = `Words Left: ${left-1} / 70`;
    }
});

function ChangePage(val)
{
    curpg += val;
    LoadPage();
}

function LoadPage()
{
    if (curpg <= 1)
    {
        pg1.hidden = false;
        pg2.hidden = true;
        pg3.hidden = true;

        curpg = 1;
    }
    else if (curpg == 2)
    {
        pg1.hidden = true;
        pg2.hidden = false;
        pg3.hidden = true;
    }
    else 
    {
        pg1.hidden = true;
        pg2.hidden = true;
        pg3.hidden = false;

        fetch('../../media/json/email.json')
            .then((response) => response.json())
            .then((json) => {
                const url = document.URL;
                const topic = url.split("Take-Action/")[1].split("/")[0];
                const email = json[topic];

                const to = email["to"];
                const subject = email["subject"];
                const end = `${nameinp.value}\n${cityinp.value}, Pennsylvania, ${zipinp.value}`;
                const body = `${email["body1"]}\n\n${bodymsg}\n\n${email["body2"]}\n\n${end}`;

                final.innerText = body;

                gmaillink.href = GmailLink(to, subject, body);
            });

        curpg = 3;
    }
}

function GmailLink(to, subject, body)
{
    const encto = encodeURIComponent(to);
    const encsubject = encodeURIComponent(subject);
    const encbody = encodeURIComponent(body);

    return `mailto:${encto}?subject=${encsubject}&body=${encbody}&tf=cm`;
}