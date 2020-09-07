var app = new Vue({
    el: '#app',
    data: {
        errorMsg: "",
        successMsg: "",
        showAddModal: false,
        showEditModal: false,
        showDeleteModal:false,
        allElements: {folders: [], files:[]},
        newElement: {parent_id:"", name:"", file_type:"", data:""},
        currentFolderId: "0",
        rootId: "0",
        currentElement:{},
        isFile: false
    },
    created: function (){
        this.getAllElements();
    },
    methods:{
        //Getting all elems from back
        getAllElements(){
            axios.get("http://localhost:63342/test1/process.php?action=read").then(
                function (response){
                    if(response.data.error){
                        app.errorMsg = response.data.message;
                    }
                    else{
                        app.allElements.folders = response.data.folders;
                        app.allElements.files = response.data.files;
                    }
                }
            )

        },

        //Adding an element
        addElement(){
                app.newElement.parent_id = app.currentFolderId;
            post = "";
            if(app.isFile) {
                post = "http://localhost:63342/test1/process.php?action=createFile";
            }else {
                post = "http://localhost:63342/test1/process.php?action=createFolder";
            }
            axios.post(post, app.toFormData(app.newElement)).then(
                function (response){
                    app.newElement = {name: "", file_type: "", data: "", parent_id: ""};
                    app.isFile = false;
                    if(response.data.error){
                        app.errorMsg = response.data.message;
                    }
                    else{
                        app.successMsg = response.data.message;
                        app.getAllElements();
                    }
                }
            )
        },

        //Updating an element
        updateElement(){
            post = "";
            if(app.isFile) {
                post = "http://localhost:63342/test1/process.php?action=updateFile";
            }else{
                post = "http://localhost:63342/test1/process.php?action=updateFolder";
            }
            axios.post(post, app.toFormData(app.currentElement)).then(
                function (response){
                    app.currentElement = {};
                    app.isFile = false;
                    if(response.data.error){
                        app.errorMsg = response.data.message;
                    }
                    else{
                        app.successMsg = response.data.message;
                        app.getAllElements();
                    }
                }
            )
        },

        //Deleting an element
        deleteElement(){
            post = "";
            if(app.isFile) {
                post = "http://localhost:63342/test1/process.php?action=deleteFile";
            }else {
                post = "http://localhost:63342/test1/process.php?action=deleteFolder";
            }
            axios.post(post, app.toFormData(app.currentElement)).then(
                function (response){
                    app.currentElement = {};
                    app.isFile = false;
                    if(response.data.error){
                        app.errorMsg = response.data.message;
                    }
                    else{
                        app.successMsg = response.data.message;
                        app.getAllElements();
                    }
                }
            )
        },

        //Getting an object of selected file
        selectFile(file){
            app.currentElement = file;
        },

        //Getting an object of selected folder
        selectFolder(folder){
            app.currentElement = folder;
        },

        //Changing id of showing folder
        goUpperFolder(){
            let f = app.allElements.folders.find(folder => folder.id === app.currentFolderId);
            if (f.parent_id != null){
                app.currentFolderId = f.parent_id;
            }
            else {
                app.currentFolderId = "0"
            }
            app.setCurrentFolderName();
        },

        goIntoFolder(){
            app.currentFolderId = app.currentElement.id;
            app.setCurrentFolderName();
        },

        setCurrentFolderName(){
            let f = app.allElements.folders.find(folder => folder.id === app.currentFolderId);
            document.getElementById('currentFolderName').innerHTML = f.name;
        },

        //Creating formdata object for post queris
        toFormData(obj){
            var fd = new FormData();
            for (var i in obj){
                fd.append(i, obj[i]);
            }
            return fd;
        },

        clearMsg(){
            app.errorMsg = "";
            app.successMsg = "";
        }
    }

});