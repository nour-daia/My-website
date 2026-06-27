// typing handled in i18n.js
// ======================
const nav = document.querySelector(".nav")
const allSection = document.querySelectorAll(".section")
const totalsection = allSection.length
let navlist = []
let totalNavlist = 0

if (nav) {
navlist = nav.querySelectorAll("il")
totalNavlist = navlist.length

for(let i=0;i<totalNavlist;i++){

    const a=navlist[i].querySelector("a")
    a.addEventListener("click",function(){
        removebacksection()
     
        for(let j=0;j<totalNavlist;j++){
            if(navlist[j].querySelector("a").classList.contains("active")){
             addbacksection(j)
            }
        navlist[j].querySelector("a").classList.remove('active')
        }
   this.classList.add('active')
   showSection(this)
   if(window.innerWidth<1200){
    closeNavMenu()
   }
    })
}
}

function removebacksection(){
    for(let i=0;i<totalsection;i++){
        allSection[i].classList.remove("back-section")
    }
}
function addbacksection(num){
     allSection[num].classList.add("back-section")

}
function showSection(element){
    for(let i=0;i<totalsection;i++){
        allSection[i].classList.remove("active")
    }
const target=element.getAttribute("href").split("#")[1]
document.querySelector("#"+ target).classList.add("active")
}
// ====================
function updatenav(){
for(let i=0;i<totalNavlist;i++){
    navlist[i].querySelector("a").classList.remove("active")
const target=element.getAttribute("href").split("#")[1]
if(target===navlist[i].querySelector("a").getAttribute("href").split("#")[1]){
    navlist[i].querySelector("a").classList.add("active")

}

}
}
// ================
const hireMeBtn = document.querySelector(".hire-me")
if (hireMeBtn) {
hireMeBtn.addEventListener("click",function(){
    const sectionindex=this.getAttribute("data-section-index")

    showSection(this)
    removebacksection()
    addbacksection(sectionindex)
    if(window.innerWidth<1200){
        closeNavMenu()
    }
})
}
// ==================================
const navTogglerBtn = document.getElementById("navToggler"),
aside = document.querySelector(".asid"),
navBackdrop = document.getElementById("navBackdrop")

function openNavMenu(){
    if (!aside || !navTogglerBtn) return
    if (typeof window.closeSettings === "function") window.closeSettings()
    aside.classList.add("open")
    navTogglerBtn.classList.add("open")
    navBackdrop?.classList.add("is-open")
    document.body.classList.add("nav-open")
    for(let i=0;i<document.querySelectorAll(".section").length;i++){
        document.querySelectorAll(".section")[i].classList.add("open")
    }
}

function closeNavMenu(){
    if (!aside || !navTogglerBtn) return
    aside.classList.remove("open")
    navTogglerBtn.classList.remove("open")
    navBackdrop?.classList.remove("is-open")
    document.body.classList.remove("nav-open")
    for(let i=0;i<document.querySelectorAll(".section").length;i++){
        document.querySelectorAll(".section")[i].classList.remove("open")
    }
}

function asidesectiontogglerbtn(){
    if (aside?.classList.contains("open")) {
        closeNavMenu()
    } else {
        openNavMenu()
    }
}

if (navTogglerBtn && aside) {
    navTogglerBtn.addEventListener("click", asidesectiontogglerbtn)
}

if (navBackdrop) {
    navBackdrop.addEventListener("click", closeNavMenu)
}

window.closeNavMenu = closeNavMenu

const certLightbox=document.getElementById("certLightbox")
const certLightboxImg=document.getElementById("certLightboxImg")
const certTriggers=document.querySelectorAll(".cert-img-wrap")

function openCertLightbox(src,alt){
    certLightboxImg.src=src
    certLightboxImg.alt=alt
    certLightbox.classList.add("active")
    certLightbox.setAttribute("aria-hidden","false")
    document.body.style.overflow="hidden"
}

function closeCertLightbox(){
    certLightbox.classList.remove("active")
    certLightbox.setAttribute("aria-hidden","true")
    certLightboxImg.src=""
    document.body.style.overflow=""
}

certTriggers.forEach(function(trigger){
    trigger.addEventListener("click",function(){
        openCertLightbox(
            this.getAttribute("data-cert-src"),
            this.getAttribute("data-cert-alt")
        )
    })
})

certLightbox.addEventListener("click",function(e){
    if(e.target===certLightbox || e.target.classList.contains("cert-lightbox-close")){
        closeCertLightbox()
    }
})

document.addEventListener("keydown",function(e){
    if(e.key==="Escape" && certLightbox.classList.contains("active")){
        closeCertLightbox()
    }
    if(e.key==="Escape" && aside?.classList.contains("open")){
        closeNavMenu()
    }
})

const CONTACT_EMAIL="nour2262004@gmail.com"
const contactForm=document.getElementById("contactForm")
const contactSubmitBtn=document.getElementById("contactSubmitBtn")
const contactFormStatus=document.getElementById("contactFormStatus")

function getContactFormData(){
    return {
        name: document.getElementById("contactName").value.trim(),
        email: document.getElementById("contactEmail").value.trim(),
        subject: document.getElementById("contactSubject").value.trim(),
        message: document.getElementById("contactMessage").value.trim()
    }
}

function setContactStatus(message,type){
    contactFormStatus.textContent=message
    contactFormStatus.className="contact-form-status"+(type?" "+type:"")
}

if(contactForm){
    contactForm.addEventListener("submit",async function(e){
        e.preventDefault()

        if(!contactForm.checkValidity()){
            contactForm.reportValidity()
            return
        }

        const data=getContactFormData()
        const t=(window.portfolioI18n&&window.portfolioI18n.contact)||{}
        const originalText=contactSubmitBtn.textContent

        contactSubmitBtn.disabled=true
        contactSubmitBtn.textContent=t.sending||"Sending..."
        setContactStatus(t.sendingStatus||"Sending your message...")

        try{
            const response=await fetch("https://formsubmit.co/ajax/"+CONTACT_EMAIL,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body:JSON.stringify({
                    name:data.name,
                    email:data.email,
                    subject:data.subject,
                    message:data.message,
                    _subject:"Portfolio Message: "+data.subject,
                    _template:"table"
                })
            })

            if(!response.ok){
                throw new Error("Email send failed")
            }

            contactForm.reset()
            setContactStatus(t.success||"Message sent successfully!","success")
        }catch(error){
            setContactStatus(t.error||"Could not send the message.","error")
        }finally{
            contactSubmitBtn.disabled=false
            contactSubmitBtn.textContent=t.send||originalText
        }
    })
}

