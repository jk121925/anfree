<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>MemberAdd</title>
</head>
<body>
	<h1>Registration Member</h1>
	<form action='add' method='post'>
		name : <input type='text' name='name'><br>
		E-mail : <input type='text' name='email'><br>
		password : <input type='password' name='password'><br>
		<input type = 'submit' value='add' >
		<input type = 'reset' value='cancle'>	
	</form>
</body>
</html>