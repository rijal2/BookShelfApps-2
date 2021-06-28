const STORAGE_KEY = "DATA-BOOKS";

let bookShelfApps = [];

function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}

function saveData() {
    const parsed /* string */ = JSON.stringify(bookShelfApps);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        bookShelfApps = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}


function buatObjectBuku (teksJudul, teksPenulis, teksTahun, isCompleted) {
    return {
        id: Math.random().toString(32).slice(2),
        teksJudul, 
        teksPenulis, 
        teksTahun, 
        isCompleted,
    };
 }

 function /*findTodo*/ temukan (temukanId) {

    for(book of bookShelfApps){
        if(book.id === temukanId)
            return book;
    }

    return null;
}

function /*findTodoIndex*/ temukanIndex(temukanId /*todoId*/) {
    
    let index = 0
    for (book of bookShelfApps) {
        if(book.id === temukanId)
            return index;

        index++;
    }

    return -1;
}