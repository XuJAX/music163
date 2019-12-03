<?php
     header("Content-Type: text/html; charset=utf-8");

     $path="localhost";
     $username="root";
     $password="";
     $dba="music163";
   
     $conn=new mysqli($path,$username,$password,$dba);
     $conn->query("set names 'utf8'"); 
?>