<%@ page import= "java.util.ArrayList" %>
<%@ page import= "vo.Member" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>

<body>
	<h1>this is member page</h1>
	<jsp:useBean id="members" scope="request" class="java.util.ArrayList" type="java.util.ArrayList<vo.Member>"/> 
	
	<%
	for(Member member : members){ 
		if(member.getTodoState().equals("Y")){
	%>
	<div class='done'>
		<%=member.getName()%>,
		<%=member.getId()%>,
		<%=member.getCRE_DATE() %>,
		<%=member.getTodoState() %>
	</div>
	<%  }else{ %>
	<div class='Ndone'>
		<%=member.getName()%>,
		<%=member.getId()%>,
		<%=member.getCRE_DATE() %>,
		<%=member.getTodoState() %>
	</div>
	<%} }%>
	
	
	
	
</body>
</html>