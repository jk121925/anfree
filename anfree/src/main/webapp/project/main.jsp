<%@ page import="vo.Member" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<jsp:useBean id="loginMember" scope='session' class="vo.Member" type="vo.Member"/>
<body>

<% if(loginMember.getName()==null) {%>
 <h1>Hello! do free from anxity</h1>
<%} else if(loginMember.getName()!=null){ %>
<h1>Hello! <%=loginMember.getName() %> </h1>
<%} %>
	<h2>how many member clear todo!</h2><br>
	<a href="member">member</a><br>
	<h2>Login and trace your todo </h2><br>
	<a href="login">login</a>
	
	<% if(loginMember.getName()!=null){ %>
	<form action="AddTodo" method="post">
		<%=loginMember.getNo() %>
		<input type='text' name='no' value='<%=loginMember.getNo() %>' readyonly>
		you have to?<input type='checkbox' id='force' name='force' value='1'>	
		Todo <input type='text' id='todo' name ='todo'>
		<input type='submit' value="anxity">
	</form>
	<%} %>
	
</body>
</html>