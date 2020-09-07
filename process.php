<?php
    require_once 'connection.php';
    $con = mysqli_connect("$host", "$user",
        "$password", "$database");
    if($con->connect_error){
        die("Connection failed!".$con->connect_error);
}
    $result = array('error'=>false);
    $action = '';

    if(isset($_GET['action'])){
        $action = $_GET['action'];
    }

    if($action == 'read'){
        $sql = $con->query("SELECT * FROM folders");
        $folders = array();
        while ($row = $sql->fetch_assoc()){
            array_push($folders, $row);
        }
        $result['folders'] = $folders;


        $sql = $con->query("SELECT * FROM files");
        $files = array();
        while ($row = $sql->fetch_assoc()){
            array_push($files, $row);
        }
        $result['files'] = $files;
    }

    if($action == 'createFolder'){
        $name = $_POST['name'];
        $data = $_POST['data'];
        $parent_id = $_POST['parent_id'];

        $sql = $con->query("INSERT INTO folders (name, data, parent_id)
            VALUES('$name', '$data', '$parent_id')");

        if($sql){
            $result['message'] = "Folder created successfully!";
        }
        else{
            $result['error'] = true;
            $result['message'] = "Failed to create folder!";
        }
    }

    if($action == 'createFile'){
        $name = $_POST['name'];
        $file_type = $_POST['file_type'];
        $data = $_POST['data'];
        $parent_id = $_POST['parent_id'];

        $sql = $con->query("INSERT INTO files (parent_id, name, file_type, data)
            VALUES('$parent_id','$name', '$file_type', '$data')");

        if($sql){
            $result['message'] = "File created successfully!";
        }
        else{
            $result['error'] = true;
            $result['message'] = "Failed to create file!";
        }
    }

    if($action == 'updateFolder'){
        $id = $_POST['id'];
        $name = $_POST['name'];
        $data = $_POST['data'];
        $parent_id = $_POST['parent_id'];

        $sql = $con->query("UPDATE folders SET name='$name', 
                data='$data', parent_id = '$parent_id' WHERE folders.id='$id'");

        if($sql){
            $result['message'] = "Folder updated!";
        }
        else{
            $result['error'] = true;
            $result['message'] = "Update failed!";
        }
    }

    if($action == 'updateFile'){
        $id = $_POST['id'];
        $name = $_POST['name'];
        $file_type = $_POST['file_type'];
        $data = $_POST['data'];
        $parent_id = $_POST['parent_id'];

        $sql = $con->query("UPDATE files SET name='$name',
         file_type='$file_type', data='$data', parent_id = '$parent_id' WHERE files.id='$id'");

        if($sql){
            $result['message'] = "File updated!";
        }
        else{
            $result['error'] = true;
            $result['message'] = "Update failed!";
        }
    }

    if($action == 'deleteFolder'){
        $id = $_POST['id'];

        $sql = $con->query("DELETE FROM folders WHERE folders.id='$id'");

        if($sql){
            $result['message'] = "Folder deleted!";
        }
        else{
            $result['error'] = true;
            $result['message'] = "Delete failed!";
        }
    }

    if($action == 'deleteFile'){
        $id = $_POST['id'];

        $sql = $con->query("DELETE FROM files WHERE files.id='$id'");

        if($sql){
            $result['message'] = "File deleted!";
        }
        else{
            $result['error'] = true;
            $result['message'] = "Delete failed!";
        }
    }



    echo json_encode($result);

    $con->close();



