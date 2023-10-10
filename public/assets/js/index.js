// Declare variables
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

// Check if the page is on "/notes"
if (window.location.pathname === "/notes") {
  noteTitle = document.querySelector(".note-title");
  noteText = document.querySelector(".note-textarea");
  saveNoteBtn = document.querySelector(".save-note");
  newNoteBtn = document.querySelector(".new-note");
  noteList = document.querySelectorAll(".list-container .list-group");
}

// Show an element
const show = (elem) => {
  elem.style.display = "inline";
};

// Hide an element
const hide = (elem) => {
  elem.style.display = "none";
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// Fetch notes from the server
const getNotes = () =>
  fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

// Save a new note
const saveNote = (note) =>
  fetch("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

// Update a note by ID
const editNote = (id, updatedNote) =>
  fetch(`/api/notes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedNote),
  });

// Delete a note by ID
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

// Render the active note in the editor
const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    // If the note is active, keep the readonly attribute
    noteTitle.setAttribute("readonly", "readonly");
    noteText.setAttribute("readonly", "readonly");
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    // If the edit button is clicked, remove the readonly attribute
    noteTitle.removeAttribute("readonly");
    noteText.removeAttribute("readonly");

    // Reset values for new notes
    noteTitle.value = "";
    noteText.value = "";
  }
};

// Handle saving a note
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };

  if (activeNote.id) {
    // If activeNote has an id, editing an existing note
    editNote(activeNote.id, newNote).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  } else {
    // If activeNote doesn't have an id, creating a new note
    saveNote(newNote).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  }
};

// Edit the clicked note
const handleNoteEdit = (e, jsonNotes) => {
  e.stopPropagation();

  const editBtn = e.target;
  const noteId = JSON.parse(editBtn.parentElement.getAttribute("data-note")).id;

  if (activeNote.id === noteId) {
    // If already in edit mode, do nothing
    return;
  }

  // Find the note to be edited based on its ID
  const noteToEdit = jsonNotes.find((note) => note.id === noteId);

  if (noteToEdit) {
    // Set activeNote to the note to be edited
    activeNote = noteToEdit;

    // Render the active note in the editor
    renderActiveNote();

    // Enable input fields
    noteTitle.removeAttribute("readonly");
    noteText.removeAttribute("readonly");

    // Show the save button
    saveNoteBtn.style.display = "inline";
  } else {
    console.error("Note not found for editing:", noteId);
  }
};

// Add an event listener for editing a note
const addEditNoteListener = (jsonNotes) => {
  noteList.forEach((el) => {
    const noteItems = el.children; // Get the individual note items in the list

    // Iterate over each note item and add an "Edit" button
    for (let i = 0; i < noteItems.length; i++) {
      const editBtnEl = document.createElement("i");
      editBtnEl.classList.add(
        "fas",
        "fa-edit",
        "float-right",
        "text-primary",
        "edit-note",
        "ml-15",
        "mr-15"
      );
      editBtnEl.addEventListener("click", (e) => handleNoteEdit(e, jsonNotes));

      // Append the "Edit" button to the note list item
      noteItems[i].appendChild(editBtnEl);
    }
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute("data-note"));
  renderActiveNote();
};

// Sets the activeNote to an empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

// Handle rendering the save button
const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();
  if (window.location.pathname === "/notes") {
    noteList.forEach((el) => (el.innerHTML = ""));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item");

    const spanEl = document.createElement("span");
    spanEl.classList.add("list-item-title");
    spanEl.innerText = text;
    spanEl.addEventListener("click", handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement("i");
      delBtnEl.classList.add(
        "fas",
        "fa-trash-alt",
        "float-right",
        "text-danger",
        "delete-note",
        "ml-15",
        "mr-15"
      );
      delBtnEl.addEventListener("click", handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi("No saved Notes", false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === "/notes") {
    noteListItems.forEach((note) => noteList[0].append(note));
    addEditNoteListener(jsonNotes); // Call the function to add edit note event listeners
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

// Check if the page is on "/notes" and add event listeners
if (window.location.pathname === "/notes") {
  saveNoteBtn.addEventListener("click", handleNoteSave);
  newNoteBtn.addEventListener("click", handleNewNoteView);
  noteTitle.addEventListener("keyup", handleRenderSaveBtn);
  noteText.addEventListener("keyup", handleRenderSaveBtn);
}

// Initial rendering of notes
getAndRenderNotes();
