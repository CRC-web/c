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

        const emails = "ffarry@pasen.gov,boscola@pasenate.com,kward@pasen.gov,rbrown@pasen.gov,lculver@pasen.gov,cgebhard@pasen.gov,flynn@pasenate.com,PASenatorNick@pasenate.com,senatorsantarsiero@pasenate.com,tartaglione@pasenate.com,mbrooks@pasen.gov,pstefano@pasen.gov";
        const finalbody = `Dear Senator,\n\nI am writing to ask you to support HB 1512 and vote to report it favorably out of committee. The bill would require manufacturers to supply Pennsylvanians with the proper tools, documentation, and reasonable access to repair their own digitally-based products.\n\n${bodymsg}\n\nAs a resident of Pennsylvania, I urge the committee to allow the full Senate to vote on the issue by reporting HB 1512 out of committee favorably.\n\nThank you for your time and consideration.\n\n${nameinp.value}\n${cityinp.value}, Pennsylvania, ${zipinp.value}`;
        final.innerText = finalbody;

        gmaillink.href = GmailLink(emails, "Reporting the Right to Repair Bill", finalbody);

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