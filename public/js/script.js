import '@babel/polyfill';
import axios from 'axios';
import lodash, { forEach, isInteger } from 'lodash'; 
import {promisify} from 'util';
import documents from '../../model/documents';

const updateCollectiondata = (total,dateNow)=>{
    console.log(total,"9999999999");
    const collectionObj = new Object();
    collectionObj["id1"] = dateNow;
    console.log(total);
    collectionObj["amount"] = total;

 updateCollection(collectionObj); 

}

const StudentData= async (student,id)=>
{
    try{
if(id!=="add")
       { const data = await axios({
    
            method:'PATCH',
            url:`/api/v1/studentInfo/updateStudent/${id}`,
            data:student
        })
    
       }
else
{
    const data = await axios({
    
        method:'POST',
        url:`/api/v1/studentInfo/addStudent`,
        data:student
    })
}    
    }
    catch(err)
    {
window.alert(err.response.data.message);
    }
    }

const updateCollection = async(collectionObj)=>{
       
try{const updateAmount = await axios({
    method:"PATCH",
    url:`/api/v1/collectionInfo`,
    data:collectionObj
}); }  
catch(err)
{
window.alert(err.response.data.message);
}     
}


if(document.querySelector(".del-doc-school"))
{
    const delBtn =document.querySelectorAll(".del-doc-school");

    delBtn.forEach((el)=>{
        el.addEventListener("click",async (e)=>{

        console.log(el);

     try{   const data = await axios({
            method:'DELETE',
            url:`/api/v1/documentInfo/deleteDoc/${el.value}`
        })
        location.reload();
}
catch(err)
{
window.alert(err.response.data.message);
}
    })
    }
    )}


if(document.querySelector("#get-all-form"))
document.querySelector("#get-all-form").addEventListener("submit",function(e){
    e.preventDefault();

  let year =  document.getElementById("all-year").value;
   let classSchool=document.getElementById("all-class").value;

   if(year==="")
   year=false;   
   if(classSchool==="")
   classSchool = false; 
   window.open(`/studentInfo/get-all/${year}/${classSchool}`)

});

if(document.querySelector("#get-one-form"))
document.querySelector("#get-one-form").addEventListener("submit",function(e){
    e.preventDefault();

   let year = document.getElementById("year").value;
   if(year==="")
  year=false;
   let classSchool=document.getElementById("student-class").value;
   if(classSchool==="")
   classSchool = false; 
   
let name = document.getElementById("name").value;

if(name==="")
name = false;

   window.open(`/studentInfo/get-one/${year}/${classSchool}/${name}/false`);
});

if(document.querySelector("#get-student-data"))
{
        const months = document.querySelectorAll(".month");
        
        // const monthName = ['january','february','march','april','may','june','july','august','september','october','november','december']

        months.forEach((el)=>{

            if(el.value!=="")
            el.classList.add('no_change');

        });
}

if(document.querySelector(".add-student"))
{
    document.querySelector(".month-palet").classList.add("invisible");  
}

if(document.querySelector("#submit-all"))
    document.querySelector("#submit-all").addEventListener("click",async function(e)
    {
        e.preventDefault();
        document.querySelector("#submit-all").value="Updating";
        const year = document.getElementById("student-year").value;
        const studentClass = document.getElementById("student-class").value;
        const name = document.getElementById("student-name").value;
        const father = document.getElementById("student-father").value;
        const date_of_birth = document.getElementById("student-dob").value;
        let dateNow = new Date().toLocaleString().split(",")[0];
        dateNow+='Z';
        const student = new Object();
        student.year=year;
        student.name=name;
        student.class=studentClass;
        student.father_name=father;
        student.date_of_birth= date_of_birth; 
        student.roll_no = document.getElementById("student-roll_no").value;
        let feesStudent = lodash.cloneDeep(student);

        // console.log(feesStudent);

        if(document.querySelector("#submit-all").name==="add")
        { 
            StudentData(student,"add");
            document.querySelector("#submit-all").value="Updating";
     return location.reload();
     }

     try{const data1 = await axios({
         method:"GET",
         url:"/api/v1/collectionInfo/get-fees"
     })}
     catch(err)
     {
 window.alert(err.response.data.message);
     }

     const fees = data1.data.fees;

     console.log(fees);
        const months = document.querySelectorAll(".month");
        
        // const monthName = ['january','february','march','april','may','june','july','august','september','october','november','december']
     let total = 0*1;
     
     let wordClass=studentClass;

     let wordArray =["one","two","three","four","five","six","seven","eight"];
     
    if(isInteger(studentClass*1))
wordClass=wordArray[studentClass*1-1];
     console.log(fees[wordClass]);

 for(const el of months){

            student[`${el.name}`]=el.value;

            console.log("10");

            if(el.classList.contains('no_change')!==true&&el.value!=="")
            {
                student[`${el.name}`]= dateNow;
                feesStudent['fees'] = fees[wordClass]*1;
                feesStudent['month'] = el.name;
                feesStudent['date'] = dateNow;
console.log(feesStudent);
                // console.log(Date.now(),dateNow);
                total=total + fees[wordClass]*1;
                const data = await axios({

                    method:'POST',
                    url:"/api/v1/studentInfo/feesStudent",
                    data:feesStudent
                });
                console.log("20");
            }
            else if(el.classList.contains('no_change')===true&&el.value==="")
            {
                feesStudent['fees'] = fees[wordClass]*1;
                feesStudent['month'] = el.name;
                feesStudent['date'] = dateNow;

                console.log(Date.now(),dateNow);

              try{  const data =await axios({
                    method:'DELETE',
                    url:"/api/v1/studentInfo/feesStudent",
                    data:feesStudent
                });}
                catch(err)
                {
            window.alert(err.response.data.message);
                }
                    if(data.status===201)
                   { 
                       total=total-fees[wordClass]*1;}
console.log(total);

            }
        };    
    
        updateCollectiondata(total,dateNow);
       
    const id = window.location.href.split("/")[5];
    
    StudentData(student,id);
location.reload();
});

if(document.querySelector(".uploader"))
{  document.querySelector(".uploader").addEventListener("submit",async (e)=>{

        e.preventDefault();

        const form = new FormData();
        form.append('description',document.getElementById('desc').value.toLowerCase());
        form.append('type',document.getElementById('type-data').value.toLowerCase());
        form.append('file',document.getElementById('fileUp').files[0]);

        console.log(form);

try{    const data =await axios({

        method:'POST',
        url:"/api/v1/documentInfo/uploadFile",
        data:form
    });

    location.reload();}
    catch(err)
    {
window.alert(err.response.data.message);
    }
    })
};

if(document.querySelector(".download-form"))
{
    document.querySelector(".download-form").addEventListener("submit",(e)=>{

        e.preventDefault();

   let type = document.querySelector("#type").value;
   let date = document.querySelector("#date").value;

    if(type==="")
type="NULL";
if(date==="")
date="NULL";

    window.open(`/documentInfo/list/${type}/${date}`);
    }
    )};

    if(document.querySelector("#login-form"))
    {
        document.querySelector("#login-form").addEventListener("submit",async (e)=>
        {
            e.preventDefault();

            let data = new Object;

            data.email = document.querySelector("#email-login").value;
            data.password = document.querySelector("#password-login").value;

            console.log(data);
            let data1;
           try{   data1= await axios ({

             method:'POST',
             url:'/api/v1/userInfo/login',
             data:data   
            })
location.href="/";
            console.log(data1)
        }
            catch(err)
          {  
            window.alert(err.response.data.message);
          }

        })

    }

if(document.querySelector(".nav--link--logout"))
{
    document.querySelector(".nav--link--logout").addEventListener("click",async (e)=>{

        // console.log("*****");
        const data = await axios({
            method:'POST',
            url:'/api/v1/userInfo/logout'
        })
       
        window.location.href='/';
    })
}

if(document.querySelector("#excel-form"))
{
   document.getElementById("session-check").addEventListener("click",function(e){

        document.getElementById("session-filter").classList.toggle("invisible");
        document.getElementById("session-filter-label").classList.toggle("invisible");
    });

    document.querySelector("#excel-form-filter").addEventListener("submit",async (e)=>{
        const excel = new Object;
e.preventDefault();
    excel['session'] = document.getElementById("session-check").checked;
    excel['father'] = document.getElementById("father-check").checked;
    excel['dob'] = document.getElementById("dob-check").checked;
    excel['fees'] = document.getElementById("fees-check").checked;

    excel['sessionfilter'] = document.getElementById("session-filter").value;
    excel['classfilter'] = document.getElementById("class-filter").value;

    console.log(excel,"***********");

    const data = await axios({

        method:'POST',
        url:'/excel',
        data:excel
    })

    window.open("/users.xlsx");
    })
}

if(document.querySelector("#signup-form"))
{
    document.querySelector("#signup-form").addEventListener("submit",async (e)=>
    {
        e.preventDefault();

        let data = new Object;

        data.email = document.querySelector("#email-signup").value;
        data.password = document.querySelector("#password-signup").value;
        data.username = document.querySelector("#username-signup").value;
        data.passwordConfirm = document.querySelector("#passwordConfirm-signup").value;

        console.log(data);
       
      try{  const data1  = await axios ({

         method:'POST',
         url:'/api/v1/userInfo/signup',
         data:data   
        })

        console.log(data1);

        if(data1.status==201)
        window.location.href='/';}
        catch(err)
        {
            console.log(err.response.data);

            if(err.response.data.err.code===11000)
window.alert("Email already taken");
         else{   
             const entries = Object.entries(err.response.data.err.errors);
        entries.forEach((el)=>{
if(el[1].path!=="password")
{
            window.alert(`${el[1].message}`);
        }

else
{
    window.alert(`Password is shorter than ${el[1].properties.minlength} characters` );
}
}
        )}
        }

    })
}


if(document.getElementById("fees-record"))
{

   const options= document.getElementsByClassName("fee-option");

   console.log(options);

for(const el of options){el.addEventListener("click",(e)=>{

    if(document.querySelector("#get-by-date-radio").checked===true)
    {
        document.querySelector("#get-by-date-radio").checked=true;
        document.querySelector("#get-by-month-radio").checked=false;
        document.querySelector(".get-by-date").classList.remove('invisible');
        document.querySelectorAll(".get-by-month").forEach((el)=>el.classList.add('invisible'));
    }
    else if(document.querySelector("#get-by-month-radio").checked===true)
    {
        document.querySelector("#get-by-date-radio").checked=false;
        document.querySelector("#get-by-month-radio").checked=true;
        document.querySelectorAll(".get-by-month").forEach((el)=>el.classList.remove('invisible'));
        document.querySelector(".get-by-date").classList.add('invisible');
    }
})};

document.getElementById("fees-record").addEventListener("submit",async (e)=>{

    e.preventDefault();
    const start_class= document.querySelector("#class-from").value;
    const end_class= document.querySelector("#class-to").value;
    const full_data = true
    if(document.querySelector(".get-by-month").classList.contains('invisible')===true)
    {
        const objs = [];

        for(let i=start_class;i<=end_class;i++)
        {
            const feedesc= new Object;

            feedesc["class"] = i*1;
            feedesc["total"] = 0*1;

            if(full_data)
            feedesc["data"] = [];

            objs.push(feedesc);
        }

    const start_date= document.querySelector("#date-from").value;
    const end_date= document.querySelector("#date-to").value;

    const dates = new Object;

    dates["start_date"] = start_date;
    dates["end_date"] = end_date;

    const classes = new Object;

    classes["maxm"] = end_class;
    classes["minm"] = start_class;

    objs.push(dates);
    objs.push(classes);

     const pr =   JSON.stringify(objs);

     var url = new URL(`http://${window.location.host}/studentInfo/displayFeeRecord`);
     console.log(window.location.host);
     url.searchParams.set('data',pr);
        console.log(url.search);
        window.location.href=`${url}`;
    }
    else
    {
        const objs = [];
        const start_month= document.querySelector("#month-from").value;
        let end_month= document.querySelector("#month-to").value;

        const month_list =[ "April", "May", "June", "July", "August", "September", "October", "November", "December","January", "February", "March" ];

        for(let i=start_month;i<=end_month;i++)
        {
            const feedesc= new Object;

            feedesc["month"] = month_list[i-1];
            feedesc["total"] = 0*1;

            if(full_data)
            feedesc["data"] = [];

            objs.push(feedesc);
        }

        const session = document.getElementById("fee-session").value;
console.log(session);
let end_session =session;

const months_limit = new Object;

months_limit["maxm"] = end_month;
months_limit["minm"] = start_month;  
months_limit['session'] = session;

if(end_month>=10)
{
    end_month=end_month-10;
    end_session=end_session*1+1;
}

        const start_date = new Date(session,start_month*1+2,1);
        console.log(start_date);
        
        const end_date = new Date(end_session,end_month*1+1,0);
        console.log(end_date)
    const dates = new Object;

    dates["start_date"] = start_date;
    dates["end_date"] = end_date;

    const classes = new Object;

    classes["maxm"] = end_class;
    classes["minm"] = start_class;  

    objs.push(months_limit);
    objs.push(dates);
    objs.push(classes);

     const pr =   JSON.stringify(objs);

     console.log(objs);

     var url = new URL(`http://${window.location.host}/studentInfo/displayFeeRecord`);
     console.log(window.location.host);
     url.searchParams.set('data',pr);
        console.log(url.search);
        window.location.href=`${url}`;

}
})

}


if(document.querySelector("#get-sr-main"))
{

    document.querySelector("#get-sr-main").addEventListener("submit",(e)=>{

        e.preventDefault();

        const section = document.querySelector("#sr-main-section").value;
        let name = document.querySelector("#sr-main-name").value;
        let srno =document.querySelector("#sr-main-srno").value;

        if(name==="")
        name="NULL";

        if(srno==="")
        srno="NULL";

        window.location.href = `/studentInfo/sr-find/${section}/${name}/${srno}`;

    })
}

if(document.querySelector("#get-student-sr-data"))
{
    document.querySelector("#get-student-sr-data").addEventListener("submit",async (e)=>{

        e.preventDefault();

        const objs = new Object();

        objs["sr"]=document.querySelector("#student-sr").value;
        if(document.querySelector("#student-sr_no"))
        objs["sr_no"] = document.querySelector("#student-sr_no").value;
        if(document.querySelector("#student-prev_sr_no"))
        objs["prev_sr_no"] = document.querySelector("#student-prev_sr_no").value;
        objs["name"] = document.querySelector("#student-sr-name").value;
        objs["dob"] = document.querySelector("#student-sr-dob").value;
        objs["dob_in_word"] = document.querySelector("#student-sr-dob_in_word").value;
        objs["caste"] =  document.querySelector("#student-sr-caste").value;
        objs["religion"] =  document.querySelector("#student-sr-religion").value;
        objs["father_name"] =  document.querySelector("#student-sr-father").value;
        objs["mother_name"] =  document.querySelector("#student-sr-mother").value;
        objs["address"] =  document.querySelector("#student-sr-address").value;
        objs["occupation"] =  document.querySelector("#student-sr-occupation").value;
       
        console.log(objs);

        if(document.querySelector("#student-sr-lkg_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-lkg_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-lkg_passing").value;
            objs["lkg"]=obj1;
        }

        if(document.querySelector("#student-sr-ukg_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-ukg_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-ukg_passing").value;
            objs["ukg"]=obj1;
        }

        if(document.querySelector("#student-sr-one_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-one_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-one_passing").value;
            objs["one"]=obj1;
        }

        if(document.querySelector("#student-sr-two_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-two_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-two_passing").value;
            objs["two"]=obj1;
        }

        if(document.querySelector("#student-sr-three_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-three_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-three_passing").value;
            objs["three"]=obj1;
        }

        if(document.querySelector("#student-sr-four_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-four_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-four_passing").value;
            objs["four"]=obj1;
        }

        if(document.querySelector("#student-sr-five_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-five_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-five_passing").value;
            objs["five"]=obj1;
        }

        if(document.querySelector("#student-sr-six_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-six_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-six_passing").value;
            objs["six"]=obj1;
        }

        if(document.querySelector("#student-sr-seven_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-seven_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-seven_passing").value;
            objs["seven"]=obj1;
        }

        if(document.querySelector("#student-sr-eight_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-eight_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-eight_passing").value;
            objs["eight"]=obj1;
        }

        objs["last_class"]=document.querySelector("#student-sr-last_class").value;
        objs["leave_date"]=document.querySelector("#student-sr-leave_date").value;
        objs["remark"]=document.querySelector("#student-sr-remark").value;
        objs["leave_reason"]=document.querySelector("#student-sr-leave_reason").value;
        objs["brother_sister"]=document.querySelector("#student-sr-brother_sister").value;

        if(document.querySelector("#get-student-sr-data").classList.contains("sr-update"))
       {
           
        try{
            const data= await axios({
            method:'PATCH',
            url:`/api/v1/studentInfo/update-sr/${objs.sr.toLowerCase().split(" ").join("")}/${window.location.href.split("/")[6]}`,
            data:objs
        })
console.log(data)
        location.reload();
    }
        catch(err)
        {
           
window.alert(err.response.data.message);
        }
    
    }

        console.log(document.querySelector("#get-student-sr-data").classList);

        if(document.querySelector("#get-student-sr-data").classList.contains("sr-add"))
  {
      try{     const data= await axios({
            method:'POST',
            url:`/api/v1/studentInfo/add-sr`,
            data:objs
});

        location.reload();}
        catch(err)
        {
window.alert(err.response.data.message);
        }
    }})
}

if(document.querySelector(".student-sr-options"))
{
const prePrimary = document.querySelectorAll(".pre_primary");
const primary = document.querySelectorAll(".primary")
const upperPrimary = document.querySelectorAll(".upper_primary");

console.log(prePrimary);

document.querySelector(".student-sr-options").addEventListener("change",(e)=>{

    if(document.querySelector(".student-sr-options").value==="LKG TO UKG")
    {
        prePrimary.forEach((el)=>{
            el.classList.remove("invisible");
        });
        primary.forEach((el)=>{
            el.classList.add("invisible");
        });
        upperPrimary.forEach((el)=>{
            el.classList.add("invisible");
        });
    }
    if(document.querySelector(".student-sr-options").value==="1 TO 5")
    {
        prePrimary.forEach((el)=>{
            el.classList.add("invisible");
        });
        primary.forEach((el)=>{
            el.classList.remove("invisible");
        });
        upperPrimary.forEach((el)=>{
            el.classList.add("invisible");
        });
    }
    if(document.querySelector(".student-sr-options").value==="6 TO 8")
    {
        prePrimary.forEach((el)=>{
            el.classList.add("invisible");
        });
        primary.forEach((el)=>{
            el.classList.add("invisible");
        });
        upperPrimary.forEach((el)=>{
            el.classList.remove("invisible");
        });
    }
    })
}




if(document.querySelector("#set-fees-form"))
{
    document.querySelector("#set-fees-form").addEventListener("submit",async (e)=>{

        e.preventDefault();

        const obj = new Object();

        obj["pg"] = document.querySelector("#fees-pg").value;
        obj["lkg"] = document.querySelector("#fees-lkg").value;
        obj["ukg"] = document.querySelector("#fees-ukg").value;
        obj["one"] = document.querySelector("#fees-one").value;
        obj["two"] = document.querySelector("#fees-two").value;
        obj["three"] = document.querySelector("#fees-three").value;
        obj["four"] = document.querySelector("#fees-four").value;
        obj["five"] = document.querySelector("#fees-five").value;
        obj["six"] = document.querySelector("#fees-six").value;
        obj["seven"] = document.querySelector("#fees-seven").value;
        obj["eight"] = document.querySelector("#fees-eight").value;

        try{const data =await axios({
            method:"POST",
            url:"/api/v1/collectionInfo/fees-update",
            data:obj
        })

        location.reload();}
        catch(err)
        {
window.alert(err.response.data.message);
        }
    })
}

if(document.querySelector("#promote-form"))
{

    const promoteNext = document.querySelectorAll(".promote-next");

    document.querySelector("#promote-class").addEventListener("change",()=>{

const curr = document.querySelector("#promote-class").value;

console.log(curr);

if(curr==="UKG"||curr==="5"||curr==="8")
{
    for(let el of promoteNext)
    {
        el.classList.remove("invisible");
    }
}
    else
    {
        for(let el of promoteNext)
        {
            el.classList.add("invisible");
        }
    }
})

document.querySelector("#promote-form").addEventListener("submit",async (e)=>{

    e.preventDefault();

    const promoteSr = document.querySelector("#promote-sr").value;
    let promoteClass = document.querySelector("#promote-class").value.toLowerCase();
    const promotePassingDate = document.querySelector("#promote-passing-date").value;
    const promoteNextAdmissionDate = document.querySelector("#promote-next-admission-date").value;
    let promotePassingMessage;  
    if(document.querySelector("#promote-passing-message"))
    promotePassingMessage = document.querySelector("#promote-passing-message").value;

    let wordArray =["one","two","three","four","five","six","seven","eight"];
    
   if(isInteger(promoteClass*1))
promoteClass=wordArray[promoteClass*1-1];

console.log(promoteClass.toUpperCase());

    if(promotePassingMessage==="")
    promotePassingMessage=`Passed Class ${promoteClass[0].toUpperCase()+promoteClass.slice(1)}`;

try{    const data = await axios({
        method:"POST",
        url:`/api/v1/studentInfo/promote-student/${promoteSr}/${promoteClass}/${promotePassingMessage}/${promotePassingDate}/${promoteNextAdmissionDate}`
    })

    console.log(data.data);

    location.reload();}
    catch(err)
    {
window.alert(err.response.data.message);
    }

})
    }

if(document.querySelector(".upload-pic-btn"))
{
    document.querySelector(".upload-pic-btn").addEventListener("click",async (e)=>{
        document.querySelector(".upload-pic-btn").style.padding="0.2rem";
        document.querySelector(".upload-pic-btn").style.margin="0.8rem auto 0.8rem auto";
        setTimeout(()=>{
            document.querySelector(".upload-pic-btn").style.padding="0.5rem";
            document.querySelector(".upload-pic-btn").style.margin="0.5rem auto";
        },1);

        const formPic = new FormData();
        formPic.append('sr',document.getElementById("student-sr").value);
        formPic.append('student_name',document.querySelector("#student-sr-name").value);
        formPic.append('student_id',document.getElementById("student-sr-id").textContent);
        formPic.append('pic',document.getElementById('picUp').files[0]);
        
        console.log(formPic);

    try{    const data = await axios({
            method:"POST",
            url:"/api/v1/documentInfo/uploadPic",
            data:formPic
        })

        location.reload();
}
catch(err)
{
window.alert(err.response.data.message);
}
    })
}

if(document.querySelector("#document-upload-form"))
{
    document.querySelector("#document-upload-form").addEventListener("submit",async (e)=>{
e.preventDefault();
        const formDoc = new FormData();
        formDoc.append('sr',document.getElementById("student-sr").value);
        formDoc.append('student_id',document.getElementById("student-sr-id").textContent);
        formDoc.append('desc',document.querySelector("#upload-desc").value)
        formDoc.append('student_name',document.querySelector("#student-sr-name").value)
        formDoc.append('doc',document.querySelector("#upload-doc").files[0]);
    
     try{   const data = await axios({
            method:'POST',
            url:'/api/v1/documentInfo/uploadDoc',
            data:formDoc
        })
    location.reload();
     }
     catch(err)
     {
window.alert(err.response.data.message);
     }
    })
}

if(document.querySelector(".del-doc"))
{
    document.querySelectorAll(".del-doc").forEach((el)=>{
        
        el.addEventListener("click",async (e)=>{

        let obj = new Object();

        console.log(el);

    
        obj.doc_name = el.name;
        obj.doc_id= el.id;
        obj.student_sr = document.querySelector("#student-sr").value;
        obj.student_id = document.querySelector("#student-sr-id").textContent;
        
        console.log(obj);
try
{const data = await axios({
    method:"DELETE",
    url:"/api/v1/documentInfo/deleteDoc",
    data:obj
})
location.reload();}
        
        catch(err)
        {
window.alert(err.response.data.message);
        }

        }
)
    }
    )
}