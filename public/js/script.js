import '@babel/polyfill';
import axios from 'axios';
import { Console } from 'console';
import lodash, { forEach, isInteger, isLength } from 'lodash'; 
import moment from 'moment'; 
import {promisify} from 'util';
import documents from '../../model/documents';
import { createBrowserHistory } from "history";

const backLinks =[];

const updateCollectiondata = (total,dateNow)=>{
    // console.log(total,"9999999999");
    const collectionObj = new Object();
    collectionObj["id1"] = dateNow;
    // console.log(total);
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
    // console.log(data);
}
location.reload();    
    }
    catch(err)
    {
        const entries = Object.entries(err.response.data.err.errors);
        entries.forEach((el)=>{
if(el[1].path!=="password")
{
            window.alert(`${el[1].message}`);
        }
    })
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



if(document.querySelector("#back-btn"))
{
    
    document.querySelector("#back-btn").addEventListener("click",(e)=>{
      
window.history.back();

    })
}


if(document.querySelector(".del-doc-school"))
{
    const delBtn =document.querySelectorAll(".del-doc-school");

    delBtn.forEach((el)=>{
        el.addEventListener("click",async (e)=>{

        // console.log(el);

        const randnum = Math.round(Math.random()*10000)+100000*1

        const enteredNum = prompt(`Enter the code ${randnum}`,"");
 
        if(enteredNum*1!==randnum*1)
       return  window.alert("Wrong Code");

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
   window.location.href=`/studentInfo/get-all/${year}/${classSchool}`;

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
   
let name = document.getElementById("name").value.toUpperCase();

if(name==="")
name = false;

   window.location.href=`/studentInfo/get-one/${year}/${classSchool}/${name}/false`;
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

if(document.querySelector("#discount"))
{
    document.querySelector("#discount").addEventListener("click",(e)=>{

        e.preventDefault();

        document.querySelectorAll(".discount-option").forEach((el)=>el.classList.remove('invisible'));

    })
}

if(document.querySelector("#student-age"))
{
    const student_age=document.querySelector("#student-age")
    const student_dob=document.querySelector("#student-dob")
    student_age.addEventListener("change",(e)=>{

        let time_left;
        const year =( new Date(student_age.value)-new Date(student_dob.value))/(1000*60*60*24*365);

        time_left = ( new Date(student_age.value)-new Date(student_dob.value))%(1000*60*60*24*365)

        const month = time_left/(1000*60*60*30*24);

// console.log(new Date(student_age.value)-new Date(student_dob.value));
        alert(`Student is ${Math.trunc(year)} Years and ${Math.trunc(month)} Months old`);

    })

}

if(document.querySelector("#submit-all"))
    document.querySelector("#submit-all").addEventListener("click",async function(e)
    {
        const classList = ["PG",'LKG','UKG','1st','2nd','3rd','4th','5th','6th','7th','8th'];

        e.preventDefault();
        document.querySelector("#submit-all").value="Updating";
        const year = document.getElementById("student-year").value;
        const discount = "";
        if(document.getElementById("student-discount"))
        document.getElementById("student-discount").value;
        const name = document.getElementById("student-name").value;
        const father = document.getElementById("student-father").value;
        const studentClassCode= document.getElementById("student-class").value;
        const religion = document.getElementById("student-religion").value;
        const dob = document.getElementById("student-dob").value;
        const category = document.getElementById("student-category").value;
        const gender = document.getElementById("student-gender").value;
        const studentClass = classList[studentClassCode*1];
        let dateNow = new Date().toLocaleString().split(",")[0];
        dateNow+='Z';
        const student = new Object();
        student.year=year;
        student.leave = !document.getElementById("student-leave").checked;
        student.name=name;
        student.dob=dob;
        student.religion=religion;
        student.category=category;
        student.gender=gender;
        student.class=studentClass;
        student.father_name=father;
        student.class_code = studentClassCode;
        

        student.roll_no = document.getElementById("student-roll_no").value;
        let feesStudent = lodash.cloneDeep(student);

        console.log(student);

        if(document.querySelector("#submit-all").name==="add")
        { 
           return StudentData(student,"add");
     }
let data1;
     try{data1 = await axios({
         method:"GET",
         url:"/api/v1/collectionInfo/get-fees"
     })}
     catch(err)
     {
 window.alert(err.response.data.message);
     }

     const fees = data1.data.fees;

     // console.log(fees);
        const months = document.querySelectorAll(".month");
        
        // const monthName = ['january','february','march','april','may','june','july','august','september','october','november','december']
     let total = 0*1;
     

 for(const el of months){

            student[`${el.name}`]=el.value;

            // // console.log("10");

            if(el.classList.contains('no_change')!==true&&el.value!=="")
            {
                student[`${el.name}`]= el.value;
                feesStudent['fees'] = fees[studentClassCode]*1-(fees[studentClassCode]*1*discount)/100;
                feesStudent['month'] = el.name;
                feesStudent['date'] = dateNow;
                feesStudent['date_of'] = el.value;
console.log(feesStudent);
                // console.log(Date.now(),dateNow);
                total=total + fees[studentClassCode]*1-(fees[studentClassCode]*1*discount)/100;
                const data = await axios({

                    method:'POST',
                    url:"/api/v1/studentInfo/feesStudent",
                    data:feesStudent
                });
                // console.log("20");
            }
            else if(el.classList.contains('no_change')===true&&el.value==="")
            {
                feesStudent['month'] = el.name;
               
                // console.log(Date.now(),dateNow);

              try{  const data =await axios({
                  method:'DELETE',
                  url:"/api/v1/studentInfo/feesStudent",
                  data:feesStudent
                });
                if(data.status===201)
               { 
                //    console.log(data.data.data.fees);

                   total=total-data.data.data.fees;
                
                }
    // console.log(total);
    
        }
                catch(err)
                {
            window.alert(err.response.data.message);
                }
        };    
    }
    
        updateCollectiondata(total,dateNow);
       
    const id = window.location.href.split("/")[5];
    
    StudentData(student,id);

});

if(document.querySelector(".uploader"))
{  document.querySelector(".uploader").addEventListener("submit",async (e)=>{

        e.preventDefault();

        const form = new FormData();
        form.append('description',document.getElementById('desc').value.toLowerCase());
        form.append('type',document.getElementById('type-data').value.toLowerCase());
        form.append('file',document.getElementById('fileUp').files[0]);

        // console.log(form);

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

    window.location.href=`/documentInfo/list/${type}/${date}`;
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

            // console.log(data);
            let data1;
           try{   data1= await axios ({

             method:'POST',
             url:'/api/v1/userInfo/login',
             data:data   
            })
location.href="/";
            // console.log(data1)
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
    excel['fees'] = document.getElementById("fees-check").checked;
    excel["add_info"] = document.getElementById("add-info-check").checked;
    excel['sessionfilter'] = document.getElementById("session-filter").value;
    excel['classfilter'] = document.getElementById("class-filter").value;

    // console.log(excel,"***********");

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

        // console.log(data);
       
      try{  const data1  = await axios ({

         method:'POST',
         url:'/api/v1/userInfo/signup',
         data:data   
        })

        // console.log(data1);

        if(data1.status==201)
        window.location.href='/';}
        catch(err)
        {
            // console.log(err.response.data);

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

   // console.log(options);

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

    const classList = ["PG",'LKG','UKG','1st','2nd','3rd','4th','5th','6th','7th','8th'];

    // console.log(start_class,end_class);

    if(document.querySelector(".get-by-month").classList.contains('invisible')===true)
    {
        const objs = [];

        for(let i=start_class;i<=end_class;i++)
        {
            const feedesc= new Object;

            feedesc["class"] = classList[i*1];
            feedesc["total"] = 0*1;

            if(full_data)
            feedesc["data"] = [];

            objs.push(feedesc);
        }

        // console.log(objs);

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
     // // console.log(window.location.host);
     url.searchParams.set('data',pr);
        // console.log(url.search);
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
// console.log(session);
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
        // console.log(start_date);
        
        const end_date = new Date(end_session,end_month*1+1,0);
        // console.log(end_date)
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

     // console.log(objs);

     var url = new URL(`http://${window.location.host}/studentInfo/displayFeeRecord`);
     // console.log(window.location.host);
     url.searchParams.set('data',pr);
        // console.log(url.search);
        window.location.href=`${url}`;

}
})

}


if(document.querySelector("#get-sr-main"))
{

    document.querySelector("#get-sr-main").addEventListener("submit",(e)=>{

        e.preventDefault();

        const section = document.querySelector("#sr-main-section").value;
        let name = document.querySelector("#sr-main-name").value.toUpperCase();
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
        const sr_temp=document.querySelector("#student-sr").name;
        if(document.querySelector("#student-sr_no"))
        objs["sr_no"] = document.querySelector("#student-sr_no").value;
        if(document.querySelector("#student-prev_sr_no"))
        objs["prev_sr_no"] = document.querySelector("#student-prev_sr_no").value;
        objs["name"] = document.querySelector("#student-sr-name").value;
        objs["dob"] = document.querySelector("#student-sr-dob").value;
        objs["dob_in_word"] = document.querySelector("#student-sr-dob_in_word").value;
        objs["caste"] =  document.querySelector("#student-sr-caste").value;
        objs["religion"] =  document.querySelector("#student-sr-religion").value;
        objs["nationality"] =  document.querySelector("#student-sr-nationality").value;
        objs["category"] =  document.querySelector("#student-sr-category").value;
        objs["occupation"] =  document.querySelector("#student-sr-occupation").value;
        objs["sex"] = document.querySelector("#student-sr-sex").value;
        objs["last_school"] = document.querySelector("#student-sr-last_school").value;
        objs["class"] = document.querySelector("#student-sr-class").value;
        objs["date_of_admission"] = document.querySelector("#student-sr-date_of_admission").value;
        
        if(objs["sr"]==="PG")
        objs["sr"] = "PG"
        if(objs["sr"] === "PRE PRIMARY")
        objs["sr"] = "LKG TO UKG";
        if(objs["sr"] === "PRIMARY")
        objs["sr"] = "1 TO 5";
        if(objs["sr"] === "JUNIOR HIGHSCHOOL")
        objs["sr"] = "1 TO 8";
        const father = new Object();
        const mother = new Object();
        const address = new Object();

        father.name = document.querySelector("#student-sr-father-name").value;
        mother.name = document.querySelector("#student-sr-mother-name").value;

        father.age = document.querySelector("#student-sr-father-age").value;
        mother.age = document.querySelector("#student-sr-mother-age").value;

        if(objs["prev_sr_no"]==="No record")
        objs["prev_sr_no"]="";
        else if(objs["prev_sr_no"]===null)
        objs["prev_sr_no"]="";


        if(father.age==="null")
        father.age = "";

        if(mother.age==="null")
        mother.age="";

        father.qualification = document.querySelector("#student-sr-father-qualification").value;
        mother.qualification = document.querySelector("#student-sr-mother-qualification").value;

        father.occupation = document.querySelector("#student-sr-father-occupation").value;
        mother.occupation = document.querySelector("#student-sr-mother-occupation").value;

        address.permanent = document.querySelector("#student-sr-address-permanent").value;
        address.local = document.querySelector("#student-sr-address-local").value;
        address.work =  document.querySelector("#student-sr-address-work").value;

        objs["father"] = father;
        objs["mother"] = mother;
        objs["address"] = address;

        if(document.querySelector("#student-sr-pg_admission"))
        {
            const obj1= new Object();
            obj1["admission"]= document.querySelector("#student-sr-pg_admission").value;
            obj1["passing"] = document.querySelector("#student-sr-pg_passing").value;
            objs["pg"]=obj1;
        }

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

        const phone_nos = [];

        phone_nos.push(document.querySelector("#student-sr-phone_no1").value);
        phone_nos.push(document.querySelector("#student-sr-phone_no2").value);

        objs["phone_number"] = phone_nos;

        objs["whatsapp_number"] = document.querySelector("#student-sr-whatsapp_no").value;

        objs["last_class"]= document.querySelector("#student-sr-last_class").value;
        objs["leave_date"]= document.querySelector("#student-sr-leave_date").value;
        objs["remark"]=document.querySelector("#student-sr-remark").value;
        objs["leave_reason"]=document.querySelector("#student-sr-leave_reason").value;
        objs["brother_sister"]=document.querySelector("#student-sr-brother_sister").value;

        console.log(objs);

        // console.log(sr_temp,objs["sr"]);


        if(document.querySelector("#get-student-sr-data").classList.contains("sr-update")&&(sr_temp!=="TEMPORARY"))
       {
           
        try{
            const data= await axios({
            method:'PATCH',
            url:`/api/v1/studentInfo/update-sr/${objs.sr.toLowerCase().split(" ").join("")}/${window.location.href.split("/")[6]}`,
            data:objs
        })
// console.log(data)

setTimeout(()=>{
    location.reload();
},500);

        
    }
        catch(err)
        {
           
window.alert(err.response.data.message);
        }
    
    }

        // console.log(document.querySelector("#get-student-sr-data").classList);

        if(document.querySelector("#get-student-sr-data").classList.contains("sr-add")||(sr_temp!==objs["sr"]))
  {
      try{     const data= await axios({
            method:'POST',
            url:`/api/v1/studentInfo/add-sr`,
            data:objs
});

        location.reload();
    }
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
const playGroup = document.querySelectorAll(".play_group");

// console.log(prePrimary);

document.querySelector(".student-sr-options").addEventListener("change",(e)=>{
    if(document.querySelector(".student-sr-options").value==="PG")
    {
        prePrimary.forEach((el)=>{
            el.classList.add("invisible");
        });
        playGroup.forEach((el)=>{
            el.classList.remove("invisible");
        });
        primary.forEach((el)=>{
            el.classList.add("invisible");
        });
        upperPrimary.forEach((el)=>{
            el.classList.add("invisible");
        });
    }
    if(document.querySelector(".student-sr-options").value==="LKG TO UKG")
    {
        prePrimary.forEach((el)=>{
            el.classList.remove("invisible");
        });
        playGroup.forEach((el)=>{
            el.classList.add("invisible");
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
        playGroup.forEach((el)=>{
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
        playGroup.forEach((el)=>{
            el.classList.add("invisible");
        });
        primary.forEach((el)=>{
            el.classList.add("invisible");
        });
        upperPrimary.forEach((el)=>{
            el.classList.remove("invisible");
        });
    }
    if(document.querySelector(".student-sr-options").value==="TEMPORARY")
    {
        prePrimary.forEach((el)=>{
            el.classList.remove("invisible");
        });
        playGroup.forEach((el)=>{
            el.classList.remove("invisible");
        });
        primary.forEach((el)=>{
            el.classList.remove("invisible");
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

        obj["0"] = document.querySelector("#fees-pg").value;
        obj["1"] = document.querySelector("#fees-lkg").value;
        obj["2"] = document.querySelector("#fees-ukg").value;
        obj["3"] = document.querySelector("#fees-one").value;
        obj["4"] = document.querySelector("#fees-two").value;
        obj["5"] = document.querySelector("#fees-three").value;
        obj["6"] = document.querySelector("#fees-four").value;
        obj["7"] = document.querySelector("#fees-five").value;
        obj["8"] = document.querySelector("#fees-six").value;
        obj["9"] = document.querySelector("#fees-seven").value;
        obj["10"] = document.querySelector("#fees-eight").value;

        try{const data =await axios({
            method:"POST",
            url:"/api/v1/collectionInfo/fees-update",
            data:obj

        })
            // console.log(data);

        location.reload();}
        catch(err)
        {
window.alert(err.response.data.message);
        }
    })
}

if(document.querySelector("#promote-student-fee"))
{

    let click_ct = 0;

    document.querySelector("#promote-student-fee").addEventListener("click", async ()=>{

        const randnum = Math.round(Math.random()*10000)+100000*1

       const enteredNum = prompt(`Enter the code ${randnum}`,"");
       
       const excel= new Object();

       excel["promote"] = 1;

       await axios({

        method:'POST',
        url:'/excel',
        data:excel
    })

    window.open("/users.xlsx");
      
    if(enteredNum*1!==randnum*1)
      return  window.alert("Wrong Code");

const data = await axios({
    method:'POST',
    url:`/api/v1/studentInfo/promote-student-fees/${(new Date()).getFullYear()*1-1}`
})

if(data.status===201)
window.alert("All Students Promoted 🥳🥳")

    })

}

if(document.querySelector("#promote-form"))
{

    const promoteNext = document.querySelectorAll(".promote-next-message");
    const promoteClass = document.querySelector("#promote-class");
    const promoteSr = document.querySelector("#promote-sr");

    const prePrimary = document.querySelectorAll(".pre_primary");
const primary = document.querySelectorAll(".primary")
const upperPrimary = document.querySelectorAll(".upper_primary");
const playGroup = document.querySelectorAll(".play_group");
    promoteSr.addEventListener("change",()=>{

        if(promoteSr.value==="PG")
        {
            playGroup.forEach((el)=>{
                el.classList.remove("invisible");
            });

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
        
        if(promoteSr.value==="LKG TO UKG")
        {
            playGroup.forEach((el)=>{
                el.classList.add("invisible");
            });

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
        if(promoteSr.value==="1 TO 5")
        {
            playGroup.forEach((el)=>{
                el.classList.add("invisible");
            });
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
        if(promoteSr.value==="6 TO 8")
        {
            playGroup.forEach((el)=>{
                el.classList.add("invisible");
            });
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


    document.querySelector("#promote-class").addEventListener("change",()=>{

const curr = document.querySelector("#promote-class").value;

console.log(curr);

if(curr==="ukg"||curr==="five"||curr==="eight"||curr==="pg")
{
    console.log("ll");
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

    window.open("/studentInfo/sr-excel");

    const promoteSr = document.querySelector("#promote-sr").value;
    let promoteClass = document.querySelector("#promote-class").value;
    const promotePassingDate = document.querySelector("#promote-passing-date").value;
    const promoteNextAdmissionDate = document.querySelector("#promote-next-admission-date").value;
    let promotePassingMessage;  
    if(document.querySelector("#promote-passing-message"))
    promotePassingMessage = document.querySelector("#promote-passing-message").value;


    if(promotePassingMessage==="")
    promotePassingMessage=`Passed Class ${promoteClass.toUpperCase()}`;

try{    const data = await axios({
        method:"POST",
        url:`/api/v1/studentInfo/promote-student/${promoteSr}/${promoteClass}/${promotePassingMessage}/${promotePassingDate}/${promoteNextAdmissionDate}`
    })

    // console.log(data.data);

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
let sr_name = document.getElementById("student-sr").value;
        if(sr_name ==="PG")
        sr_name = "PG"
        if(sr_name === "PRE PRIMARY")
        sr_name = "LKG TO UKG";
        if(sr_name === "PRIMARY")
        sr_name = "1 TO 5";
        if(sr_name === "JUNIOR HIGHSCHOOL")
        sr_name = "1 TO 8";
        
        const formPic = new FormData();
        formPic.append('sr',sr_name);
        formPic.append('student_name',document.querySelector("#student-sr-name").value);
        formPic.append('student_id',document.getElementById("student-sr-id").textContent);
        formPic.append('pic',document.getElementById('picUp').files[0]);
       
        // console.log(formPic);

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

        let sr_name = document.getElementById("student-sr").value;
        if(sr_name ==="PG")
        sr_name = "PG"
        if(sr_name === "PRE PRIMARY")
        sr_name = "LKG TO UKG";
        if(sr_name === "PRIMARY")
        sr_name = "1 TO 5";
        if(sr_name === "JUNIOR HIGHSCHOOL")
        sr_name = "1 TO 8";

        formDoc.append('sr',sr_name);
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

        
        // console.log(el);

        const randnum = Math.round(Math.random()*10000)+100000*1

       const enteredNum = prompt(`Enter the code ${randnum}`,"");

       if(enteredNum*1!==randnum*1)
      return  window.alert("Wrong Code");
      let sr_name = document.getElementById("student-sr").value;
      if(sr_name ==="PG")
      sr_name = "PG"
      if(sr_name === "PRE PRIMARY")
      sr_name = "LKG TO UKG";
      if(sr_name === "PRIMARY")
      sr_name = "1 TO 5";
      if(sr_name === "JUNIOR HIGHSCHOOL")
      sr_name = "1 TO 8";
    
        obj.doc_name = el.name;
        obj.doc_id= el.id;
        obj.student_sr = sr_name;
        obj.student_id = document.querySelector("#student-sr-id").textContent;
        
        // console.log(obj);
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

if(document.querySelector("#del-sr-record"))
{
    document.querySelector("#del-sr-record").addEventListener("click",async (e)=>{
        
        e.preventDefault();

        const randnum = Math.round(Math.random()*10000)+100000*1

       const enteredNum = prompt(`Enter the code ${randnum}`,"");

       if(enteredNum*1!==randnum*1)
      return  window.alert("Wrong Code");

const data = await axios({
    method:"DELETE",
    url:`${document.querySelector("#del-sr-record").href}`
})

console.log(data);

    window.location.href="/studentInfo/sr-main";

    })

}


if(document.querySelector("#update-me"))
{

    document.querySelector("#update-me-submit").addEventListener("click",async(e)=>{

        e.preventDefault();

obj.username = document.querySelector("#user_name").value;
obj.email = document.querySelector("#user_email").value;
obj.password = document.querySelector("#user_password").value;
obj.newPassword = document.querySelector("#user_new_password").value;
obj.confirmNewPassword = document.querySelector("#user_confirm_new_password").value;
let data;
try{data = await axios ({

    method:'POST',
    url:'/api/v1/userInfo/updateMe',
    data:obj

})

console.log(data);

if(data.status===201*1)
window.reload();
}
 catch(err)
 {
     console.log(data);
     console.log(err.response);
     if(!err.response.data.err.errors)
    { window.alert(err.response.data.message);
     return;}
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
        }) 
    }
})
}


if(document.querySelector("#forgot-password"))
{
    document.querySelector("#forgot-password").addEventListener("submit",async (e)=>{
        e.preventDefault();
        const email = document.querySelector("#email-login").value;
       const obj = new Object();
       obj["email"] = email;
        console.log(email);
        let data
      try{  data = await axios({
            method:'POST',
            url:"/api/v1/userInfo/forgotPassword",
            data:obj
        });

        console.log(data.status);

        if(data.status===201*1)
        window.location.href="/message";


    }
        catch(err)
        {
            window.alert(err.response.data.message);
        }

    })

}

if(document.querySelector("#forgot-email"))
{
    document.querySelector("#forgot-email").addEventListener("submit", async (e)=>{
    e.preventDefault();

    const obj = new Object;
    
    obj.email = document.querySelector("#user_email").value;
    obj.newPassword = document.querySelector("#user_new_password").value;
    obj.confirmNewPassword = document.querySelector("#user_confirm_new_password").value;
    let data;
    try{data = await axios ({
    
        method:'POST',
        url:'/api/v1/userInfo/resetPassword',
        data:obj
    
    })
    
    console.log(data);
    
    if(data.status===201*1)
    window.location.href="/";
    }
     catch(err)
     {
         console.log(data);
         console.log(err.response);
         if(!err.response.data.err.errors)
        { window.alert(err.response.data.message);
         return;}
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
            }) 

}
})};

if(document.querySelector("#delete-fees"))
{
    const delBtn =document.querySelectorAll("#delete-fees");

    delBtn.forEach((el)=>{
        el.addEventListener("click",async (e)=>{

        // console.log(el);

        const randnum = Math.round(Math.random()*10000)+100000*1

        const enteredNum = prompt(`Enter the code ${randnum}`,"");
        const id = window.location.href.split("/")[5];
        if(enteredNum*1!==randnum*1)
       return  window.alert("Wrong Code");

     try{   const data = await axios({
            method:'DELETE',
            url:`/api/v1/studentInfo/deleteStudent/${id}`
        })
        location.href="/studentInfo/get-one";
}
catch(err)
{
window.alert(err.response.data.message);
}
    })
    }
    )}