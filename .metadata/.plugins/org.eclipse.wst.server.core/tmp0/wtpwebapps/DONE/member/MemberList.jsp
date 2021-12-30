<%@ page import="vo.Member"%>
<%@ page import="java.util.ArrayList" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>

<title>회원 목록</title>

</head>
<body>
<jsp:include page="/Header.jsp"/>
<h1>회원 목록</h1>
<p><a href='add'>신규회원</a><br>
<jsp:useBean id="members" scope="request" class="java.util.ArrayList" type="java.util.ArrayList<vo.Member>"/>

<%
for(Member member: members){
%>
<%=member.getNo() %>,
<a href ='update?no=<%=member.getNo() %>'><%=member.getName() %></a>,
<%=member.getEmail() %>,
<%=member.getCreatedDate() %>
<a href='delete?no=<%=member.getNo() %>'>[delete]</a><br>
<%} %>
<jsp:include page="/Tail.jsp"/>
</body>
</html>