<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<title>Insert title here</title>
</head>
<body>
	<form action="join" method = "post">
		<div>email : <input type='email' name='id' id='id' placeholder='your email'></div>
		<div>password : <input type='password' name='password' id='password'></div>
		<div>name : <input type='text' name='name' id='name'></div>
		<div>male<input type='checkbox' name='male' value='male'> female<input type='checkbox' name='female' value='female'></div>

		<button type='submit'>join</button>
	</form>
</body>
</html>