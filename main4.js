const findList = document.querySelector("#searchBookTitle");
findList.addEventListener("keyup", cariList)

function cariList(e){
    let isiInputan = document.getElementById('searchBookTitle').value.toLowerCase();
    // for uncompleted
    let unCompleted = document.getElementById('unCompletedList');
    let articleUnCompleted = unCompleted.querySelectorAll('.book_item');

    articleUnCompleted.forEach((un) => {
        const changeValue = un.firstChild.textContent.toLowerCase()
        
        if(changeValue.indexOf(isiInputan) != -1){
            un.setAttribute("style", "display: block; border: 2px solid yellow; background-color: brown; color: white;")
        } else{
            un.setAttribute("style", "display: none !important;")
        }

    // for uncompleted
    let isCompleted = document.getElementById('isCompletedList');
    let articleIsCompleted = isCompleted.querySelectorAll('.book_item');
    
    articleIsCompleted.forEach((un) => {
        const changeValue = un.firstChild.textContent.toLowerCase();
        
        if(changeValue.indexOf(isiInputan) != -1){
            un.setAttribute("style", "display: block; border: 2px solid yellow; background-color: brown; color: white;")
        } else{
            un.setAttribute("style", "display: none !important;")
        }
    })
        
    })
    
    };