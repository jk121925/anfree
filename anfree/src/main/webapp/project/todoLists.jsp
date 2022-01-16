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
<jsp:useBean id="TodoLists" scope ='session' class='java.util.ArrayList' type='java.util.ArrayList<Todo>'/>

<body>
	<% if(!TodoLists.isEmpty()){ 
		for(Todo todo: TodoLists){
	%>
		<div><%=todo.getMno() %> <%=todo.getTodo() %> <%=todo.getState() %></div>
	<%} }else{%>
		Add it
	<% }%>
</body>
</html>