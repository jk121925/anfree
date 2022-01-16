<%@ page import="vo.Member" %>
<%@ page import="vo.Todo" %>
<%@ page import="java.util.ArrayList" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<jsp:useBean id="loginMember" scope='session' class="vo.Member" type="vo.Member"/>
<jsp:useBean id="TodoLists" scope ='session' class='java.util.ArrayList' type='java.util.ArrayList<Todo>'/>

<body>

	<% if(loginMember.getNo()==0) {%>
	 <h1>Hello! do free from anxity</h1>
	 <h2>how many member clear todo!</h2><br>
		<a href="member">member</a><br>
	 <h2>Login and trace your todo </h2><br>
		<a href="login">login</a>
	<%} else if(loginMember.getNo()!=0){ %>
		<h1>Hello! <%=loginMember.getName() %> </h1>
		<h2>how many member clear todo!</h2><br>
		<a href="member">member</a><br>
		<h2>Login and trace your todo </h2><br>
		<a href="logout">logout</a>
	<%} %>
		<% if(loginMember.getNo()!=0){ %>
		<form action="AddTodo" method="post">
			<%=loginMember.getNo() %>
			<input type='hidden' id='no' name='no' value=<%=loginMember.getNo() %>>
			you have to?<input type='checkbox' id='force' name='force' value='1'>	
			Todo <input type='text' id='todo' name ='todo'>
			<input type='submit' value="anxity">
		</form>
		<%} %>
	<% if(!TodoLists.isEmpty()){ %>
	<jsp:include page='/project/todoLists.jsp'/>
	<%} %>
	
	
</body>
</html>