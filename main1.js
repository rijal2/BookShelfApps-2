const READ_BOOK_UNCOMPLETE = "unCompletedList";
const READ_BOOK_COMPLETE = "isCompletedList"
const ITEM_BOOK = "bookId"

function toRakBuku (teksJudul, teksPenulis, teksTahun, isCompleted){
    const judulBuku = document.createElement("h3");
    judulBuku.innerText = teksJudul;
    judulBuku.classList.add('judul')
    const namaPenulis = document.createElement("p");
    namaPenulis.innerText = teksPenulis;
    const angkaTahun = document.createElement("h5");
    angkaTahun.innerText = teksTahun;

    const newArticle = document.createElement("article")
    newArticle.className = "book_item"

    const action = document.createElement("div");
    action.className = "action";

    if(isCompleted){
        newArticle.classList.add('completed')
        action.append(doCompletedBtn(), deleteBtn())
    } else{
        newArticle.classList.add('uncompleted')
        action.append(doUnCompletedBtn(), deleteBtn())
    }

    newArticle.appendChild(judulBuku);
    newArticle.appendChild(namaPenulis);
    newArticle.appendChild(angkaTahun);
    newArticle.appendChild(action);

    return newArticle;
}

function createBtn (buttonTypeClass, eventListener){
    const button = document.createElement("button");
    button.textContent = "Hapus"
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        if(confirm("Apakah kamu yakin Ingin menghapus Buku ini ?")){
        eventListener(event);
        event.stopPropagation();
        }
    });
    return button;
}

function deleteBtn (){
    return createBtn("red", function(event){

        deleteBook(event.target.parentElement.parentElement)
    })
}

function toCompletedBtn (classBtn, eventListener){
    const btn = document.createElement("button")
    btn.textContent = "Completed"
    btn.classList.add(classBtn)
    btn.addEventListener("click", function(e) {
        
        if(confirm("Apakah kamu yakin akan memindahkan buku ini ke RAK 2 (Sudah Selesai dibaca) ?")){
        eventListener(e)
        e.stopPropagation();
        }
    })
    return btn;
}

function doCompletedBtn (){
    return toUnCompletedBtn("green", function(e){
        unCompletedBook(e.target.parentElement.parentElement)
    })
}

function toUnCompletedBtn (classBtn, eventListener){
    const btn = document.createElement("button")
    btn.textContent = "Uncompleted"
    btn.classList.add(classBtn)
    btn.addEventListener("click", function(e) {
        if(confirm("Apakah kamu yakin akan memindahkan buku ini ke RAK 1 (Belum Selesai dibaca) ?")){
        eventListener(e)
        e.stopPropagation();
        }
    })
    return btn;
}

function doUnCompletedBtn (){
    return toCompletedBtn("green", function(e){
        isCompletedBook(e.target.parentElement.parentElement);   
    })
}

function inputBook(){
    const belumSelesai = document.getElementById(READ_BOOK_UNCOMPLETE);
    const sudahSelesai = document.getElementById(READ_BOOK_COMPLETE);
    const teksJudul = document.getElementById("inputBookTitle").value;
    const teksPenulis = document.getElementById("inputBookAuthor").value;
    const teksTahun = document.getElementById("inputBookYear").value;
    const statusBuku = document.getElementById("check").value;
    const isCompleted = statusBuku === "true" ? true : false;

    const buku = toRakBuku(teksJudul, teksPenulis, teksTahun, isCompleted);
    const objectBuku = buatObjectBuku(teksJudul, teksPenulis, teksTahun, isCompleted);

    buku[ITEM_BOOK] = objectBuku.id
    bookShelfApps.push(objectBuku)

    if(isCompleted){
        sudahSelesai.append(buku);
        alert("Selamat, Buku berhasil ditambahkan ke RAK 2 (Sudah Selesai dibaca)!")
    }else{
        belumSelesai.append(buku);
        alert("Selamat, Buku berhasil ditambahkan ke RAK 1 (Belum Selesai dibaca)!")
    }
    
    updateDataToStorage();
    
}

function isCompletedBook (rakBookList) {
    
    const judulBuku = rakBookList.querySelector("h3").innerText;
    const namaPenulis = rakBookList.querySelector("p").innerText;
    const angkaTahun = rakBookList.querySelector("h5").innerText;

    const listCompleted = document.getElementById(READ_BOOK_COMPLETE);
    const newBookComplited = toRakBuku(judulBuku, namaPenulis, angkaTahun, true);
    const listBook = temukan(rakBookList[ITEM_BOOK]);
    listBook.isCompleted = true;
    newBookComplited[ITEM_BOOK] = listBook.id;
    listCompleted.append(newBookComplited);
    rakBookList.remove();
    
    updateDataToStorage();
}

function unCompletedBook (rakBookList) {
    const listCompleted = document.getElementById(READ_BOOK_UNCOMPLETE);
    const judulBuku = rakBookList.querySelector("h3").innerText;
    const namaPenulis = rakBookList.querySelector("p").innerText;
    const angkaTahun = rakBookList.querySelector("h5").innerText;

    const newBookComplited = toRakBuku(judulBuku, namaPenulis, angkaTahun, false);
    const listBook = temukan(rakBookList[ITEM_BOOK]);
    listBook.isCompleted = false;
    newBookComplited[ITEM_BOOK] = listBook.id;

    listCompleted.append(newBookComplited);
    rakBookList.remove();

    updateDataToStorage();
}

function deleteBook (rakBookList) {
    const letakObject = temukanIndex(rakBookList[ITEM_BOOK]);
    bookShelfApps.splice(letakObject, 1);
    rakBookList.remove();
   
    updateDataToStorage();
}

function refreshData () {
    const isCompletedBook = document.getElementById(READ_BOOK_COMPLETE);
    const unCompletedBook = document.getElementById(READ_BOOK_UNCOMPLETE);
    
    for(b of bookShelfApps){
        const newBook = toRakBuku(b.teksJudul, b.teksPenulis, b.teksTahun, b.isCompleted);
        newBook[ITEM_BOOK] = b.id;
        if(b.isCompleted){
            isCompletedBook.append(newBook);
        } else {
            unCompletedBook.append(newBook);
        }
    }
}