<%@page import="vo.Todo" %>
<%@page import="vo.Member" %>
<%@page import="java.util.ArrayList" %>
<%@page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<jsp:useBean id="TodoLists" scope ='session' class='java.util.ArrayList' type='java.util.ArrayList<Todo>'/>
<jsp:useBean id="loginMember" scope='session' class="vo.Member" type="vo.Member"/>

<body>
	<% if(!TodoLists.isEmpty()){ 
		for(Todo todo: TodoLists){
	%>
		<form action='todoupdate' method="post">
			<div>
			<input type = "submit"><%=todo.getMno() %> <%=todo.getTodo() %> <%=todo.getState() %>
			<input type='hidden' id='no' name='no' value='<%=todo.getMno() %>'>
			<input type='hidden' id='todo' name='todo' value='<%=todo.getTodo() %>'>
			</div>
		</form>
	<%} }else{%>
		Add it
	<% }%>
</body>
</html>