const form = document.getElementById("noteForm");
const title = document.getElementById("title");
const content = document.getElementById("content");

const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");

const notesContainer = document.getElementById("notesContainer");
const search = document.getElementById("search");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editId = null;

displayNotes();

form.addEventListener("submit", function(e){

    e.preventDefault();

    titleError.textContent="";
    contentError.textContent="";

    let valid=true;

    if(title.value.trim()===""){
        titleError.textContent="Title cannot be empty";
        valid=false;
    }

    if(content.value.trim()===""){
        contentError.textContent="Content cannot be empty";
        valid=false;
    }

    if(!valid) return;

    const note={

        id: editId || Date.now(),

        title:title.value,

        content:content.value,

        lastEdited:new Date().toLocaleString()
    };

    if(editId){

        notes=notes.map(n=>n.id===editId?note:n);
        editId=null;

    }else{

        notes.unshift(note);
    }

    saveNotes();

    form.reset();

    displayNotes();

});

function displayNotes(){

    notesContainer.innerHTML="";

    const keyword=search.value.toLowerCase();

    notes
    .filter(note=>

        note.title.toLowerCase().includes(keyword) ||

        note.content.toLowerCase().includes(keyword)

    )

    .forEach(note=>{

        const div=document.createElement("div");

        div.className="note";

        div.innerHTML=`

        <h3>${note.title}</h3>

        <p>${note.content}</p>

        <small>Last Edited: ${note.lastEdited}</small>

        <div class="actions">

        <button class="edit" onclick="editNote(${note.id})">
        Edit
        </button>

        <button class="delete" onclick="deleteNote(${note.id})">
        Delete
        </button>

        </div>

        `;

        notesContainer.appendChild(div);

    });

}

function saveNotes(){

    localStorage.setItem("notes",JSON.stringify(notes));
}

function deleteNote(id){

    notes=notes.filter(note=>note.id!==id);

    saveNotes();

    displayNotes();
}

function editNote(id){

    const note=notes.find(note=>note.id===id);

    title.value=note.title;

    content.value=note.content;

    editId=id;

    window.scrollTo({

        top:0,

        behavior:"smooth"
    });

}

search.addEventListener("input",displayNotes);