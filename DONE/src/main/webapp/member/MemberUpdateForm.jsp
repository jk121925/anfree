<%@ page import="vo.Member" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>Member ingredient</title>
</head>
<body>
	<form action='update.do' method='post'>
		number: <input type='text' name='no' value='${member.no}' readonly><br>
		name: <input type='text' name ='name' value='${member.name}'><br>
		e-mail: <input type='text' name='email' value='${member.email}'><br>
		register at ${member.createdDate}
		<input type='submit' value='Update'>
		<input type='button' value='delete' onclick='location.href="delete?no=?${member.no}";'>
		<input type='button' value='cancle' onclick='location.href="list"'>
	</form>
</body>
</html>



